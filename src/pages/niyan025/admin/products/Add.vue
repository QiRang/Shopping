.<!--  -->
<template>
   <div>
    <div style="background-color: rgb(32, 160, 255);height:50px;"></div>
    <el-container>
      <el-aside width="150px" style="padding-top:100px;">
        <el-menu
          default-active="1-2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="0">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goToProductList">商品列表</el-menu-item>
              <el-menu-item index="1-2" @click="goToProductAdd">添加商品</el-menu-item>
              <el-menu-item index="1-3" @click="goToCategoryList">商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>订单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="goToOrderList">订单列表</el-menu-item>
              <el-menu-item index="2-2">订单设置</el-menu-item>
              <el-menu-item index="2-3">退货处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-guide"></i>
              <span>营销</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">优惠券</el-menu-item>
              <el-menu-item index="4-2">人气商品</el-menu-item>
              <el-menu-item index="4-3">专题推荐</el-menu-item>
              <el-menu-item index="4-4">广告</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>统计分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">1</el-menu-item>
              <el-menu-item index="5-2">2</el-menu-item>
              <el-menu-item index="5-3">3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--新增界面-->
      <el-form style="margin-top:100px;padding-left:100px;" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="商品名" prop="productName">
          <el-input v-model="addForm.productName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="describe">
          <el-input v-model="addForm.describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存量" prop="stock">
          <el-input v-model="addForm.stock" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="productImages">
          <el-input v-model="addForm.productImages" auto-complete="off"></el-input>
        </el-form-item>

        <div>
          <el-button>取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-form>
    </el-container>
   </div>
</template>

<script>
export default {
  data () {
    return {
      addLoading: false,
      addFormRules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      //新增界面数据
      addForm: {
        productName: '',
        describe: '',
        stock: 0,
        price: 0.00,
        productImages: ''

      }
    }
  },
  methods: {
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goToCategoryList: function () {
      console.log("去商品页");
      this.$router.push({
          path: `/admin/category`,
      })
    },
    goToProductList: function () {
      console.log("go to productlist");
      this.$router.push({
        path: `/admin/product`
      })
    },
    goToOrderList: function(){
      console.log("去订单列表页面");
      this.$router.push({
          path: `/admin/order`,
      })
    },
    goToUserList: function() {
      console.log("go to user list page");
      this.$router.push({
        path: `/admin/user`
      })
    },
    goToProductAdd: function(){
      console.log("去添加商品页面");
      this.$router.push({
          path: `/admin/AddProduct`,
      })
    },
    goToImages(userId, userImage) {
      // console.log("row:");
      // console.log(row);
      // let temp = row.userId;
      this.$router.push({
          path: `/admin/images`,
          query: {userId,userImage}
      })
    },
    goToAddress(userId){
      // console.log("row:");
      // console.log(row);
      //let userId = row.userId;
       this.$router.push({
          path: `/admin/address`,
          query: {userId}
      })
    }
  },
  created() {

  },
}
</script>
<style scoped>
</style>
