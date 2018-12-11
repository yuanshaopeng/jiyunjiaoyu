function ajax_v2(obj){
	return new Promise((resolve,reject)=>{
		obj.method = obj.method || "get";//默认get请求
		if (obj.hasOwnProperty("sync")) { //默认异步请求
			obj.sync = obj.sync;
		}else{
			obj.sync = true;
		}
	
		//需要一个方法将数据格式进行处理    处理为name=asd&pass=123；
		function getContent(){
			var msg = obj.data;
			var arr = [];
			for (var k in msg) {
				arr.push(k+"="+msg[k]);
			}
			return arr.join("&");
		}
		//1、获取
		var xhr = new XMLHttpRequest();
		//get|post分道扬镳
		if(obj.method.toLowerCase() == "get"){
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
						resolve(xhr.responseText)
					}else{
						reject(xhr.status);
					}
				}
			}
		}else{
			alert("请使用异步")
		}
	})
}

ajax_v2.get = function(url,data){
	return new Promise((resolve,reject)=>{
		...
	})
}

//
//ajax_v2({
//	url:"",
//	data:"",
//	method:""
//})
//
//ajax_v2.get(url,data)
//.then(res=>{})
//ajax_v2.post(url,data)
//.then(res=>{})
//ajax_v2.jsonp(url,data)
//.then(res=>{})
