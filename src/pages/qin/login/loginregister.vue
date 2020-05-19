<template>
  <div>
    <div class="wrap login_wrap">
      <div class="content">
        <div style="height:150px;"></div>
        <div class="login_box">
          <div class="login_form">
            <div class="login_title">
              <a href="" @click.prevent="flag = true">
                <div class="login_title_title" :class="[flag?'on':'off']">登陆</div>
              </a>
              <a href="" @click.prevent="flag=false">
                <div class="login_title_title" :class="[flag?'off':'on']">注册</div>
              </a>
            </div>
            <login v-if="flag"></login>
            <register v-else="flag"></register>
          </div>
        </div>
        <!-- <br><br><br><br><br><br><br><br><br><br> -->
      </div>
    </div>
  </div>
</template>
<style>
div.on{
  color:rgba(179,65,67,1);
}
div.off{
  color:rgba(179,65,67,0.3);
}

</style>
<script>
import '@/assets/css/back/reset.css';
import '@/assets/css/back/font-awesome.min.css';
import '@/assets/css/js/jquery.min.js';
import '@/assets/css/js/common.js';
import login from '../login/dam/login';
import register from '../login/dam/register';
import {findUserByUsernameAndPassword, addUser } from '@/api/user';
export default {
  data (){
    return {
      flag : true,
    }
  },
  methods:{
  },
  components: {
    login,
    register
  },
}
</script>
