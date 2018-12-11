const express = require("express");
const http = express();
http.listen(8080,function(){
	console.log("power 8080")
});

http.get("/api",(req,res)=>{
	res.send("ok");
})
http.all("*",function(req,res){
	res.sendFile(__dirname+req.url);
})
