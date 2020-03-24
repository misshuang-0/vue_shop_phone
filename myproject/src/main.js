import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import'mint-ui/lib/style.css'
import axios from 'axios'

// 公共样式
import '../src/assets/public.css'

// 引入vuex
import Vuex from "vuex"
// 注册vuex
Vue.use(Vuex);
// 创建store对象
new Vuex.Store({
  state:{
    // 购物车数量
    cartCount:0
  },      //保存全局共享数据
  mutations:{
    // 购物车数量增加
    increment(state){
      state.cartCount ++;
    }
  },    //修改全局共享数据
  getters:{}       //获取全局共享数据
})

// 引入组件
import {Header,Swipe,SwipeItem,Button} from 'mint-ui'
// 注册组件
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)

// 配置跨域访问选项
axios.defaults.withCredentials = true;
// 将axios配置为vue实例对象
Vue.prototype.axios = axios;

Vue.config.productionTip = false

// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
