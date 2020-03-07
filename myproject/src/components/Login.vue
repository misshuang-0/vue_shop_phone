<template>
    <div class="login">
        <img class="goback" @click="$router.back()" src="../img/goback-black.png" alt="">
        <div class="loginIpt">
            <h2>欢迎小可爱</h2>
            <form action="" method="post">
                <input type="text" name="" v-model="uname" placeholder="请输入用户名">
                <input type="password" name="" v-model="upwd" placeholder="请输入密码">
                <button @click="myLogin" class="in" type="button">登录</button>
                <button @click="toRegister" class="register" type="button">注册</button>
            </form>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            uname:'',
            upwd:'',
            avatar:''
        }
    },
    methods:{
        myLogin(){
            this.axios.post('http://127.0.0.1:3000/login','uname='+this.uname+'&upwd='+this.upwd,{'Content-Type':'application/x-www-form-urlencoded'}).then(res=>{
                // console.log(res.data);
                Toast({
                    message:res.data.msg,
                    duration: 1000
                });
                
                if(res.data.code == 1){
                    sessionStorage.setItem('uname',this.uname);
                    sessionStorage.setItem('avatar',res.data.data[0].avatar);
                    // console.log(sessionStorage.getItem('uname'));
                    // console.log(sessionStorage.getItem('avatar'));
                    this.$router.push('/');
                }
            })
        },
        toRegister(){
            this.$router.push('/register');
        }
    },
    created(){

    }
}
</script>

<style scoped>
.login{
    position: absolute;
    width: 100%;
    height: 100%;
    background:url('../img/loginBg.png') center/100% no-repeat;
}
.goback{
    position: absolute;
    width: 14px;
    top: 12px;
    left: 12px;
    opacity: 0.6;
}

/* 输入框内容 */
.login .loginIpt{
    width: 80%;
    height: 350px;
    margin: 0 auto;
    margin-top: 100px;
}
.loginIpt h2{
    font-size: 24px;
    font-weight: normal;
}
.loginIpt input{
    border: none;
    border-bottom: 1px solid #eee;
}
.loginIpt input:first-child{
    margin-top: 50px;
}
.loginIpt input::-webkit-input-placeholder{
    font-size: 12px;
    color:#aeaeae;
}
.loginIpt input::-ms-input-placeholder{
    font-size: 12px;
    color:#aeaeae;
}
.loginIpt input::-moz-input-placeholder{
    font-size: 12px;
    color:#aeaeae;
}

.loginIpt button{
    width: 100%;
    border: none;
    line-height: 28px;
}
.loginIpt button.in{
    background: #eee;
    border-radius: 8px;
    margin-top: 30px;
    color: #9c9c9c;
}
.loginIpt button.register{
    color: #fe9f46;
}
</style>