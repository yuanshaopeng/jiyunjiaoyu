import Vue from "vue";
import Vuex from "vuex";
import Api from "@/api";
Vue.use(Vuex);
//vuex中的数据刷新页面会丢失；
//保存多组件的共同数据，  隔代组件的共享数据，  兄弟组件的共享数据
//默认导出状态管理对象
export default new Vuex.Store({
	//所有组件中的公共数据
	state:{
		num:1,
		msg:null
	},
	//所有组件中的公共方法   用来对state中的数据进行修改
	//同步方法
	mutations:{
		NUM(state,options){
			
			//state  vuex中的state数据
			//options   方法调用时传递的额外数据
			console.log(options);
			state.num = options
		},
		MSG(state,options){
			state.msg = options;
		}
	},
	//所有组件中的公共方法   
	//异步方法
	actions:{
		getmsg({state,commit},options){
//			context.state.num
			console.log(state);
			Api.get()
			.then(res=>{
				console.log(res);
				context.commit("MSG",res.data);
				commit("MSG",res.data);
			})
		}
	},
	//类似于组件中的计算属性
	//公共的计算属性；
	getters:{
		myGetter(state){
			console.log(state.num,"run");
			return 10
		}
	}
})

