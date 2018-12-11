var a = 10;
var b = 20;
function add(a,b){
	return a+b;
}

//commonJs中的exports对象   将所有要设置为公共模块的方法统一挂载exports对象
exports.add = add;//导出
exports.a = a;
exports.b = b;