const express=require("express");
const mongoose=require("mongoose");
const reviewServer=require(__dirname+"/reviewServer.js");
const app=express();


app.use(express.static(__dirname + '/public'));

app.get("/review",function(req,res){
 
  res.sendFile(__dirname+"/review.html");
    })

app.post("/review",function(request,response){
  const data=request.body.homepage;
  console.log(data);
})
app.listen(3000,function(){
  console.log("Server is connected to port 3000.");
})
