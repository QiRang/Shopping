.<!--  -->
<template>
  <div>
    <my-nav></my-nav>
    <!-- consult -->
    <div>
      <div class="container msg-container" :style="consultBack">
        <p class="h1" style="text-align:center;color:white;padding-bottom:50px;">在线留言</p>
        <div class="row">
          <div class="form-group col-md-6 offset-md-3 consult-productName">
            <span class="consult-nav-title">商品名称:</span>
            <span v-for ="(item,index) in products" :key="item.productId">
              <span v-text="item.productName"></span>&nbsp;&nbsp;
            </span>
          </div>
          <div class="form-group col-md-6 offset-md-3 consult-productImages">
            <span class="consult-nav-title">商品图片:</span>
            <span v-for ="(item,index) in products" :key="item.productId">
              <img :src="item.productImages" alt="商品图片" width="50px" height="50px;">&nbsp;&nbsp;
            </span>
          </div>
          <div class="form-group col-md-6 offset-md-3">
            <div class="input-group">
              <div class="input-group-addon">
                  <span consult-nav-title>留言人&nbsp;</span><small class="required-item">*</small>
              </div>
              <input type="text" class="form-control" placeholder="请填写您的姓名" v-model="consultForm.consultUsername">
            </div>
          </div>
          <div class="form-group col-md-6 offset-md-3">
            <div class="input-group">
              <div class="input-group-addon">
                <span class="consult-nav-title">联系方式&nbsp;</span><small class="required-item">*</small>
              </div>
                <input type="number" class="form-control"  v-model="consultForm.consultUserphone" placeholder="请输入您的联系方式" />
            </div>
          </div>
          <div class="form-group col-md-6 offset-md-3">
            <span class="consult-nav-title">留言内容&nbsp;</span><small class="required-item">*</small>
            <textarea class="form-control" v-model="consultForm.content"></textarea>
          </div>
          <div class="col-md-12" align="center">
            <button class="btn btn-large submit-btn" @click="postComment()">发送</button>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="container footer-container">
       <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import myNav from '@/components/MyNav';
import myFooter from '@/components/MyFooter';
import { getProductById, getUserOrderByOrderId } from '@/api/user';
export default {
  data () {
    return {
      products:[],
      consultForm:{
        content: "",
        consultUserphone: "",
        consultUsername:"",
        userId: "",
        productId: this.$route.query.productId || 0 ,
        orderId: this.$route.query.orderId || 0 ,
      },
      consultBack:{
        backgroundImage: "url(" + require("@/assets/niyan/images/consultcontainer.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",

      },
    }
  },
  components:{
    myNav,myFooter
  },
  mounted(){},
  created(){
    this.consultForm.userId = JSON.parse(sessionStorage.getItem("user")||"{}").userId || 0;
    console.log(this.consultForm.orderId,this.consultForm.productId);
    this.getProducts();
  },
  methods:{
    getProducts(){
      let productId = this.consultForm.productId;
      let orderId = this.consultForm.orderId;
      if(productId){
        getProductById(productId).then(res => {
          //console.log(res);
          this.products = [res.value];
          console.log(this.products);
        });
      } else if (orderId){
        getUserOrderByOrderId(orderId).then(res => {
          let orderItems = res.value.orderItems;
          let list = [];
          orderItems.forEach((item,index) => {
            list = list.concat(item.product);
          });
          console.log("list:");
          console.log(list);
          this.products = list;
;        });

      } else {
        alert("系统出错，请稍后再试！");
      }
   },
   postComment(){
     console.log("postComment");
   }
  }
}
</script>
<style scoped>
.msg-container{
  font-weight: 999;
  font-size: 16px;
  padding:150px 0 0 0;
  color: #555;
}
.input-group-addon{
  width:100px;
}
/* 取消input数字的自带增减功能 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
input[type='number'] {
    -moz-appearance:textfield;
}
.submit-btn{
 /* background-color: rgba(178, 63, 66, 0.5); */
  background-color: rgb(178, 63, 66);
 color:white;
 font-size: 16px;
 font-weight: 999;
 padding:10px 20px;
 margin: 50px 0;
}
.submit-btn :hover{
   background-color: rgb(216, 30, 6);
}
.consult-nav-title{
  color:#555;
}
.consult-productImages{
  overflow: hidden;
}
.consult-productName{
   text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}
</style>
