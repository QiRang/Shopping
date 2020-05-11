<template>
  <div>
    <my-nav></my-nav>
    <!-- <div class="container" :style="publicTipsBack"></div> -->
    <div class="container details-container"  :style="detailsBack">
      <div class="row">
        <!-- <div class="col-md-12 col-xs-12" align="center" style="font-weight:777;font-size:20px;">
          商品详情
        </div> -->
        <div class="col-md-12 col-xs-12" align="right" style="margin-top:-50px;">
          <img :src="qiubite1" alt="" />
        </div>
        <!-- <div class="col-md-12 col-xs-12" align="center" style="font-weight:777;font-size:16px;padding-bottom:10px">
          商品信息
        </div> -->
        <div class="col-md-12 col-xs-12 col-flex-wrap">
          <div class="product-msg-list">
            <img :src="product.productImages" height="430px" width="100%" />
          </div>
          <div class="product-msg-list">
            <div class="list-top">
              <img :src="product.productImages" class="product-img">
            </div>
            <div class="list-bottom">
              <div class="product-name-wrap" v-text="product.productName"></div>
              <div class="product-describes-wrap"  v-text="product.describes"></div>
            </div>
          </div>
          <div class="product-msg-list">
            <img :src="product.productImages" height="430px" width="100%">
          </div>
        </div>
        <div class="col-md-12 col-xs-12" align="center">
          <p class="detail-nav-title">模特尺码</p>
        </div>
        <div class="col-md-12 col-xs-12 col-flex-wrap">
          <div class="model-size">
            <span>身高</span>
            <p>160cm</p>
          </div>
          <div class="model-size">
            <span>体重</span>
            <p>45kg</p>
          </div>
          <div class="model-size">
            <span>肩宽</span>
            <p>45cm</p>
          </div>
          <div class="model-size">
            <span>胸围</span>
            <p>90cm</p>
          </div>
          <div class="model-size">
            <span>腰围</span>
            <p>60cm</p>
          </div>
          <div class="model-size">
            <span>臀围</span>
            <p>80cm</p>
          </div>
        </div>
        <div class="col-md-12 col-xs-12 detail-nav-title" align="center">
          <span style="font-weight:777;">单价</span>
          <span v-cloak class="prices" style="font-weight:777;">￥{{ product.price }}</span>
        </div>
        <div class="col-md-12 col-xs-12" align="center" style="padding:50px; 0">
          <span class="detail-nav-title">定制数量&nbsp;&nbsp;</span>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" @click="min">-</button>
            <button type="text" class="btn btn-secondary"   v-model="count" v-cloak>{{count}}</button>
            <button type="button" class="btn btn-secondary" @click="max">+</button>
          </div>
        </div>
        <div class="col-md-12 col-xs-12 col-flex-wrap">
          <div class="">
            <button type="button" class="detail-btn btn btn-lg btn-danger" @click="consult()">咨询店长</button>
          </div>
          <div class="">
            <button type="button" class=" detail-btn btn btn-lg btn-outline-danger" @click="addToCart()">加入购物车</button>
          </div>
          <div class="">
            <button type="button" class="detail-btn btn btn-lg btn-outline-danger" @click="goToBuy()">立即定制</button>
          </div>
        </div>
        <div class="col-md-12 col-xs-12" align="left">
          <img :src="qiubite2" alt="" />
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
import img1 from '@/assets/css/img/head.gif';
import img2 from '@/assets/css/img/detial.jpg';
import '@/assets/css/back/reset.css';
import { getProductById } from '@/api/user';
import myNav from '@/components/MyNav';
import myFooter from '@/components/MyFooter';

