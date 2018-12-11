const jwt = require("jsonwebtoken");//验证用户身份
const key = "今天天好冷";
module.exports = {
	//获取tokenId;
	getToken(content,exp){
		return jwt.sign(content,key,{expiresIn:exp});
	},
	//解密tokenId;
	setToken(token,callback){
		jwt.verify(token,key,callback)
	}
}
