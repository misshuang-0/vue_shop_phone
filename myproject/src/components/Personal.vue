<template>
    <div class="personal">
        <!-- 顶部标题 -->
        <header>
            <div class="title">
                <img @click="$router.back()" class="goback" src="../img/goback.png" alt="">
                <span class="light">·</span>
                <span>·</span>
                个人中心
                <span>·</span>
                <span class="light">·</span>
                <!-- 头像 -->
                <div class="headPic">
                    <!-- 如果用户登录了 显示用户的头像 -->
                    <div v-if="uname" class="img">
                        <img :src="`http://127.0.0.1/${avatar}`" alt="">
                    </div>
                    <!-- 没登录，显示默认头像 -->
                    <div v-else class="img">
                        <img src="../img/默认头像.jpg" alt="">
                    </div>
                    <p>{{uname || '暂未登录'}}</p>
                </div>
            </div>
        </header>

        <!-- 中间悬浮框 -->
        <div class="main">
            <div class="main-inner bgWhite">
                <div class="mainItem">
                <h4>关注</h4>
                <p>113</p>
                </div>
                <div class="mainItem">
                    <h4>关注</h4>
                    <p>113</p>
                </div>
                <div class="mainItem">
                    <h4>关注</h4>
                    <p>113</p>
                </div>
            </div>
        </div>

        <!-- 底部菜单 -->
        <div class="bottom bgWhite">
            <div class="bottom-inner">
                <div class="bottomItem">
                    <div class="img">
                        <img src="../img/足迹.png" alt="">
                    </div>
                    <p>足迹</p>
                </div>
                <div class="bottomItem">
                    <div class="img">
                        <img src="../img/菜单.png" alt="">
                    </div>
                    <p>菜单</p>
                </div>
                <div class="bottomItem">
                    <div class="img">
                        <img src="../img/消息.png" alt="">
                    </div>
                    <p>消息</p>
                </div>
                <div class="bottomItem">
                    <div class="img">
                        <img src="../img/设置.png" alt="">
                    </div>
                    <p>设置</p>
                </div>
            </div>
        </div>

        <!-- 未登录显示提示框 -->
        <div class="bgWhite" :class="{'myTip':myTip}">
            <p>您还没有登录哦~</p>
            <p>请登录后再来！O(∩_∩)O</p>
            <div class="btns">
                <button @click="toLogin" type="button" class="login">去登陆</button>
                <button @click="toRegister" type="button" class="register">去注册</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            uname:'',
            avatar: '',
            myTip:false
        }
    },
    methods:{
        // 判断用户是否登录
        isLogin(){
            this.axios.get('http://127.0.0.1:3000/personal').then(res=>{
                if(res.data.code < 0){
                    // 显示提示框，提示登录
                    this.myTip = true;
                }else{
                    // console.log(res.data);
                    // 获取用户名 和用户头像
                    this.uname = res.data.data[0].uname;
                    this.avatar = res.data.data[0].avatar;
                }
            })
        },
        // 跳转登录页面
        toLogin(){
                this.$router.push('/login');
        },
        // 跳转注册页面
        toRegister(){
                this.$router.push('/register');
        },
    },
    created(){
        // 判断用户是否登录
        this.isLogin();
    }
}
</script>

<style scoped>
@import '../assets/personal.css';
</style>