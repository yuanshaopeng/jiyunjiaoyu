// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';//引入vue框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';//项目入口
import router from './router';//导入路由配置
import api from "./api";
//import ss from "./untils/null.js";
import store from "./store";
Vue.config.productionTip = false  //关闭警告
Vue.use(ElementUI);
Vue.prototype.$api = api;
//Vue.prototype.$bus = ss;
/* eslint-disable no-new */
new Vue({
  el: '#app',
	router,
	store,//将状态管理仓库挂载至根实例上
  components: { App },
  template: '<App/>'
})
