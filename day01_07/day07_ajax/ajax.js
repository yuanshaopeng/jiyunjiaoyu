/*
 * method:请求方式
 * url:路径
 * data:数据
 * success:成功的回调函数
 * error:失败的回调函数
 */



function ajax(obj){
	//将传递数据对象转为数据字符串
	function toData(data){
		let arr = [];
		for(let k in data){
			arr.push(k+"="+data[k]);
		}
		return arr.join("&");
	}
	
	// ajax=>用来与后台建立链接
	let xhr = new XMLHttpRequest();
	
	if(obj.method.toLowerCase() == "get"){
		xhr.open("GET",obj.url+"?"+toData(obj.data),true);
		xhr.send();
	}else{
		xhr.open("POST",obj.url,true);
		xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
		xhr.send(toData(obj.data));
	}
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status >=200&&xhr.status<300 || xhr.status == 304){
				let data = JSON.parse(xhr.responseText);
				if(obj.success){
					obj.success(data);
				}
			}else{
				if(obj.error){
					obj.error(xhr.status);
				}
			}
		}
	}
	
}
	ajax({
		method:"get",
		url:"xxx",
		data:"name=xxx&sss=xxx&xxx=sss",
		data:{
			name:"lee",
			age:"19"
		},
		success(res){
			//res=>返回到数据
			div.innerHTML = res;
		},
		error(err){
			//err=>服务器返回的错误状态码；
			console.log(err);
		}
	})