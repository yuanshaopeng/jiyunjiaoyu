const express = require("express");
const router= express.Router();

//返回管理系统页面
router.get("/",(req,res)=>{
	res.sendFile(__dirname+"/public/admin/index.html");
})

router.post("/login",)



















































module.exports = router;