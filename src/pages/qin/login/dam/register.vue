<template>
  <div>
    <form action="#" method="post" name="registerForm" v-model="registerForm">
      <div class="form_text_ipt">
        <input name="username" v-model="registerForm.username" type="text" placeholder="手机号/邮箱">
      </div>
      <div class="ececk_warning"><span>手机号/邮箱不能为空</span></div>
      <div class="form_text_ipt">
        <input name="password" v-model="registerForm.password" type="password" placeholder="密码">
      </div>
      <div class="ececk_warning"><span>密码不能为空</span></div>
      <div class="form_text_ipt">
          <input name="repassword" v-model="registerForm.checkPassword" type="password" placeholder="重复密码">
      </div>
      <div class="ececk_warning"><span>密码不能为空</span></div>
      <div class="form_text_ipt">
          <input name="code" type="text" placeholder="验证码">
      </div>
      <div class="ececk_warning"><span>验证码不能为空</span></div>
      <div class="form_btn">
        <button type="button" @click="handleSubmit">注册</button>
      </div>
      <br><hr>
    </form>
  </div>
</template>
<style>

</style>
<script>
import { addUser } from "@/api/user";
export default {
  data (){
    return {
      registerForm: {
        password: "",
        username:"",
        checkPassword:"",
      }
    }
  },
 methods:{
   handleSubmit(){
     //用户提交注册订单
     console.log(this.registerForm.password);
     console.log(this.registerForm.checkPassword);
      if(this.registerForm.password == "" || this.registerForm.username == "" || this.registerForm.checkPassword == ""){
        alert("请输入正确的注册信息");
      } else {
        if(this.registerForm.password !== this.registerForm.checkPassword){
          alert("两次的输入密码不一致");
        } else {
          let user = Object.assign({}, this.registerForm);
          addUser(user).then(res => {
            console.log(res);
            if(res.data.code == 200){
              alert("注册成功");
              this.registerForm.password = "";
              this.registerForm.username = "";
              this.registerForm.checkPassword = "";
            } else {
              alert(res.data.message);
            }
          });
        }
      }
   },
  }
}
</script>
