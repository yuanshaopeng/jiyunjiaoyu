import Vue from 'vue'
import Router from 'vue-router'
import home from "@/view/home";
import admin from "@/view/admin";
import car from "@/view/car";
import options from "@/view/options";
import ele from "@/view/ele";
import swiper from "@/view/swiper";
import bs from "@/view/bs";
import talk from "@/view/talk";
//@  代表src的根目录

//将router挂载至vue 
Vue.use(Router);

export default new Router({
	routes: [
	    {
	      path: '/',
	      name: 'home',
	      component:home
	    },{
	    	path:"/admin",
	    	name:"admin",
	    	component: admin
	    },{
	    	path:"/car",
	    	name:"car",
	    	component: car
	    },{
	    	path:"/option/:id",
	    	name:"option",
	    	component:options
	    },{
	    	path:"/ele",
	    	name:"ele",
	    	component:ele
	    },{
	    	path:"/swiper",
	    	name:"siwper",
	    	component:swiper
	    },{
	    	path:"/bs",
	    	name:"bs",
	    	component:bs
	    },{
	    	path:"/talk",
	    	name:"talk",
	    	component:talk
	    }
	]
})
