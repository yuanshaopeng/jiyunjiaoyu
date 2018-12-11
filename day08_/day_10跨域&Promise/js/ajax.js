function ajax(obj){
	//提升用户体验   增加默认
	//默认请求方式为get;
	obj.method = obj.method || "get";
	//默认异步请求；
//	obj.sync = obj.sync || true;
//	obj.sync
//	obj.hasOwnProperty("sync");
//	if(obj.sync){
//		obj.sync = true;
//	}else {
//		obj.scyn = false;
//	}
	if (obj.hasOwnProperty("sync")) {
		obj.sync = obj.sync;
	}else{
		obj.sync = true;
	}
	
	/*
	 * obj = {
			url:"text.php",//请求的路径信息
			method:"post",//请求方式信息
			sync:true,//是否异步  true为异步
			data:{   //向后台发送的数据
				user:"李四",
				pass:123
			},
			success:function(res){  //成功回调函数
				console.log(res);
			},
			err:function(err){ //失败回调函数
				console.log(err);
			}
		}
	 */
	/*
	 * get|post语法区别
	 * 1、向后台发送数据方式不同；
	 * 2、post需要设置响应头；
	 * 体现在
	 * open()  send()
	 */
	//需要一个方法将数据格式进行处理    处理为name=asd&pass=123；
	function getContent(){
//		msg:{   //向后台发送的数据
//				user:"李四",
//				pass:123
//			}
		var msg = obj.data;
		var arr = [];
		for (var k in msg) {
//			k:键名
//			msg[k] :键值
			arr.push(k+"="+msg[k]);
		}
//		arr = ["name=asd","pass=123"];
		return arr.join("&");
	}
	
	
	//1、获取
	var xhr = new XMLHttpRequest();
	//get|post分道扬镳
	if(obj.method.toLowerCase() == "get"){
		//数据格式  name=asd&pass=123;
		//判断前台是否向后台发送了数据
		if (obj.data) {
			xhr.open("GET",obj.url+"?"+getContent(),obj.sync)
			xhr.send();
		}else{
			xhr.open("GET",obj.url,obj.sync)
			xhr.send();
		}
	}else{
		xhr.open(obj.method,obj.url,obj.sync);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(getContent());
	}
	//殊途同归
	if (obj.sync) {
		//判定为异步
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					if (obj.success) {
						obj.success(xhr.responseText);
					}
				}else{
					if (obj.err) {
						obj.err(xhr.status);
					}
				}
			}
		}
	}else{
		if (xhr.success) {
			xhr.success(xhr.responseText)
		}
	}
}
