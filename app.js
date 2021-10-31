const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const port = 80;
app.use(express.urlencoded());


main().catch(err => console.log(err));

async function main() {
    mongoose.connect('mongodb://localhost/project1');
}

const ProductAddSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    productCategory: String,
    productPrice: String,
    productStock: String
});

const ProductAdd = mongoose.model('ProductAddList', ProductAddSchema);

const ProductDeleteSchema = new mongoose.Schema({
    productId: String,
});

const ProductDelete = mongoose.model('ProductDeleteList', ProductDeleteSchema);

const ProductUpdateSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    productCategory: String,
    productPrice: String,
    productStock: String
});

const ProductUpdate = mongoose.model('ProductUpdateList', ProductUpdateSchema);

const LogInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Login = mongoose.model('LogList', LogInSchema);

const SignUpCustSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, unique: true
    },
    mobile: {
        type: String,
        required: true, unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const SignUpCust = mongoose.model('SignUpCustList', SignUpCustSchema);



const SignUpShopSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, unique: true
    },
    mobile: {
        type: String,
        required: true, unique: true
    },
    shopname: {
        type: String,
        required: true, unique: true
    },
    shopaddress: {
        type: String,
        required: true, unique: true
    },
    shopcategory: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const SignUpShop = mongoose.model('SignUpShopList', SignUpShopSchema);





//For static files
app.use('/static', express.static('static'));

app.get('/logIn', function (req, res) {
    res.sendFile(__dirname + "/views/logIn.html");
});

app.get("/test", (req, res) => {
    res.sendFile(__dirname + "/views/test.html");
});

app.get("/test/signInCustomer", (req, res) => {
    res.sendFile(__dirname + "/views/signInCustomer.html");
});

app.get("/test/signInShopkeeper", (req, res) => {
    res.sendFile(__dirname + "/views/signInShopkeeper.html");
});

app.get("/test2/productadd", (req, res) => {
    res.sendFile(__dirname + "/views/productadd.html");
});

app.get("/test2/productupdate", (req, res) => {
    res.sendFile(__dirname + "/views/productupdate.html");
});

app.get("/test2/productdelete", (req, res) => {
    res.sendFile(__dirname + "/views/productdelete.html");
});


app.post("/test/signInCustomer", (req, res) => {
    var myData = new SignUpCust(req.body);
    myData.save().then(() => { res.send("your data saved to the database") })
        .catch(() => { res.status(400).send("your data not saved to the database") })
});

app.post("/test/signInShopkeeper", (req, res) => {
    var myData = new SignUpShop(req.body);
    myData.save().then(() => { res.send("your data saved to the database") })
        .catch(() => { res.status(400).send("your data not saved to the database") })
});

app.post("/logIn", (req, res) => {
    var myData = new Login(req.body);
    myData.save().then(() => { res.send("your data saved to the database") })
        .catch(() => { res.status(400).send("your data not saved to the database") })
});

app.post("/test2/productadd", (req, res) => {
    var myData = new ProductAdd(req.body);
    myData.save().then(() => { res.send("your data saved to the database") })
        .catch(() => { res.status(400).send("your data not saved to the database") })
});

app.post("/test2/productdelete", (req, res) => {
    // var myData = new ProductDelete(req.body);
    // myData.save().then(() => { res.send("your data saved to the database") })
    //     .catch(() => { res.status(400).send("your data not saved to the database") })

    ProductAdd.findByIdAndDelete((req.body.productId), 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data Deleted!");
        }
    });  
});
//const kitty =Kitten.find({name:"fluffy2"});
app.post("/test2/productupdate", (req, res) => {
    //var myData=new ProductUpdate(req.body);
    // productId:String,
    // productName:String,
    // productCategory:String,
    // productPrice:String,
    // productStock:String
    // let x=req.body.productId;
    // let y=ProductAdd.find({productId:x});
    // productId=req.body.productId;

    //var myData=new ProductAdd(y);

    ProductAdd.findByIdAndUpdate(req.body.productId,
        {
            productName:req.body.productName,
            productCategory:req.body.productCategory,
            productPrice:req.body.productPrice,
            productStock:req.body.productStock
        }, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("your data has been saved");
                console.log("Data updated!");
            }
        });

    // myData.save().then(()=>{res.send("your data saved to the database")})
    // .catch(()=>{res.status(400).send("your data not saved to the database")})
});






app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});