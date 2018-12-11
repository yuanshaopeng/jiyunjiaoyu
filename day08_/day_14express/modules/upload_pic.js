/* api
 * _upload(req,function(err,data){
 * 		。。。
 * })
 * data:{
 * 	url:图片的服务器地址
 * 	name:图片名称
 *  ext:图片格式
 *  size:图片大小
 *  opt:上传文件时的额外数据
 * }
 * 
 * {
 * 	err:{
 * 	 -1：文件格式有误
 *   -2：文件重复
 *   -3：大小超限  2m
 *   -4：发送文件名称标识有误
 * 	 -5：删除错误
 *   -6：重命名错误
 * }
 * }
 */

const formidable = require("formidable");
const fs = require("fs");
module.exports = {
	_upload(req,callback){
		//1、获取表单对象；
		let form = new formidable.IncomingForm();
		//2、设定字符编码
		form.encoding = "utf-8";
		//3、设置文件上传目录；
		form.uploadDir = "./upload";
		//4、保留文件扩展名
		form.keepExtensions = true;
		//5、设置文件上传大小限制
		form.maxFileSize = 2*1024*1024;//限制2M;
		//6、监听文件上传结果
		form.parse(req,(err,opt,files)=>{
			if(err){
				callback({
					status:"-3",
					code:"文件大小超限"
				})
			}else{
				
				if(files.file){
					let file = files.file;
					//获取上传后的文件路径
					let path = file.path;
					let name = file.name;
					//文件后缀正则表达式
					let reg = /\.[a-z]+$/;
					//获取扩展名
					let ext = path.match(reg)[0];
					if(ext == ".jpg" || ext == ".png"){
						fs.readdir("./upload",(err,data)=>{
							if(data.indexOf(name) == -1){
								fs.rename(path,"./upload/"+name,(err)=>{
									if(err){
										callback({
											status:"-5",
											code:"文件重命名发生错误"
										},null)
									}else{
										callback(null,{
											status:"1",
											code:"上传成功",
											files:{
												url:"http://localhost:8080/upload/"+name,
												name:name,
												size:file.size,
												ext:ext,
												opt:opt
											}
										})
									}
								})
							}else{
								fs.unlink(path,(err)=>{
									if(err){
										callback({
											status:"-6",
											code:"文件删除发生错误"
										},null)
									}else{
										callback({
											status:"-2",
											code:"文件重复上传"
										},null)
									}
								})
							}
						})
						
						
					}else{
						//如果文件不符合格式，则删除
						fs.unlink(path,(err)=>{
							if(err){
								callback({
									status:"-5",
									code:"文件删除发生错误"
								},null)
							}else{
								callback({
									status:"-1",
									code:"文件不符合格式"
								},null)
							}
						})
						
					}
				}else{
					callback({
						status:"-4",
						code:"请求文件名有误，需设置为file"
					})
				}
				
			}
		})
	}
}
