<template>
   <!-- 导航，每页都有 -->
   <div>
     <img :src="logoImg" style="height:100px;width:100%;"/>
    <nav class="navbar navbar-default navbar-fixed-top" :style="navBack">
      <div class="container-fluid">
        <div class="container" id="nav-container">
          <div class="navbar-header">
            <div class="navbar-brand" id="welcome">欢迎 <span v-text="username"></span></div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <p  @click="goToLoginOrRegister" class="nav-li">登陆/注册</p>
            </div>
            <div class="col-md-3">
              <p @click="goToUserCenter" class="nav-li">用户中心</p>
            </div>
            <div class="col-md-3">
              <p @click="goToCart" class="nav-li">我的购物车</p>
            </div>
            <div class="col-md-3">
              <p @click="goToHome" class="nav-li" style="width:50px;">首页</p>
            </div>
            <!-- <div class="col-md-6">
              <ul class="nav-tabs">
                <li @click="goToLoginOrRegister" class="nav-li">登陆/注册</li>
                <li @click="goToUserCenter" class="nav-li">用户中心</li>
                <li @click="goToCart" class="nav-li" align="center">
                  <span class="cart-span">我的购物车</span>
                  <span :class="username == '' ? 'countOff':'countOn'" v-text="$store.getters.getAllCount">0</span>
                </li>
                <li @click="goToHome" class="nav-li">首页</li>
              </ul>
            </div> -->
          </div>
        </div>
      </div>
    </nav>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      // username: "",
      // userId: "",
      // logoImg:require("@/assets/niyan/images/finallogoHead.jpg"),
      username: " ",
      logoImg:require("@/assets/niyan/images/backgrondImageHead03.jpg"),
      navBack: {
        backgroundImage: "url(" + require("@/assets/niyan/images/nav.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        marginTop:"0px",
        color: "white",
      }

    }
  },
  methods: {
    goToLoginOrRegister(){
      this.$router.push({
        path:`/login/loginregister`
      });
    },
    goToCart: function(){
      console.log("去购物车页");
      this.$router.push({
        path:`/cart`
      });
    },
    goToHome: function(){
      console.log("去首页");
      this.$router.push({
        path:`/`
      });
    },
    goToUserCenter: function () {
      if(this.username == ""){
        alert("请先登录");
        return;
      }
      // let userId = this.userId
      console.log("去用户中心页");
      this.$router.push({
        path:`/userCenter`,
        // query: {userId}
      });
    }
  },
  created() {
   this.username =  JSON.parse(sessionStorage.getItem("user")||"{}").username || "";
    // this.userId =  JSON.parse(sessionStorage.getItem("user")||"{}").userId || 0;
  //  this.user = JSON.parse(sessionStorage.getItem("user")||"{}");
  //  console.log(this.user);
  },
}
</script>
<style scoped>
/* 导航样式设置 */
.countOn{
  /* background:red; */
  /* border-radius:50%;
  padding:0 3px; */
  /* margin:0 -10px 0 0; */
  margin: 0 0 0 -5px;
  color:white;
  visibility: visible;
  font-size: 15px;
}
.countOff{
  visibility: hidden;
}
/* .nav-tabs{
  height:100%;
  background: red;
  border:0;
  position: relative;
  float: right;
  color:rgba(255, 255, 255,0.5);
} */
p.nav-li{
  line-height: 50px;
  height:50px;
  width:90px;
  text-align: right;
  /* float: right; */
  /* padding-left:30px; */
  color:rgba(255, 255, 255,0.5);
  margin:0;
  /* font-weight: 900;
  font-size: 17px; */
}
.nav-li:hover{
  color: rgba(255, 255, 255, 1);
}
.nav-li, .navbar-brand, .cart-span{
  font-weight: 900;
  font-size: 16px;
}
nav{
  padding:0;
  height:50px;
  box-sizing: content-box;
  background-color: rgba(255, 249, 250,0);
  margin-top:-50px;
  margin-bottom: 0px;
}
nav .col-md-3{
  padding: 0 0 0 30px;
}
.container-fluid{
  padding:0;
  height:50px;
}
#welcome{
  padding:0;
  margin-left: 0px;
  line-height: 50px;
  height:50px;
  color:rgb(255, 255, 255);
}
#welcome :hover{
  color:rgb(255, 255, 255);
}
#welconme{
  padding:0;
  margin: 0px;
  line-height: 50px;
  height:50px;
}
#nav-container{
  height:50px;
  padding:0;
  /* background-color: rgb(248, 248, 248); */
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
  color:rgb(239,77,64);
  /* background-color: rgb(253, 237, 238); */
  background-color: rgb(205, 205, 205);
}
</style>
