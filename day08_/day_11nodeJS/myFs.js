const fs = require("fs");
exports.readFile = function(url){
	return new Promise((resolve,reject)=>{
		fs.readFile(url,"utf-8",(err,data)=>{
			if(err){
				reject(err);
			}else{
				resolve(data);
			}
		})
	})
}
