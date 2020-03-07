<template>
    <div class="index bgWhite">
        <!-- 顶部搜索框 -->
        <header>
            <div class="title">
                <span class="light">·</span>
                <span>·</span>
                首页
                <span>·</span>
                <span class="light">·</span>
            </div>
            <div class="search">
                <input class="myIpt" type="text" v-model="key" placeholder="冬季上新">
                <!-- 放大镜 -->
                <img @click="scProduct" src="../img/magnifier.png" alt="">
            </div>
        </header>

        <!-- banner图 -->
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="(img,i) of bannerList" :key='i'>
                <img :src="img.imgUrl" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 图标列表 -->
        <div class="iconList">
            <router-link to='/news' class="iconItem">
                <img src="../img/icon-早餐.png" alt="">
                <p>热讯</p>
            </router-link>
            <router-link to="/list" class="iconItem">
                <img src="../img/icon-shop.png" alt="">
                <p>购物</p>
            </router-link>
            <router-link to="/" class="iconItem">
                <img src="../img/icon-晚餐.png" alt="">
                <p>晚餐</p>
            </router-link>
            <router-link to="" class="iconItem">
                <img src="../img/icon-夜宵.png" alt="">
                <p>夜宵</p>
            </router-link>
        </div>

        <!-- 每日推荐 -->
        <div class="product">
            
            <h2><span></span>每日推荐</h2>
            <div class="hotList">
                <div class="hotItem" v-for="(item,i) of dayList" :key="i">
                    <router-link :to="`/detail/${item.pid}`">
                        <img :src="`http://127.0.0.1/${item.listPic}`" alt="">
                        <p><span>￥</span>{{item.price.toFixed(2)}}</p>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
    data(){
        return {
            bannerList:[],
            key:'',
            dayList:[]
        }
    },
    created(){
        this.swipeImg();
        this.getDayList();
    },
    methods:{
        swipeImg(){
            this.axios.get('http://127.0.0.1:3000/swipeImg').then(res =>{
                // console.log(res.data);
                this.bannerList = res.data;
            })
        },
        // 搜索商品
        scProduct(){
            // 验证关键词不能为空
            var reg = /^\s*$/;
            if(reg.test(this.key)){
                Toast({
                    message:'关键词不能为空',
                    duration:1000
                });
                return;
            }
            this.$router.push({
                path:'/searched',
                query: {key:this.key}
            })
            // 将输入的关键词清空
            this.key = '';
        },
        // 获取每日推荐列表
        getDayList(){
            this.axios.get('http://127.0.0.1:3000/mylist').then(res=>{
                // console.log(res.data.data[0]);
                this.dayList = res.data.data[0];
            })
        }
    },
    
}
</script>
<style scoped>
@import '../assets/index.css';
</style>