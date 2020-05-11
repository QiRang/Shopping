.<!--  -->
<template>
<div>
    <my-nav></my-nav>
    <div class="container nav-container">
      <!-- 首页的搜索框 -->
      <div class="row">
        <div class="col-md-4 offset-md-8">
          <form action="" class="form-horizontal">
            <div class="form-group">
              <div class="input-group">
                <input type="text" placeholder="请输入" class="form-control">
                <button class="input-group-addon" style="width:50px;">搜索</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <!-- 分类导航，图片轮播 -->
        <div class="col-md-12">
          <div class="slide" v-on:mouseover="stop()" v-on:mouseout="move()">
              <div class="slideshow">
                <transition-group tag="ul" name="image">
                  <li v-for="(item, index) in imgArray" v-show="index==mark" :key="item">
                    <a href="#">
                      <img :src='item'>
                    </a>
                  </li>
                </transition-group>
              </div>
              <div class="bar">
                <span v-for="(item, index) in imgArray" :class="{'active':index == mark }"
                @click="change(index)" :key="item"></span>
              </div>
          </div>
          <div class="categoryNav">
            <ul>
              <li v-for="(item,index) in categoryList" :key="index">
                <svg class="niyan-iconfont" aria-hidden="true">
                    <use :xlink:href = item.categoryIcon ></use>
                </svg>
                <span v-cloak>{{item.categoryName}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 全部产品 -->
        <div class="col-md-12" style="text-align:center;">
          <svg class="niyan-iconfont" aria-hidden="true">
            <use xlink:href = #niyan-quanbu ></use>
          </svg>
          <p class="allProducts" @click="goToAllProductsPage">在售产品>></p>
        </div>
      </div>
    </div>

   <!-- 循环显示商品 -->
  <div class="products-container container" :style="back">
    <div v-for="(item, index) in categoryListWithProducts" :key="item.categoryId">
      <div class="category-title" >
        <img :src="navImgLeft" height="50px;" />
        <span v-text="item.categoryName">分类1</span>
        <img :src="navImgRight" height="50px;" />
      </div>
      <div class="row">
        <div class="col-md-2" align="center" v-for="(element,i) in item.products" :key="element.productId"
         @click="goToDetail(element.productId)" v-if="i<6">
          <img :src="element.productImages" alt="">
          <div class="product-bottom">
            <div class="product-msg">
              {{element.productName}}&emsp;{{element.describes}}
            </div>
            <p class="product-bottom-price" v-cloak>￥{{ element.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- footer部分 -->
  <div class="container footer-container">
      <my-footer></my-footer>
  </div>
</div>


</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import myNav from '@/components/MyNav';
import myFooter from '@/components/MyFooter';


import {getCategories,getCategoryWithProductList} from "@/api/public"
export default {
  data () {
    return {
      categoryList:[],
      categoryListWithProducts:[],
      timer: null, //定时器
      mark: 0, //比对图片索引的变量
      imgArray: [//图片路径
        require('@/assets/niyan/images/01f08f598c2630a801215603d046a0.jpg'),
        require('@/assets/niyan/images/u=1268152236,920630520&fm=26&gp=0.jpg'),
        require('@/assets/niyan/images/u=1859304761,2429061942&fm=26&gp=0.jpg'),
        require('@/assets/niyan/images/u=3322628900,4280256837&fm=26&gp=0.jpg'),
        require('@/assets/niyan/images/zhizi.jpg')
      ],
      logoImg:require("@/assets/niyan/images/finallogoHead.jpg"),
      navImgRight:require("@/assets/niyan/images/ff1d5ca7986b470491439132f919ebac.png"),
      navImgLeft:require("@/assets/niyan/images/25a98ac788f64873bd535d6c777efe78.png"),
      back:{
        backgroundImage: "url(" + require("@/assets/niyan/images/productcontainer.jpg") + ")",
        backgroundRepeat: "repeat-y",
      },
      aboutHanfuBack:{
        backgroundImage: "url(" + require("@/assets/niyan/images/aboutHanfu.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height:"400px"
      },
    }
  },
  components:{
    myNav,myFooter
  },
  methods: {
    //轮播图
    autoPlay () {
      this.mark++;
      //console.log(this.mark);
      if (this.mark === 5) {
        this.mark = 0
      }
    },
    play () {
      this.timer = setInterval(this.autoPlay, 7000)
    },
    change (i) {
      console.log("dianji"+ i);
      this.mark = i
    },
    stop () {
      clearInterval(this.timer)
    },
    move () {
      this.timer = setInterval(this.autoPlay, 7000)
    },
    //调用接口
    getCategoriesAndProducts(){
      getCategoryWithProductList().then(res =>{
        // console.log("res");
        // console.log(res);
        this.categoryListWithProducts = res.value;
      });
    },
    getAllCategory(){
      getCategories().then(res =>{
        // console.log("res");
        // console.log(res);
        this.categoryList = res.value;
        console.log(this.categoryList);
      })
    },
    //页面跳转
    goToDetail(productId){
      console.log("去详情页："+ productId);
      this.$router.push({
        path:`/item/detail`,
        query: {productId}
      });
    },
    goToAllProductsPage(){
      console.log("去所有产品页面");
    }

  },
  created() {
    this.play();
    this.getAllCategory();
    this.getCategoriesAndProducts();
  },
}
</script>
<style scoped>
.container{
  font-size: 14px;
}
.nav-container{
  padding-top:50px;
}

.input-group-addon{
  background-color: rgb(179, 65, 67);
  color:whitesmoke;
}


.col-md-6{
  padding:0;
}

.allProducts{
  color:rgb(119, 119, 119);
}
.allProducts:hover{
  color: rgb(239, 77, 64);

}

/*产品container*/

.products-container{
  box-sizing:border-box;
  padding: 30px 10px 50px 10px;
  /* category-title padding-top 为 20px */
}
.col-md-2{
  height:300px;
  padding:0;
  box-sizing: border-box;
  /* background:rgb(245, 245, 245); */

}
.col-md-2 img{
  width:94%;
  height:200px;
}
.category-title{
  text-align: center;
  font-size: 20px;
  padding:20px;
  color:palevioletred;
}
.product-bottom{
  width:94%;
  height:100px;
  background:white;
  text-align: left;
  position: relative;
}
.product-msg{
  /* 超出两行显示…… */
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product-bottom :hover{
  text-decoration: underline;
  /* text-overflow:inherit;
  overflow: visible; */
}

.product-bottom-price{
  position: absolute;
  float: bottom;
  bottom: 20px;
  color:red;
  font-weight:bold;
  text-indent: 1em;
}

.categoryNav li{
  padding:10px 0 10px 0;
  text-indent: 2em;
  position: relative;
}
.categoryNav{
  position: absolute;
  top:0;
  float: left;
  width:25%;
  height:100%;
  background-color: rgba(0, 0, 0,0.4);
  z-index: 100;
  color:white;
}
.categoryNav li:hover{
  /* color:rgb(239,77,64); */
  /* background-color: rgb(253, 237, 238); */
  color:red;
  background-color: rgb(205, 205, 205);
}

/*  */
[v-cloak]{
  display: none;
}
.clear{
  clear: both;
}
.col-md-12{
  padding:0;
  margin-top:50px;
}
/* 轮播图 */
.slide {
    width: 100%;
    height: 100%;
  }
  .slideshow img{
    width: 100%;
    height: 360px;
  }
  .slideshow ul{
    width:100%;
    height: 350px;
  }
  .slideshow li {
    width:100%;
    position: absolute;
  }
  .slideshow ul a{
    display: inline-block;
    width:100%;
  }
  .bar {
    position: absolute;
    width: 100%;
    bottom: 10px;
    margin: 0 auto;
    z-index: 10;
    text-align: center;
  }
  .bar span {
    width: 10px;
    height: 10px;
    border-radius:50%;
    background: rgba(0, 0, 0,0.4);
    display: inline-block;
    margin-right: 10px;
  }
  .bar .active {
    background: red;
  }
  .image-enter-active {
    transform: translateX(0);
    transition: all 1.5s ease;
  }
  .image-leave-active {
    transform: translateX(-100%);
    transition: all 1.5s ease;
  }
  .image-enter {
    transform: translateX(100%);
  }
  .image-leave {
    transform: translateX(0);
  }
  .lc-list img{
    width:100px;
    height:100px;
    color:rgb(172, 126, 126);
  }

</style>
