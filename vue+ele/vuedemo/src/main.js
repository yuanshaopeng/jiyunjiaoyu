// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';//引入vue框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/index.css";
import App from './App';//项目入口
import router from './router';//导入路由配置
import cookie from "./untils/cookie";
import api from "./api";
import store from "./store";
Vue.config.productionTip = false  //关闭警告
Vue.use(ElementUI);
Vue.prototype.$api = api;
Vue.prototype.$cookie = cookie;
/* eslint-disable no-new */
//路由拦截
router.beforeEach((to,from,next)=>{
	if(to.meta.isLogin){
		if(cookie.getCookie("user_id")){
			next()
		}else{
			next("/login")
		}
	}else{
		next()
	}
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
