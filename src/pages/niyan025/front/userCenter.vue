.<!--  -->
<template>
  <div>
    <my-nav></my-nav>
    <!-- userCenter -->
    <div class="container usercenter-container" :style="usercenterBack">
      <div class="row" style="margin:0;">
        <!-- <div class="col-md-12 col-xs-12">
          <p class="usercenter-nav-title">基础信息</p>
            用户名：{{user.username}}
          我的头像<img :src="user.userImage" alt="">
          <p>修改密码</p>
        </div> -->
        <div class="col-md-12 col-xs-12">
          <p class="usercenter-nav-title">我的订单</p>
        </div>
        <table class="table col-md-12 col-xs-12">
          <thead>
            <tr>
              <th class="first">商品信息</th>
              <th class="second" align="center">时间</th>
              <th class="third" align="center">尺码信息</th>
              <th class="fourth" align="center">收件人信息</th>
              <th class="fifth" align="center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index)  in orderList" :key="item.orderId">
              <td class="first">
                <div style="padding-bottom:5px;" class="col-md-12 col-xs-12" v-for="(element,i) in item.orderItems" :key="element.orderItemId">
                  <div class="col-md-6 col-xs-6" align="right" style="padding-right:20px;">
                    <img :src="element.product.productImages" alt="" height="100px" width="100px">
                  </div>
                  <div class="col-md-6 col-xs-6">
                    <p>商品名称：<span v-text="element.product.productName"></span></p>
                    <p>购买数量：<span v-text="element.count"></span></p>
                    <p>单价：<span v-text="element.product.price"></span></p>
                  </div>
                </div>
                <p v-if="item.describes" align="center">订单备注：<span v-text="item.describes"></span> </p>
              </td>
              <td class="second middle-cell">
                <p><span>下单时间：</span> <span v-text="item.createDate"></span></p>
                <p v-if="item.payDate"><span>付款日期：</span> <span v-text="item.payDate"></span></p>
                <p v-if="item.deliveryDate"><span>派送日期：</span> <span v-text="item.deliveryDate"></span></p>
                <p v-if="item.confirmDate"><span>收货日期：</span> <span v-text="item.confirmDate"></span></p>
              </td>
              <td class="third middle-cell">
                <p>身高（cm）:<span v-text="item.height"></span></p>
                <p><span>体重（kg）：</span><span v-text="item.weight"></span> </p>
                <p v-if="item.shoulder">肩宽（cm）: <span v-text="item.shoulder"></span></p>
                <p v-if="item.bust ||item.waist ||item.hipline">
                  三围-(胸/腰/臀)：<span v-if="item.bust" v-text="item.bust"></span> /
                  <span v-if="item.waist" v-text="item.waist"></span> /
                  <span v-if="item.hipline" v-text="item.hipline"></span>
                </p>
              </td>
              <td class="fourth middle-cell">
                <p> <span>收件人:</span><span v-text="item.receiver"></span> </p>
                <p><span>联系电话:</span><span v-text="item.mobile"></span> </p>
                <p> <span>收货地址:</span><span v-text="item.address"></span> </p>
              </td>
              <td class="fifth middle-cell">
                <button class="btn btn-danger btn-large">取消订单</button>
                <button class="btn btn-success btn-large">售后服务</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- footer -->
    <div class="container footer-container">
       <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import myNav from '@/components/MyNav';
import myFooter from '@/components/MyFooter';
import { findUserById,findOrderByUserId } from '@/api/user';
export default {
  data () {
    return {
      user: {},
      userId: this.$route.query.userId,
      orderList: {},
      usercenterBack: {
        backgroundImage: "url(" + require("@/assets/niyan/images/detailscontainer.jpg") + ")",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% 50%",
      }
    }
  },
  components:{
    myNav,myFooter
  },
  mounted(){},
  created(){
    this.getUser();
    this.getUserOrder();
  },
  methods:{
    getUser(){
      findUserById(this.userId).then(res =>{
        this.user = res.value;
        console.log(this.user);
      })
    },
    getUserOrder(){
      findOrderByUserId(this.userId).then(res =>{
        console.log(res);
        this.orderList = res.value;
      });
    },
  }
}
</script>
<style scoped>
.usercenter-nav-title{
  font-size: 20px;
  font-weight: 700;
  /* color:white; */
  padding-bottom: 50px;
  text-align: center;
}
.usercenter-container{
  padding: 50px 10px;
}
.order-wrap{
  padding: 50px 1px;
  border-bottom: 1px solid rgba(255,255,255,0.5);
}
.usercenter-flex{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
p{
  margin:0;
}
.first{
  width:30%;
}
.second{
  width:15%;
}
.third{
  width:15%;
}
.fourth{
  width:15%;
}
.fifth{
  width:15%;
}
.col-md-6,.col-md-12,.col-xs-6,.col-xs-12 {
  padding:0;
}
.middle-cell{
  vertical-align: middle;
}
.usercenter-container th{
  text-align:center;
  font-weight:777;
  border-bottom: 2px solid rgba(255,255,255,0.5);
}
.usercenter-container td{
    border-bottom: 1px solid rgba(255,255,255,0.5);
    padding: 50px 0 10px 0;
}
</style>
