<template>
    <div class="list bgWhite">
        <!-- 顶部banner图 -->
        <div class="banner">
            <img @click="$router.back()" class="goback" src="../img/goback.png" alt="">
            <div class="bannerTxt">
                <h2>精选好货</h2>
                <p>属于你的甜美小清新</p>
            </div>
            <img class="bannerImg" src="../img/list-banner.png" alt="">
        </div>

        <!-- 商品列表 -->
        <div class="productList bgWhite">
            <div class="showAll">
                <router-link v-for="(item,i) of list" :key="i" :to="`/detail/${item.pid}`">
                    <div class="productItem">
                        <div class="itemImg">
                        <img :src="`http://localhost/${item.listPic}`" alt="">
                        </div>
                        <div class="introduce">
                            <h4>{{item.pname}}</h4>
                            <p>{{item.subtitle}}</p>
                            <p class="price">￥{{ item.price.toFixed(2)}}</p>
                        </div> 
                    </div>
                </router-link>
                <!-- 加载更多 -->
                <button @click="loadMore" type="button" class="mybtn">加载更多</button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            list:[],
            pno:0
        }
    },
    methods:{
        // 加载更多页面
        loadMore(e){
            this.pno++;
            this.axios.get('http://127.0.0.1:3000/mylist',{
                params:{
                    pno:this.pno
                }
            }).then(res=>{
                // console.log(res.data.data[0]);
                this.list = this.list.concat(res.data.data[0]);
                // 当this.list的列表长度和数据库存储的商品数量相同时，隐藏加载按钮
                if(this.list.length == res.data.data[1]['count(pid)']){
                    // console.log(e.target);
                    e.target.style.display = 'none';
                    return;
                }
            })
            
        }
    },
    created(){
        this.loadMore();
    }
}
</script>

<style scoped>
@import '../assets/list.css';
</style>