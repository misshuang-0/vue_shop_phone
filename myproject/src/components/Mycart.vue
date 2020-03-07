<template>
    <div class="cart">
        <!-- 顶部标题 -->
        <header>
            <img @click="$router.back()" class="goback" src="../img/goback.png" alt="">
            <div class="title">
                <span class="light">·</span>
                <span>·</span>
                购物车
                <span>·</span>
                <span class="light">·</span>
            </div>
        </header>

        <!-- 购物车列表 -->
        <div class="cartList bgWhite" :style="myList">
            <div class="checkAll">
                <div class="all">
                    <input @click="allchecked" class="allIpt" type="checkbox" v-model="allCheck" name="" id="mycheckAll">
                    <label for="mycheckAll"></label>
                    <span>全选</span>
                </div>
                <button @click="del" class="del" type="button">删除</button>
            </div>
            <!-- 列表项 -->
            <div class="cartItem" v-for="(item,i) of list" :key="i">
                <div>
                    <input @click='isChecked' class="myIpt" :data-i="i" v-model="item.check" :id="`myIpt${i}`" type="checkbox">
                    <label :for="`myIpt${i}`"></label>
                </div>
                <div class="img">
                    <img :src="`http://127.0.0.1/${item.imgUrl}`" alt="">
                </div>
                <div class="info">
                    <h3>{{item.title}}</h3>
                    <p class="nowPrice">￥{{item.price.toFixed(2)}}
                        <span class="priced">￥{{(item.price+150).toFixed(2)}}</span>
                    </p>
                    <div class="count">
                        <button @click="change" id="reduceBtn" type="button" :data-num="count[i]" :data-i="i">-</button>
                        <input id="mycount" type="number" :value="count[i]" >
                        <button @click='change' id="addBtn" type="button" :data-num="count[i]" :data-i="i">+</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 合计，支付 -->
        <div class="total bgWhite">
            <p>
                合计：<span>￥{{totalPrice.toFixed(2)}}</span>
            </p>
            <button type="button">结算</button>
        </div>

        <!-- 未登陆时显示 -->
        <div :style="tip" class="myTip">
            <p>—— 请登录后查看购物车 ——</p>
            <div class="btn">
                <router-link class="register bgWhite" to="/register">注册</router-link>
                <router-link class="login bgWhite" to="/login">登录</router-link>
            </div>
        </div>

        <!-- 购物车为空时显示 -->
        <div :style="noProduct" class="myTip">
            <p>—— 购物车空空如也，去逛逛吧！ ——</p>
            <div class="btn">
                <router-link class="login bgWhite" to="/list">搜一搜好物</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
