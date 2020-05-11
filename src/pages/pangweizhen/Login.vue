<template>
  <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked"  class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmitLoginForm" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { login } from '@/api/user';
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          account: '',
          password: ''
        },
        loginFormRules: {
          account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        },
        checked: false
      };
    },
    props: ["username","password"],
    methods: {
      handleSubmitLoginForm(ev) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.goToProductList();
          }
        });
      },
      goToProductList: function () {
        console.log("go to productlist");
        this.$router.push({
          path: `/admin/product`
        })
      },
    }
  }
</script>

<style  scoped>
  .login-container {
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
