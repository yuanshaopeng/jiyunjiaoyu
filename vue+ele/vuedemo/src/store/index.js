import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import cookie from "@/untils/cookie";
import qs from "qs";
let headers = {
	"content-type":"application/x-www-form-urlencoded"
}
Vue.use(Vuex);
export default new Vuex.Store({
	state:{
		shopOpt:{},//商铺详情
		typeList:[],//店铺商品类别,
		goodsList:[],//商品集合
		carList:[],
		zj:0,
		btnTxt:"",
	},
	getters:{
		sum(state){
			var sum = 0;
			for(var i = 0 ; i < state.carList.length ; i++){
				sum=sum+state.carList[i].count*1;
			}
			return sum
		}
	},
	mutations:{
		_zj_txt(state,value){
			state.zj = value.zj;
			state.btnTxt = value.txt;
		},
		_shopOpt(state,value){
			state.shopOpt = value;
		},
		_typeList(state,value){
			state.typeList = value;
		},
		_goodsList(state,value){
			state.goodsList = value;
		},
		_carList(state,value){
			state.carList = value;
		},
		_addTypeList(state,value){
			for(var i = 0 ; i < state.typeList.length ; i++){
				if(state.typeList[i]._id == value.typeId){
					state.typeList[i].count = state.typeList[i].count*1+1;
				}
			}
		},
		_cutTypeList(state,value){
			for(var i = 0 ; i < state.typeList.length ; i++){
				if(state.typeList[i]._id == value.typeId){
					state.typeList[i].count = state.typeList[i].count*1-1;
				}
			}
		},
		_addGoodsCount(state,value){
			state.goodsList[value.index][value.key].count=state.goodsList[value.index][value.key].count*1+1;
		},
		_cutGoodsCount(state,value){
			state.goodsList[value.index][value.key].count=state.goodsList[value.index][value.key].count*1-1;
		}
		
	},
	actions:{
		getShopMsg({commit,dispatch},value){
			//获取商铺详情
			let req1 = Axios.get("http://localhost:8080/ele/shop",{params:{shopId:value}})
			//获取店铺购物车情况
			console.log(cookie.getCookie("token_id"),cookie.getCookie("user_id"))
			let req3 = dispatch("getCar",value);
			//获取店铺商品类别
			let req2 = Axios.get("http://localhost:8080/ele/type",{params:{shopId:value}})
			Promise.all([req1,req2,req3])
			.then(res=>{
				if(res[0].data.status == 1){//店铺信息
					commit("_shopOpt",res[0].data.data);
				}
				if(res[1].data.status == 1){//类别信息
					
					//映射类别中的数量
					let carList = res[2].data.data.result.slice(0);
					let type = res[1].data.data.map((item,index)=>{
						item.count = 0;
						return item;
					})
					type.forEach((item,index)=>{
						let typeId = item._id //类别id;
						for(var i = 0 ; i < carList.length ; i++){
							if(typeId == carList[i].typeId){
								item.count = carList[i].count*1+item.count;
							}
						}
					})
					commit("_typeList",type);
					let arr = res[1].data.data.map((item,index)=>{
						return dispatch("getGoods",{shopId:item.shopId,typeId:item._id});
					})//与类别数组顺序对应的商品请求promise对象;
					Promise.all(arr).then((res2)=>{
						let arr2 = res2.map((item,index)=>{
							//映射商品购买数量
							for(var k in item.data.data){
								let goodsId = item.data.data[k]._id;
								//
								let bol = false;//默认不存在
								for(var j in res[2].data.data.result){
									if(goodsId == res[2].data.data.result[j].goodsId){
										item.data.data[k].count = res[2].data.data.result[j].count;
										bol = true;
									}
								}
								if(!bol){
									item.data.data[k].count = 0;
								}
							}
							return item.data.data
						})
						commit("_goodsList",arr2);
					})
				}
				if(res[2].data.status == 1){//购物车
					commit("_carList",res[2].data.data.result);
					commit("_zj_txt",{
						zj:res[2].data.data.sum,
						txt:res[2].data.data.txt
					})
				}
				
			})
		},
		getGoods({commit},obj){
			return Axios.get('http://localhost:8080/ele/goods',{params:{shopId:obj.shopId,typeId:obj.typeId}})
		},
		addCar({commit},obj){
			return Axios.post('http://localhost:8080/ele/car',qs.stringify(obj),{headers})
		},
		getCar({commit},value){
			return Axios.get("http://localhost:8080/ele/car",{params:{
				token_id:cookie.getCookie("token_id"),
				userId:cookie.getCookie("user_id"),
				shopId:value
			}})
		}
	}
})

