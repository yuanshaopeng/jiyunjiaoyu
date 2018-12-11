const express = require("express");//引入express
const http = express();
const dbModel = require("./db.js");
const db = new dbModel("1808demo");
http.listen(8080,()=>{
	console.log("run")
})

//1808demo;   list1;    
http.get("/addOne",(req,res)=>{
	//添加一条数据
	db.insertOne("list1",{name:"lee",age:'18'},(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
//1808demo;   list1;    
http.get("/addMany",(req,res)=>{
	//添加多条数据
	db.insertMany("list1",[{name:"lee1",age:'18'},{name:"lee2",age:'18'}],(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
http.get("/delOne",(req,res)=>{
	db.deleteOne("list1",{name:"张震"},(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
http.get("/delMany",(req,res)=>{
	db.deleteMany("list1",{name:"谢昕怡"},(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
http.get("/del_id",(req,res)=>{
	db.deleteById("list1","5c08928789fd711af42476e5",(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
http.get("/updateOne",(req,res)=>{
	db.updateOne("list1",{name:"xxxx"},{age:"30"},(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
http.get("/updateMany",(req,res)=>{
	db.updateMany("list1",{name:"xxxx"},{age:"30"},(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
http.get("/update_id",(req,res)=>{
	db.updateById("list1","5c08b9f48d894437fca96f60",{age:"50"},(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
http.get("/find_id",(req,res)=>{
	db.findById("list1","5c08b9f48d894437fca96f60",(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
http.get("/find",(req,res)=>{
	db.find("list1",{
		query:{name:"xxxx"},
		skip:1,
		limit:2
	},(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})

