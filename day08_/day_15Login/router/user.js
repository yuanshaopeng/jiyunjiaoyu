const express = require("express");
const router= express.Router();
const userMd = require("../modules/userMd.js");
//验证接口
router.get("/yz",userMd._yz);
//注册接口
router.post("/zhuce",userMd._zhuce);
//登陆接口
router.post("/login",userMd._login);
























module.exports = router;