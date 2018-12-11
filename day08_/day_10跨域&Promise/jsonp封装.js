//{
//	url:,
//	data:
//	success()
//}
function jsonP(obj){
	window.callback = function(res){
		obj.success(res);
	}
	let str = "";
	if(obj.data){
		let arr = [];
		for(var k in obj.data){
			arr.push(k+"="+obj.data[k]);
		}
		str = arr.join("&");
	}
	if(str){
		str+="&callback=callback";
	}else{
		str = "callback=callback";
	}
	let sc = document.createElement("script");
	sc.src = obj.url+"?"+str;
	document.body.appendChild(sc);
	sc.remove();
	window.callback = null;
}
