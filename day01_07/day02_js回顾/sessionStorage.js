;(function(win) {
	if(sessionStorage.msg){
		return;
	}
	sessionStorage.msg = JSON.stringify({
		left: {
			type_name: "左侧",
			items: [{
				name: "备选项01",
				id: "01"
			}, {
				name: "备选项02",
				id: "02"
			}, {
				name: "备选项03",
				id: "03"
			}]
		},
		right: {
			type_name: "右侧",
			items: [{
				name: "备选项04",
				id: "04"
			}, {
				name: "备选项05",
				id: "05"
			},{
				name: "备选项06",
				id: "06"
			}]
		}
	})
})(window);
