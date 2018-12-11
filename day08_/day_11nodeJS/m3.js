function factory(){
	var name='lee';
	var age = "18";
	function add(a,b){
		return a+b
	}
	return {
		add
	}
}
//解决全局污染    以及私有属性暴露的问题；
//