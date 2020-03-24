<template>
    <div class="register">
        <img class="goback" @click="$router.back()" src="../img/goback-black.png" alt="">
        <div class="registerIpt">
            <h2>欢迎小可爱</h2>
            <form action="">
                <input type="text" v-model="uname" id="" placeholder="请输入2-10位的用户名">
                <input type="password" v-model="upwd" id="" placeholder="请输入6-12位的密码">
                <input type="email" v-model="email" id="" placeholder="请输入邮箱">
                <input type="text" v-model="phone" id="" placeholder="请输入联系方式">
                <button @click="register" class="in" type="button">注册</button>
                <button @click="returnLog" class="returnLog" type="button">返回登录</button>
            </form>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
    data(){
        return {
            uname: '',
            upwd: '',
            email:'',
            phone:''
        }
    },
    methods:{
        // 返回登录界面
        returnLog(){
            this.$router.push('/login');
        },
        // 注册
        register(){
            // 验证用户名，为2-10位 中文
            var regU = /^[\w\u4e00-\u9fa5]{2,10}$/i;
            if(!regU.test(this.uname)){
                Toast({
                    message:'用户名格式有误,请检查',
                    duration:1000
                });
                return;
            }
            // 密码 6-12位 数字字母大小写下划线
            var regP = /^\w{6,12}$/;
            if(!regP.test(this.upwd)){
                Toast({
                    message:'密码格式有误,请检查',
                    duration:1000
                });
                return;
            }
            // 验证邮箱
            var regE = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(!regE.test(this.email)){
                Toast({
                    message:'邮箱格式有误,请检查',
                    duration:1000
                });
                return;
            }
            // 验证手机号码
            var regPh = /^1[3456789]\d{9}$/;
            if(!regPh.test(this.phone)){
                Toast({
                    message:'手机号码有误,请检查',
                    duration:1000
                });
                return;
            }
            // 如果都验证通过，向服务器发送请求
            var data = `uname=${this.uname}&upwd=${this.upwd}&email=${this.email}&phone=${this.phone}`;
            this.axios.post('http://127.0.0.1:3000/register',data,{
                'Content-Type':'application/x-www-form-urlencoded'
            }).then(res=>{
                // console.log(res.data);
                Toast({
                    message: res.data.msg,
                    duration:1000
                });
                // 如果注册成功，自动登录
                if(res.data.code == 1){
                    var data = `uname=${this.uname}&upwd=${this.upwd}`;
                    this.axios.post('http://127.0.0.1:3000/login',data,{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }).then(res=>{
                        // console.log(res.data);
                        // sessionStorage 存入uname avatar
                        sessionStorage.setItem('uname',this.uname);
                        sessionStorage.setItem('avatar',res.data.data[0].avatar);
                        // console.log(sessionStorage.getItem('avatar'));
                    })
                    // 跳转到首页
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>

<style scoped>
.register{
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
.register .registerIpt{
    width: 80%;
    height: 350px;
    margin: 0 auto;
    margin-top: 100px;
}
.registerIpt h2{
    font-size: 24px;
    font-weight: normal;
}
.registerIpt input{
    border: none;
    border-bottom: 1px solid #eee;
}
.registerIpt input:first-child{
    margin-top: 50px;
}
.registerIpt input::-webkit-input-placeholder{
    font-size: 12px;
    color:#aeaeae;
}
.registerIpt input::-ms-input-placeholder{
    font-size: 12px;
    color:#aeaeae;
}
.registerIpt input::-moz-input-placeholder{
    font-size: 12px;
    color:#aeaeae;
}

.registerIpt button{
    width: 100%;
    border: none;
    line-height: 28px;
}
.registerIpt button.in{
    background: #eee;
    border-radius: 8px;
    margin-top: 30px;
    color: #9c9c9c;
}
.registerIpt button.returnLog{
    margin-top: 4px;
    color: #fe9f46;
}
</style>