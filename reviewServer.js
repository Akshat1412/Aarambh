const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
 app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/reviewdb",{useNewUrlParser:true});
const reviewSchema=new mongoose.Schema({
  _id:Number,
  _productId:Number,
  _orderId:Number,
  _customerId:Number,
  _shopkeeperId:Number,
  stars:{
    type:Number,
    min:1,
    max:5
  },
  review:String
});
const CustomerReview=mongoose.model("CustomerReview",reviewSchema);
const review1=new CustomerReview({
  _id:001,
  _productId:001,
  _orderId:001,
  _customerId:001,
  _shopkeeperId:001,
  stars:4,
  review:"very good"
})
