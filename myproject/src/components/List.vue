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

        <!-- 商品列表 动态获取 -->
        <div class="productList bgWhite">
            <div class="showAll">
                <!-- 点击商品列表项，跳转到指定商品pid 的详情页 -->
                <router-link v-for="item of list" :key="item.pid" :to="`/detail/${item.pid}`">
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
            list:[],        //商品列表
            pno:0           //页码
        }
    },
    methods:{
        // 加载更多页面
        loadMore(e){
            // 首次加载是页面1
            this.pno++;
            this.axios.get('http://127.0.0.1:3000/mylist',{
                params:{
                    pno:this.pno
                }
            }).then(res=>{
                // console.log(res.data.data[0]);
                // 存储商品列表信息
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
        // 获取商品列表
        this.loadMore();
    }
}
</script>

<style scoped>
@import '../assets/list.css';
</style>