export default {

  data () {
    return {
      count:1,
      price:50,
      img1:img1,
      img2:img2,
      productId: this.$route.query.productId,
      product:{},
      userId: 0,
      msgList: [
        {id: Date.now(),user:"李白",content:"天生我才必有用"},
        {id: Date.now(),user:"江小白",content:"劝君更进一杯酒"},
        {id: Date.now(),user:"小马",content:"我姓马，风吹草低见牛羊的马"},
      ],
      detailsBack:{
        backgroundImage: "url(" + require("@/assets/niyan/images/detailscontainer.jpg") + ")",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% 50%",
      },
      publicTipsBack: {
        backgroundImage: "url(" + require("@/assets/niyan/images/detailsTopBack.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height:"600px",
      },
      qiubite1: require("@/assets/niyan/images/qiubite1.png"),
      qiubite2: require("@/assets/niyan/images/qiubite2.png"),
    }
  },
  components: {
    myNav,myFooter
  },
  methods: {
    min(){
      if(this.count > 1){
        this.count=parseInt(this.count)-1;
      } else {
        alert("数量不可以小于1!");
      }
      console.log(this.count);
   },
   max(){
    var number = this.$store.getters.getCoodsCount[this.productId] || 0;
    if(number + this.count < this.product.stock){
      this.count=parseInt(this.count)+1;
    } else {
      alert("库存物资不足，不能再增加");
    }
   },
   getProduct(){
     getProductById(this.productId).then(res => {
       //console.log(res);
       this.product = res.value;
       console.log(this.product);
     });
   },
    addToCart(){
      console.log("添加到购物车");
      //拼接出一个要保存到store的car中的商品信息对象
      if(this.userId < 1){
        alert("请先登陆");
      } else {
        var goodsinfo = { productId: this.productId , count: this.count , selected: true,
        price: this.product.price,userId:this.userId,stock:this.product.stock};
        //调用store中的mutations把商品加入购物车
        var number = this.$store.getters.getCoodsCount[this.productId] || 0;
        if(number + this.count > this.product.stock){
          alert("库存物资不足！");
          return;
        }
        this.$store.commit("addToCar", goodsinfo);
      }
    },
    //页面跳转
    goToBuy(){
     console.log("直接购买");
     if(this.userId < 1){
       alert("请先登陆！");
     } else {
       this.$router.push({
       path:`/order/orders`,
       query:{orderItems: JSON.stringify( [{productId:this.productId,count:this.count,userId:this.userId}]) }
       //这样写是为了与购物车页的传递格式保持一致
     });
     }
    },
    //  consult
    consult(){
      console.log("consult");
      this.$router.push({
        path:`/consult`,
        query: {product: JSON.stringify(this.product)}
      });
    },
    goToLoginOrRegister(){
      this.$router.push({
        path:`/login/loginregister`
      });
    },
  },
  created() {
    this.userId =  JSON.parse(sessionStorage.getItem("user")||"{}").userId || 0;
    this.getProduct();
  },

}
</script>
<style>
.detail-btn{
  margin: 20px 20px 0px 20px;
}
.model-size{
  margin:10px 20px;
}
.product-name-wrap, .product-describes-wrap{
    writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/
    writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
}
.product-img{
  border-radius: 50%;
  height:100px;
  width:100px;
}
.product-msg-list{
  height:430px;
}
.product-msg-list .list-top{
    padding:50px 10px;
}
.product-msg-list .list-bottom{
  display: flex;
  flex-direction: row;
  justify-content: center;
  height:200px;
}
.col-flex-wrap{
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.product-name-wrap{
  font-weight: 777;
  font-size: 16px;
}
.product-describes-wrap{
    font-size: 14px;
}
.detail-nav-title{
  font-size:16px;
  padding: 50px 0 0 10px;
  text-align: center;
  font-weight:777;
}
.prices{
  color:red;
}
.detail img{
  width:100%;
  height:380px;
}
#describes{
  font-size:12px;
}
h4.card-title{
  text-overflow: ellipsis;
  overflow: hidden;
}

[v-cloak]{
  display: none;
}
/* .clear{
  clear: both;
}
.col-md-12{
  padding:0;
} */
.pro-detail-container .list-group-item{
  margin: 0;
  padding: 20px 0 0 0;
}
.details-container{
  padding:50px 10px;
}
</style>

