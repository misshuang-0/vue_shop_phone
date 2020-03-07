import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../components/Public.vue'
import Index from '../components/Index.vue'
import List from '../components/List.vue'
import News from '../components/News.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Detail from '../components/Detail.vue'
import Mycart from '../components/Mycart.vue'
import Personal from '../components/Personal.vue'
import Searched from '../components/Searched.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Public,
    children:[
      {path:'/',component:Index},
      {path:'/index',component:Index},
      {path:'/list',component:List},
      {path:'/news',component:News},
      {path:'/mycart',component:Mycart},
      {path:'/personal',component:Personal},
      {path:'/searched',component:Searched}
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {path:'/login',component:Login},
  {path:'/register',component:Register},
  {path:'/detail/:pid',component:Detail,props:true},
]

const router = new VueRouter({
  routes
})

export default router
