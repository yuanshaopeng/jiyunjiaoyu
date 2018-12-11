import Vue from 'vue'
import Router from 'vue-router'
//@  代表src的根目录
import home from '@/views/home.vue';
import login from "@/views/login.vue";
import shop from "@/views/shop.vue";
//将router挂载至vue 
Vue.use(Router);

export default new Router({
	routes: [
		{
			path:"/",
			name:"home",
			component:home
		},
		{
			path:"/login",
			name:"login",
			component:login
		},{
			path:"/shop/:id",
			name:"shop",
			component:shop
		},
		{
			path:"/makeSureOrder",
			name:"makeSureOrder",
			meta:{
				isLogin:true
			},
			component:{
				template:"<div>确认订单</div>"
			}
		}
	]
})
