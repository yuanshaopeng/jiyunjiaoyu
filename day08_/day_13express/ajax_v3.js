/*
 * created:2018/11/30
 * author:yuan
 */

/*
 * 底层使用promise+原生ajax封装；
 * 接收的参数   配置对象
 * 配置对象的属性
 * 	{
 * 		url:"请求路径", *
 * 		method:"请求方式",  //默认get
 * 		data:"请求数据",  
 * 		header:"请求头"  //application/x-www-form-urlencoded;
 *  }
 * 返回promise对象
 * 例子：
 * 		ajax({
 * 			url:"http://xxxx:8080/xxx",
 * 			method:"post",
 * 			data:{
 * 				username:"xx",
 * 				password:"xxx"
 * 			}
 * 		})
 * 		.then((res)=>{成功回调},(err)=>{失败回调})
 */

function ajax(obj){
	//设置相关默认值
	//默认get请求 
	obj.method = obj.method||"get";
	//默认请求头
	obj.header = obj.header || {"content-type":"application/x-www-form-urlencoded"}
	//处理数据格式
	var str = "";
	if(obj.data){
		//如果有数据
		
		let arr = [];
		for(var k in obj.data){
			arr.push(k+"="+obj.data[k]);
		}
		str = arr.join("&");
	}else{
		//如果没有数据
		str = "";
	}
	return new Promise((resolve,reject)=>{
		let xhr = new XMLHttpRequest();
		if(obj.method.toLowerCase()=="get"){
			xhr.open("GET",obj.url+"?"+str,true);
			xhr.send();
		}else{
			xhr.open(obj.method,obj.url,true);
			for (var k in obj.header) {
				xhr.setRequestHeader(k,obj.header[k]);
			}
			xhr.send(str);
		}
		//箭头状态
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >=200&&xhr.status<300 || xhr.status == 304){
					resolve(xhr.responseText);
				}else{
					reject(xhr.status)
				}
			}
		}
	})
}

/*
 * api
 * url:"请求路径"，
 * data:"发送参数"
 * 
 * 返回 promise对象
 */
ajax.get = function(url,data){
	let str = "";
	let arr = [];
	for(var k in data){
		arr.push(k+"="+data[k]);
	}
	str = arr.join("&");
	return new Promise((resolve,reject)=>{
		var xhr = new XMLHttpRequest();
		xhr.open("get",url+"?"+str,true);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >=200&&xhr.status<300 || xhr.status == 304){
					resolve(xhr.responseText);
				}else{
					reject(xhr.status)
				}
			}
		}
	})
}

/*
 * api
 * url:"请求路径"，
 * data:"发送参数"
 * 
 * 返回 promise对象
 */
ajax.post = function(url,data){
	let str = "";
	let arr = [];
	for(var k in data){
		arr.push(k+"="+data[k]);
	}
	str = arr.join("&");
	return new Promise((resolve,reject)=>{
		var xhr = new XMLHttpRequest();
		xhr.open("post",url,true);
		xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
		xhr.send(str);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >=200&&xhr.status<300 || xhr.status == 304){
					resolve(xhr.responseText);
				}else{
					reject(xhr.status)
				}
			}
		}
	})
}

/*
 * url:路径
 * data:数据
 * 返回promise
 * ajax.jsonp("xxx",{xxx})
 * .then(res=>{
 * 	console.log(res);
 * })
 */
ajax.jsonp = function(url,data){
	let str = "";
	let arr = [];
	for(var k in data){
		arr.push(k+"="+data[k]);
	}
	str = arr.join("&")
	return new Promise((resolve,reject)=>{
		window.callback = function(res){
			resolve(res);
		}
		let sc = document.createElement("script");
		if(str){
			str += "&callback=callback"
		}else{
			str = "callback=callback"
		}
		sc.src = url+"?"+str;
		document.body.appendChild(sc);
		sc.remove();
	})
}

function rand(max,min,bol=true){
	if(bol){
		return parseInt(Math.random()*(max-min)+min+1);//取最大值
	}else{
		return parseInt(Math.random()*(max-min)+min);//取不到最大值
	}
	
}

function getDate(time){
	if(time){
		time = time*1;//数字
	}else{
		time = null;
	}
	let date = new Date(time);
	let str = "年-月-日 时:分:秒";
	return str.replace("年",date.getFullYear())
	.replace("月",((date.getMonth()+1)<10?"0"+(date.getMonth()+1):date.getMonth()+1))
	.replace("日",(date.getDate()<10?"0"+date.getDate():date.getDate()))
	.replace("时",(date.getHours()<10?"0"+date.getHours():date.getHours()))
	.replace("分",(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()))
	.replace("秒",(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()))
}

const cookie = {
	setCookie(key,value,exp){
		exp = exp || "7d";
		let date = new Date();
		var unit = exp.toString().charAt(exp.length-1);//取日期的单位字符
		switch (unit){
			case "d": 
				date.setDate(date.getDate()+exp.substr(0,exp.length-1)/1)
				break;
			case "h": 
				date.setHours(date.getHours()+exp.substr(0,exp.length-1)/1)
				break;
			case "m": 
				date.setMinutes(date.getMinutes()+exp.substr(0,exp.length-1)/1)
				break;
			case "s": 
				date.setSeconds(date.getSeconds()+exp.substr(0,exp.length-1)/1)
				break;
			default:
				date.setTime(date.getTime()+exp/1);
				break;
		}
		value = encodeURI(value);
		document.cookie=key+"="+value+";expires="+date;
	},
	getCookie(key){
		let cookie = document.cookie;
		let arr1 = cookie.split("; ");
		let value;
		arr1.forEach((item,index)=>{
			let arr2 = item.split("=");
			if (arr2[0]===key) {
				value = arr2[1]
			}
		})
		if(value){
			return decodeURI(value);
		}else{
			return value;
		}
	}
}