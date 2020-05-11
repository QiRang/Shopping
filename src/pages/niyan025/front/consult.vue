.<!--  -->
<template>
  <div>
    <my-nav></my-nav>
    <!-- consult -->
    <div>
      <div class="container msg-container" :style="consultBack">
        <p class="h1" style="text-align:center;color:white;padding-bottom:50px;">在线留言</p>
        <div class="row">
          <div class="form-group col-md-6 col-md-offset-3">
            <span class="consult-nav-title">商品名称:</span>
            <span type="text"  v-text="product.productName"></span>
          </div>
          <div class="form-group col-md-6 col-md-offset-3">
            <span class="consult-nav-title">商品图片:</span>
            <img :src="product.productImages" alt="商品图片" width="50px" height="50px;">
          </div>
          <div class="form-group col-md-6 col-md-offset-3">
            <div class="input-group">
              <div class="input-group-addon">
                  <span consult-nav-title>留言人&nbsp;</span><small class="required-item">*</small>
              </div>
              <input type="text" class="form-control" placeholder="请填写您的姓名" v-model="consultForm.consultUsername">
            </div>
          </div>
          <div class="form-group col-md-6 col-md-offset-3">
            <div class="input-group">
              <div class="input-group-addon">
                <span class="consult-nav-title">联系方式&nbsp;</span><small class="required-item">*</small>
              </div>
                <input type="number" class="form-control"  v-model="consultForm.consultUserphone" placeholder="请输入您的联系方式" />
            </div>
          </div>
          <div class="form-group col-md-6 col-md-offset-3">
            <span class="consult-nav-title">留言内容&nbsp;</span><small class="required-item">*</small>
            <textarea class="form-control" v-model="content"></textarea>
          </div>
          <div class="col-md-12" align="center">
            <button class="btn btn-large submit-btn" @click="postComment">发送</button>
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
export default {
  data () {
    return {
      product: JSON.parse(this.$route.query.product || "[]"),
      consultForm:{
        content: "",
        consultUserphone: "",
        consultUsername:"",
        userId: "",
        productId: "",
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
    console.log(this.product);
    this.username = JSON.parse(sessionStorage.getItem("user")||"{}").username || ""
  },
  methods:{
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
</style>
