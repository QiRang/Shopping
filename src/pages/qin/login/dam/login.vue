<template>
  <div>
    <form action="#" method="post">
      <div class="form_text_ipt">
          <input v-model="username" name="username" type="text" placeholder="手机号/邮箱/账号">
          <!-- <span for="" :class="usernameFlag? 'normal':'error'">*手机号/邮箱/账号不能为空</span> -->
      </div>
      <div class="ececk_warning"><span>手机号/邮箱/账号不能为空</span></div>
      <div class="form_text_ipt">
        <input v-model="password" name="password" type="password" placeholder="密码">
        <!-- <span for="" :class="passwordFlag? 'normal':'error'" >*密码不能为空</span> -->
      </div>
      <div class="ececk_warning"><span>密码不能为空</span></div>
      <div class="form_check_ipt">
        <div class="left check_left">
          <label><input name="" type="checkbox"> 下次自动登录</label>
        </div>
        <div class="right check_right">
          <a href="#">忘记密码</a>
        </div>
      </div>
      <div class="form_btn">
        <button type="button" @click="handleSubmit">登录</button>
      </div>
      <br><hr>
    </form>
  </div>
</template>
<script>
import { findUserByUsernameAndPassword } from '@/api/user';
export default {
  data (){
    return {
      username: "",
      password: "",
    }
  },
 methods:{
   handleSubmit(){
      console.log("点击登陆");
      if(this.username != "" && this.password != ""){
       findUserByUsernameAndPassword(this.username, this.password).then(res => {
         if(res.code == 200){
            //缓存一个user
            sessionStorage.setItem("user",JSON.stringify(res.value));
            this.goToIndex();
         } else {
           alert("用户名或者密码错误");
         }

       });
      } else {
        alert("请输入用户名或者密码");
      }
   },
   goToIndex(){
     //去首页
    this.$router.push({
      path: `/`
    })
   }
  }
}
</script>
<style>
  .error{
    color: red;
    opacity: 1;
  }
  .normal{
    opacity: 0;
  }
</style>

