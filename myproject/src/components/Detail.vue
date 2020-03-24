<template>
    <div class="detail">
        <!-- 主图,轮播 -->
        <div class="mainTop bgWhite">
            <!-- 返回上一页按钮 -->
            <span @click="$router.back()" class="goback">
                <img src="../img/goback.png" alt="">
            </span>
            <!-- 购物车按钮 -->
            <router-link to="/mycart" class="cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
            </router-link>
            <!-- 主图，轮播 swipe插件 -->
            <div class="mainPic">
                <mt-swipe :auto="3000">
                    <mt-swipe-item v-for="(img,i) of imgList" :key="i">
                        <img :src="`http://localhost/${img.md}`" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <!-- 标题，价格等 动态获取 -->
            <div class="introduce bgWhite">
                <h4>{{info.title}}</h4>
                <p class="price">￥{{info.price.toFixed(2)}}</p>
                <div class="counts">
                    <p>
                        购买数量
                        <span class="sold">月销 {{info.sold_count}}</span>
                    </p>
                    <div class="changeCount">
                        <button @click="reduce" type="button">-</button>
                        <input @change="holdCount" type="number" name="" id="" v-model="count">
                        <button @click="add" type="button">+</button>
                    </div>
                    <p class="serve"><span>服务</span>7天无理由-付款后3天内发货</p>
                </div>
                <div class="btns">
                    <button @click="addCart" class="addCart" type="button">加入购物车</button>
                    <button class="buyNow" type="button">立即购买</button>
                </div>
            </div>

            <!-- 底部按钮，添加购物车,立即购买 -->
            <nav class="mui-bar mui-bar-tab fixed">
                <div class="bottomBtn">
                    <button @click="addCart" class="buy" type="button">加入购物车</button>
                    <button class="add" type="button">立即购买</button>
                </div>
            </nav>
        </div>

        <!-- 详细介绍 -->
        <div class="detailTitle">
            <h5>
                <span>———</span>
                宝贝详情
                <span>———</span>
            </h5>
        </div>
        <div class="productDetail bgWhite">
            <img :src="`http://127.0.0.1/${info.detail}`" alt="">
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';  //提示信息插件
export default {
    data(){
        return {
            info:{price:0,detail:'',sold_count:0},  //商品信息
            imgList:[],     //轮播图片列表
            count:1
        }
    },
    props:['pid'],      //从url中获取当前商品pid
    methods:{
        // 获取商品信息
        getInfo(){
            this.axios.get('http://127.0.0.1:3000/detail?pid='+this.pid).then(res=>{
                // console.log(res.data.data[0]);
                this.info = res.data.data[0];   //存储商品信息
                this.imgList = res.data.data[1];    //存储轮播图片列表
            })
        },
        // 商品-1
        reduce(){
            if(this.count == 1){
                return;
            }
            this.count --;
        },
        // 商品+1
        add(){
            this.count ++;
        },
        // 监听输入框的change事件，保持商品数量大于0
        holdCount(){
            if(this.count < 0){
                this.count = 1;
            }
        },
        // 添加到购物车
        addCart(){
            // 向服务器发送post请求，添加商品到购物车表
            var data = `pid=${this.pid}&price=${this.info.price}&title=${this.info.title}&count=${this.count}&imgUrl=${this.imgList[0].md}`
            this.axios.post('http://127.0.0.1:3000/myAddCart',data,
            {'Content-Type':'application/x-www-form-urlencoded'}).then(res=>{
                // console.log(res.data)
                Toast({
                    message:res.data.msg,
                    duration: 1000
                })
            })
        }
    },
    created(){
        // 获取商品信息
        this.getInfo();
    }
}
</script>

<style scoped>
@import '../assets/detail.css';
</style>