import {MessageBox} from 'mint-ui';     //确认框
export default {
    data(){
        return {
            list:[],
            count:[],       //商品对应下标的数量
            tip:{
                display:'none',
            },
            noProduct:{
                display:'none',
            },
            myList:{
                display:'block'
            },
            allCheck:false,
            totalPrice:0
        }
    },
    methods:{
        // 修改商品数量
        change(e){
            // 设置一个方向，如果是点击的是减少的按钮则执行减1，反之加1
            var direction = 1;
            if(e.target.id == 'reduceBtn'){
                direction = -1;
            }
            
            // 获取当前点击的选项的商品数量
            var num = e.target.dataset.num;
            // 获取当前点击的选项的下标
            var i = e.target.dataset.i;
            // 该下标商品的数量加1 或 减1
            this.count[i] =  this.count[i] + 1*direction;
            // 当数量小于1时，等于1
            if(this.count[i] < 1){
                this.count[i] = 1;
            }
            this.axios.get('http://127.0.0.1:3000/changeNum',{
                params:{
                    cid:this.list[i].cid,
                    count:this.count[i]
                }
            }).then(res=>{
                // this.cartList();
                // 让 input 的数据等于 count[i]
                // 问题：不能让数量随着count的变化而变化？？？
                this.cartList();
            })
        },
        // 获取商品列表
        cartList(){
            // 首先判断用户是否登录
            this.axios.get('http://127.0.0.1:3000/isLogin').then(res=>{
                // console.log(res.data);
                // 如果没有登录，提示登录界面
                if(res.data.code < 0){
                    this.tip.display = 'block';
                    this.myList.display = 'none';
                    return;
                }
                // 如果登录了，获取商品列表
                this.axios.get('http://127.0.0.1:3000/myShopCart').then(res=>{
                    // console.log(res.data);
                    // 如果请求的结果为空，显示购物车为空
                    if(res.data.length < 1){
                        this.noProduct.display = 'block';
                        return;
                    }
                    // 为购物车列表的每一项添加check属性，初始值为：false
                    for(var item of res.data){
                        item.check = false;
                        
                    }
                    // 将请求的列表结果赋值给data中的list
                    this.list = res.data;
                    // console.log(this.list);
                    // 将列表的每一个商品的数量值添加到data 中的count数组，获取所有商品的数量
                    for(var item of this.list){
                        this.count.push(item.count);
                    }
                    // 将合计金额归为默认值
                    this.getTotal();
                })
            })
        },
        // 判断是否选中,合计金额
        isChecked(e){
            var i = e.target.dataset.i;
            this.list[i].check = e.target.checked;
            // 选中的数量
            var num = 0;
            // 未选中的数量
            var count = 0;
            for(var i = 0;i < this.list.length; i ++){
                // 如果选中，计算选中的金额
                if(this.list[i].check){
                    num ++;
                };
                // 如果没有选中，count ++
                if(!this.list[i].check){
                    count ++;
                }
            }
            // 如果选中的数量等于 list的总数量，全选也被选中
            if(num == this.list.length){
                this.allCheck = true;
            }else{
                this.allCheck = false;
            }
            this.getTotal();
        },
        // 计算合计金额
        getTotal(){
            // 将价格总和清零
            this.totalPrice = 0;
            // 选中的数量
            var num = 0;
            // 未选中的数量
            var count = 0;
            for(var i = 0;i < this.list.length; i ++){
                // 如果选中，计算选中的金额
                if(this.list[i].check){
                    num ++;
                    // 求价格总和
                    this.totalPrice += this.list[i].price * this.list[i].count;
                };
                // 如果没有选中，count ++
                if(!this.list[i].check){
                    count ++;
                }
            }
            // 如果都没有选中时，合计金额为0
            if(count == this.list.length){
                this.totalPrice = 0;
            }
        },
        // 删除选定的商品
        del(){
            // 准备一个数组，存放选中的商品cid
            var checkId = [];
            // 遍历商品列表，找出选中的商品
            for (var item of this.list){
                if(item.check){
                    checkId.push(item.cid);
                }
            };
            // console.log(this.list)
            // 如果选中的商品为0个，提示选择商品
            if(checkId.length == 0){
                Toast({
                    message:'请选择您需要删除的商品',
                    duration:1000
                })
                return;
            }
            // console.log(checkId);
            
            MessageBox.confirm('',{
                title:'提示',
                message:'即将删除该商品，是否继续？',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(action =>{
                // console.log('删除')
                // 向服务器发送请求，删除选中的商品
                this.axios.get('http://127.0.0.1:3000/del',{
                    params:{
                        checkId: checkId
                    }
                }).then(res=>{
                    // console.log(res.data);
                    // 删除以后，提示删除成功
                    Toast({
                        message:res.data.msg,
                        duration:1000
                    })
                    // 如果删除的商品个数 等于 商品列表的个数，清空商品列表
                    if(checkId.length == this.list.length){
                        this.list = [];
                        // 全选框为false
                        mycheckAll.checked = false;
                        // 金额归零
                        this.totalPrice = 0;
                    }
                    // 并重新加载列表
                    this.cartList();
                    // console.log('下面是删除后的列表')
                    // console.log(this.list)
                });
            }).catch(error=>{
                if(error == 'cancel'){
                    console.log('点击取消')
                }
            })
            
            
        },
        // 全选
        allchecked(e){
            for(var item of this.list){
                item.check = e.target.checked;
            }
            this.getTotal();
        },
        
    },
    created(){
        this.cartList();
    }
}
</script>

<style scoped>
@import '../assets/mycart.css';
</style>