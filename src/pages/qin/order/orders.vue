<template>
  <div>
    <my-nav></my-nav>
    <div>
      <div class="container order-container" :style="orderBack">
        <div class="row">
                  <!-- 输入尺码 -->
          <div class="col-md-12 col-xs-12 order-nav-title">输入您的尺码</div>
          <div class="col-md-6 col-xs-6 form-group">
            <div class="input-group">
              <div class="input-group-addon">
                  <span>身高 </span><small class="required-item">*</small>
              </div>
              <input v-model="order.height" type="text" placeholder="输入您的身高（单位：cm）" class="form-control">
            </div>
          </div>
          <div class="col-md-6 col-xs-6 form-group">
            <div class="input-group">
              <div class="input-group-addon">
                  <span>体重 </span><small class="required-item">*</small>
              </div>
              <input v-model="order.weight" type="text" placeholder="输入您的体重（单位：kg）" class="form-control">
            </div>
          </div>
          <div class="col-md-3 col-xs-3 form-group">
            <div class="input-group">
              <div class="input-group-addon">
                  <span>肩宽</span>
              </div>
              <input v-model="order.shoulder" type="text" placeholder="输入您的肩宽" class="form-control">
            </div>
          </div>
          <div class="col-md-3 col-xs-3 form-group">
            <div class="input-group">
              <div class="input-group-addon">
                  <span>胸围</span>
              </div>
              <input v-model="order.bust" type="text" placeholder="输入您的胸围" class="form-control">
            </div>
          </div>
          <div class="col-md-3 col-xs-3 form-group">
            <div class="input-group">
              <div class="input-group-addon">
                  <span>腰围</span>
              </div>
              <input v-model="order.waist" type="text" placeholder="输入您的腰围" class="form-control">
            </div>
          </div>
          <div class="col-md-3 col-xs-3 form-group">
            <div class="input-group">
              <div class="input-group-addon">
                  <span>臀围</span>
              </div>
              <input v-model="order.hipline" type="text" placeholder="输入您的臀围" class="form-control">
            </div>
          </div>
              <!-- 输入收货地址 -->
          <div class="col-md-12 col-xs-12 order-nav-title">输入收货地址</div>
          <div class="col-md-6 col-xs-6">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <span>详细地址 </span><small class="required-item">*</small>
                </div>
                <input type="text" v-model="order.address" placeholder="请如实填写详细收货地址" class="form-control">
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xs-6">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                    <span>邮政编码</span>
                </div>
                <input type="number" placeholder="如不清楚，请填写000000" class="form-control">
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xs-6">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                    <span>收货人姓名 </span><small class="required-item">*</small>
                </div>
                <input v-model="order.receiver" type="text" placeholder="长度不超过25个字符" class="form-control">
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xs-6">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                    <span>手机号码 </span><small class="required-item">*</small>
                </div>
                <input v-model="order.mobile" type="number" placeholder="请输入11位手机号码" class="form-control" />
              </div>
            </div>
          </div>
          <!-- 确认物件信息 -标题栏 -->
        <div class="col-md-12 col-xs-12">
            <div class="orderItems-nav-boder">
              <div class="row">
                <div class="col-md-12 col-xs-12 order-nav-title">确认物件信息</div>
                <div class="col-md-2">
                  <svg class="niyan-iconfont" aria-hidden="true">
                    <use xlink:href="#niyan-tupian"></use>
                  </svg>
                  商品图片
                </div>
                <div class="col-md-4">
                  <svg class="niyan-iconfont" aria-hidden="true">
                    <use xlink:href="#niyan-shangpinmingcheng"></use>
                  </svg>
                  商品名称
                </div>
                <div class="col-md-1">
                  <svg class="niyan-iconfont" aria-hidden="true">
                    <use xlink:href="#niyan-jiage"></use>
                  </svg>单价
                </div>
                <div class="col-md-1">
                  <svg class="niyan-iconfont" aria-hidden="true">
                    <use xlink:href="#niyan-shuliang"></use>
                  </svg>数量
                </div>
                <div class="col-md-2">
                  <svg class="niyan-iconfont" aria-hidden="true">
                    <use xlink:href="#niyan-qiandai"></use>
                  </svg>小计
                </div>
                <div class="col-md-2">
                  <svg class="niyan-iconfont" aria-hidden="true">
                    <use xlink:href="#niyan-mui-express-car"></use>
                  </svg>配送方式
                </div>
              </div>
            </div>
          </div>
          <!-- 确认物件信息 -信息栏 -->
          <div class="col-xs-12 col-md-12">
            <div class="orderItems-row-boder">
              <div class="row  orderItems-row" v-for="(item, index) in productList" :key="index">
                <div class="col-md-2">
                  <div class="img2" align="left">
                      <img :src="item.productImages" height="50px;" width="50px;">
                  </div>
                </div>
                <div class="col-md-4 orders-productName" v-text="item.productName"></div>
                <div class="col-md-1">￥{{ item.price }}</div>
                <div class="col-md-1" v-text="item.count">数量</div>
                <div class="col-md-2 red-prices">￥{{ item.price * item.count }}</div>
                <div class="col-md-2">
                  <select class="custom-select orders-input">
                    <option value="1">顺丰速达</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!-- 订单备注、提交订单 -->
          <div class="col-md-6 col-xs-6" align="left">
            <p>订单备注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <textarea class="orders-input" rows="3" v-model="order.describes"></textarea>
          </div>
          <div class="col-md-6 col-xs-6 submit-container" align="right">
            <span>总合计：</span>
            <span class="red-prices">￥{{ prices }}</span>
            <button type="button" class="btn btn-danger btn-large submit-btn" @click="handleSubmit">提交订单</button>
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
<style>
.niyan-iconfont {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
.img1{
  width: 30px;
  height: 30px;
  margin: 0px auto;
  vertical-align:middle;
}
.img2{
  width: 60px;
  height: 60px;
  /* margin: 0px auto; */
  vertical-align:middle;
}
.div1{
  display:inline;
  /* float:left; */
}
 .input-group-addon{
    width:100px;
  }
  .card-header :first-child{
    font-size: 30px;
  }

.order-container{
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 14px;
  padding:50px 10px;
}
.order-nav-title{
  font-size: 20px;
  font-weight: 700;
  /* color:white; */
  padding:50px 0 10px 10px;;
}
.order-container .input-group-addon{
  background-color: rgba(250, 250, 250, 0.5);
  /* border:0px; */
}
.orders-input{
    background-color: rgba(250, 250, 250, 0.5);
}
.order-container .form-control{
  background-color: rgba(250, 250, 250, 0.5);
  border:0px;
}
.order-container .orderItems-row{
  height:50px;
  line-height: 50px;
  margin-bottom: 5px;
}
.orderItems-nav-boder, .orderItems-row-boder{
  border-bottom: 1px solid rgba(250, 250, 250, 0.5);
  color: #555;
  /* dashed */
}
.orderItems-nav-boder{
  padding-bottom: 10px;
}
.orderItems-row-boder{
  margin-bottom: 10px;

}
.red-prices{
  color:rgb(216, 30, 6);
  font-size: 20px;
  font-weight: 777;
}
.order-container .submit-container{
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-weight: 777;
  margin-bottom: 10px;
  text-align: right;
}
.order-container .submit-btn{
  font-size: 20px;
}
.orders-productName{
  white-space: nowrap;/*强制在一行显示*/
	text-overflow:ellipsis;/*设置超出内容显示...*/
	overflow: hidden;/*一定不能少 超出的内容进行隐藏*/
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
</style>
<script>
import '@/assets/css/back/bootstrap.css';
import img1 from '@/assets/css/img/mall.jpg';
import img2 from '@/assets/css/img/com.jpeg';
import img3 from '@/assets/css/img/zfb.png';
import img4 from '@/assets/css/img/zxzf.png';
import { getProductById,createOrder } from '@/api/user';
import myNav from '@/components/MyNav';
import myFooter from '@/components/MyFooter';


export default {
  data (){
    return {
      price:0,
      productList : [],
      prices: 0,
      order: {
        createDate:new Date(),
        receiver: "",
        height:"",
        weight:"",
        shoulder:"",
        bust:"",
        waist:"",
        hipline:"",
        address:"",
        mobile: 1,
        orderItems: JSON.parse(this.$route.query.orderItems || "[]"),
        describes: "",
        userId: JSON.parse(sessionStorage.getItem("user")||"{}").userId || 0,
      },
      // orderBack:{
      //   backgroundImage: "url(" + require("@/assets/niyan/images/ordercontainer.jpg") + ")",
      //   backgroundRepeat: "repeat-y",
      // },
      orderBack:{
        backgroundImage: "url(" + require("@/assets/niyan/images/detailscontainer.jpg") + ")",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% 50%",
      },
    }
  },
  components: {
    myNav,myFooter
  },
  methods:{
    getProduct(){
      this.order.orderItems.forEach(item =>{
        getProductById( parseInt(item.productId) ).then(res => {
          // console.log(res);
          let product = res.value;
          this.order.orderItems.some(element => {
            if(element.productId == item.productId){
              console.log("count:",element.count);
             product.count = element.count;
            }
          });
          this.prices += product.price * product.count;
          this.productList.push(product);
        });
        console.log(this.productList);
      });
    },
    handleSubmit(){
      console.log("提交订单");
      let order = this.order;
      console.log(order);
      let requiredValue = {
        "receiver":order.receiver,"height": order.height,"weight": order.weight,
        "address": order.address,"mobile": order.mobile
      }
      console.log(requiredValue);
      for(var key in requiredValue){
        if(!requiredValue[key]) {
          alert("请输入提交订单必填的相关信息！");
          return;
        }
      }
      createOrder(order).then(res =>{
        alert("下单成功");
        this.address = "";
        this.mobile = 1;
        this.receiver = "";
        this.goToUserCenter();
        });
    },
    goToUserCenter(){
      this.$router.push({
        path:`/userCenter`
    });
    }

  },
  created() {
    console.log(this.order);
    this.getProduct();
  },
}
</script>

