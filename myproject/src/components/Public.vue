<template>
  <div id="app">
    <router-view/>
    <!-- 公共的底部导航 -->
        <nav class="mui-bar mui-bar-tab fixed">
			<router-link id="index" class="mui-tab-item" :style="$route.path == '/' ? muiActive:''" to="/">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link id="list" class="mui-tab-item" :style="$route.path == '/list' ? muiActive:''" to="/list">
				<span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
				<span class="mui-tab-label">挑好货</span>
			</router-link>
			<router-link class="mui-tab-item" :style="$route.path == '/mycart' ? muiActive : ''" to="/mycart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{cartCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<a @click="toPersonal" :style="$route.path == '/personal' ? muiActive: ''" class="mui-tab-item">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">个人中心</span>
			</a>
		</nav>
  </div>
</template>

<script>
export default {
	data(){
		return {
			muiActive:{
				color:'#fd7500'
			},
			cartCount:0
		}
	},
	methods:{
		toPersonal(){
			// console.log(sessionStorage.getItem('uname'))
			// console.log(sessionStorage.getItem('avatar'))
			// 如果用户名已存在
			if(sessionStorage.getItem('uname')){
				// 如果已经在个人中心，终止函数
				if(this.$route.path == '/personal'){
					return;
				}else{	//跳转到个人中心
					this.$router.push('/personal');
				}
			}else{	//用户名不存在，跳转到登录页面
				this.$router.push('/login');
			}
		},
		// 获取购物车数量
		getCartCount(){
			this.axios.get('http://127.0.0.1:3000/myShopCart').then(res=>{
				// console.log(res.data)
				var list = res.data;
				var sum = 0;
				// 遍历获取到的购物车列表商品
				for(var item of list){
					// 将每个商品的数量相加
					sum += item.count;
				}
				// 将商品数量总和赋值给 this.cartCount
				this.cartCount = sum;
				console.log(this.cartCount)
			})
		}
	},
	created(){
		this.getCartCount();
	}
}
</script>

<style>
</style>
