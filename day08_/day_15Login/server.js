const express = require("express");
const bodyParser = require("body-parser");
const userRouter=  require("./router/user.js");
const tokenRouter= require("./router/tokenRouter.js");
const adminRouter = require("./router/adminRouter.js");
const jwt = require("./modules/jwt.js");
const http = express();

http.listen(8080,()=>{
	console.log("run")
})

http.use(express.static("./public"));
http.use(bodyParser.urlencoded({extended:false}));

//创建user路由   存放所有用户相关的接口
http.use("/user",userRouter)
//身份验证路由
http.use("/tk",tokenRouter);

//后台管理系统路由地址
http.use("/admin",adminRouter);
