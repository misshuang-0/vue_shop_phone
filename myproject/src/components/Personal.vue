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
                <div class="headPic">
                    <div v-if="uname" class="img">
                        <img :src="`http://127.0.0.1/${avatar}`" alt="">
                    </div>
                    <div v-else class="img">
                        <img src="../img/默认头像.jpg" alt="">
                    </div>
                    <!-- <input class="changeHead" type="file" value="更换头像" id=""> -->
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

        <!-- 为登录显示提示框 -->
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
        isLogin(){
            this.axios.get('http://127.0.0.1:3000/personal').then(res=>{
                if(res.data.code < 0){
                    this.myTip = true;
                }else{
                    // console.log(res.data);
                    this.uname = res.data.data[0].uname;
                    this.avatar = res.data.data[0].avatar;
                }
            })
        },
        toLogin(){
                this.$router.push('/login');
        },
        toRegister(){
                this.$router.push('/register');
        },
    },
    created(){
        this.isLogin();
    }
}
</script>

<style scoped>
@import '../assets/personal.css';
</style>