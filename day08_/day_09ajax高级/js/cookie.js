const cookie = {
	setCookie(key,value,exp){
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
