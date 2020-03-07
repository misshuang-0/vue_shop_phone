<template>
    <div class="news bgWhite">
        <!-- 顶部标题 -->
        <header>
            <img @click="$router.back()" class="goback" src="../img/goback.png" alt="">
            <div class="title">
                <span class="light">·</span>
                <span>·</span>
                心得分享
                <span>·</span>
                <span class="light">·</span>
            </div>
        </header>

        <!-- 新闻列表 -->
        <div class="newsList">
            <!-- 新闻列表项 -->
            <div class="newsItem">
                <div class="user">
                    <img src="../img/头像.jpg" alt="">
                    <h5>长不大的你</h5>
                    <p>1天前发布</p>
                </div>
                <div class="newsImg">
                    <img src="../img/newsImg.jpg" alt="">
                </div>
                <div class="article clearfix">
                    <h4>实用的穿衣艺术，教你根据身形穿衣搭配</h4>
                    <p class="text">根据自己得自身情况进行穿衣搭配，扬长避短，你就会发现，这些厚重得衣服，穿起来不但暖和，而且也不会臃肿，甚至连潮流指数也会跟着提高，下面，咱们就举几个栗子！</p>
                    <p class="good">
                        <!-- 点赞 -->
                        <img src="../img/点赞.png" alt="">
                        <span>123</span>
                    </p>
                </div>
            </div>
            <div class="newsItem">
                <div class="user">
                    <img src="../img/头像.jpg" alt="">
                    <h5>长不大的你</h5>
                    <p>1天前发布</p>
                </div>
                <div class="newsImg">
                    <img src="../img/newsImg.jpg" alt="">
                </div>
                <div class="article clearfix">
                    <h4>实用的穿衣艺术，教你根据身形穿衣搭配</h4>
                    <p class="text">根据自己得自身情况进行穿衣搭配，扬长避短，你就会发现，这些厚重得衣服，穿起来不但暖和，而且也不会臃肿，甚至连潮流指数也会跟着提高，下面，咱们就举几个栗子！</p>
                    <p class="good">
                        <!-- 点赞 -->
                        <img src="../img/点赞.png" alt="">
                        <span>123</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    methos:{

    },
    created(){

    }
}
</script>

<style scoped>
@import '../assets/news.css';
</style>