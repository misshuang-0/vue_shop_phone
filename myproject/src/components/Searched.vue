<template>
    <div class="list bgWhite">
        <!-- 顶部banner图 -->
        <div class="banner">
            <img @click="$router.back()" class="goback" src="../img/goback.png" alt="">
            <div class="bannerTxt">
                <h2>搜搜好货</h2>
                <p>搜出更多宝贝来！</p>
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
                            <h4>{{item.title}}</h4>
                            <p>{{item.subtitle}}</p>
                            <p class="price">￥{{item.price}}</p>
                        </div> 
                    </div>
                </router-link>
                <!-- 加载更多 -->
                <button @click="getMore" :style="show" type="button" class="mybtn">加载更多</button>

                <!-- 未搜到商品时显示 -->
                <div :style="tip" class="noProduct">
                    <div class="text">
                        <p>—— 暂时没有您搜的商品哦 ——</p>
                        <p>请试试其它关键词O(∩_∩)O</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            list:[],
            pno:0,
            show:{
                display:'none'  //加载更多，默认隐藏
            },
            tip:{
                display:'none'  //提示框，默认隐藏
            }
        }
    },
    methods:{
        // 获取通过搜索传参过来的关键词，进行模糊搜索
        getMore(){
            var key = this.$route.query.key;    //首页搜索框发来的关键词
            this.pno ++;    
            // console.log(key)
            this.axios.get('http://127.0.0.1:3000/mysearch',{
                params:{
                    key:key,
                    pno:this.pno
                }
            }).then(res=>{
                // console.log(res.data.code);
                // console.log(res.data.count['count(pid)']);
            
                // 如果状态码为-1，则提示没有商品
                if(res.data.code < 1){
                    this.tip.display = 'block';
                    // 并结束下面的操作
                    return;
                }else{  // 反之，存入商品列表信息,展示商品
                    this.list = this.list.concat(res.data.data);
                }

                // 获取搜索到的商品总数量
                var myCount = res.data.count['count(pid)'];
                // console.log(myCount)
                // console.log(this.list.length)
                // 如果当前显示的数据小于总数量，则显示 ‘加载更多’按钮，反之不显示
                if(this.list.length < myCount){
                    this.show.display = 'inline-block';
                }
                if(this.list.length == myCount){
                    this.show.display = 'none';
                }
            })
        }
    },
    created(){
        // 获取商品列表
        this.getMore();
    }
}
</script>

<style scoped>
@import '../assets/list.css';

.noProduct{
    height: 530px;
}
.noProduct .text{
    margin-top: 150px;
}
</style>