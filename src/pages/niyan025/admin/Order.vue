.<!--  -->
<template>
   <div>
    <div style="background-color: rgb(32, 160, 255);height:50px;"></div>
    <el-container>
      <el-aside width="150px" style="padding-top:100px;">
        <el-menu
          default-active="2-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="0">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- <el-menu-item index="1" @click="goToCategoryList">
            <i class="el-icon-goods"></i>
            <span slot="title">商品</span>
          </el-menu-item> -->

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goToCategoryList">类别设置</el-menu-item>
              <el-menu-item index="1-2" @click="goToProductList">商品列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>订单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">订单列表</el-menu-item>
              <el-menu-item index="2-2">订单设置</el-menu-item>
              <el-menu-item index="2-3">退货处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3" @click="goToUserList">
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
      <!-- 显示table -->
      <el-container>
        <!--工具条-->
        <el-header style="margin-top:50px;background-color: white;border:0px;">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
              <!-- <el-form-item>
                <el-input v-model="filters.productName" placeholder="商品名称"></el-input>
              </el-form-item> -->
              <el-form-item label="手机号">
                <el-input v-model="filters.mobile" placeholder="手机号"></el-input>
              </el-form-item>
              <!-- <el-form-item>
                <el-select v-model="filters.status" placeholder="请选择订单状态">
                  <el-option
                    v-for="item in categories"
                    :key="item.categoryId"
                    :label="item.categoryName"
                    :value="item.categoryId">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="收件人">
                <el-input v-model="filters.receiver" placeholder="收件人"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="filtersOrder">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-header>
        <!-- 数据显示 -->
        <el-main>
          <el-table
          :data="orderList"
          style="width:100%"
          >
             <el-table-column type="expand">
              <template slot-scope="props">
                <div>
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="创建日期">
                      <span>{{ props.row.createDate }}</span>
                    </el-form-item>
                    <el-form-item label="付款日期">
                      <span>{{ props.row.payDate }}</span>
                    </el-form-item>
                    <el-form-item label="派送日期">
                      <span>{{ props.row.deliveryDate }}</span>
                    </el-form-item>
                    <el-form-item label="收货日期">
                      <span>{{ props.row.confirmDate }}</span>
                    </el-form-item>
                    <div v-for="(item, index) in props.row.orderItems">
                      <el-form-item style="padding:10px 0;">
                        <div style="width:400px;height:80px;">
                          <img :src="item.product.productImages" alt="" style="width:100%;height:100%;">
                        </div>
                      </el-form-item>
                      <el-form-item style="padding:10px 0;">
                        <span style="padding:0 10px 0 0;">
                          商品名称：{{ item.product.productName }}
                        </span>
                        <span style="padding:0 10px;">购买数量：{{ item.count }}</span>
                        <span style="padding:0 10px;">单价：{{item.product.price }}</span>
                      </el-form-item>
                    </div>
                    <el-form-item>来自用户：{{ props.row.orderItems[0].userId}}</el-form-item>
                     <el-form-item label="订单备注：">
                      <span>{{ props.row.describes }}</span>
                    </el-form-item>
                    <el-form-item label="身高（cm）：">
                      <span>{{ props.row.height }}</span>
                    </el-form-item>
                    <el-form-item label="体重（kg）:">
                      <span>{{ props.row.weight }}</span>
                    </el-form-item>
                     <el-form-item label="肩宽（cm）:">
                      <span>{{ props.row.shoulder }}</span>
                    </el-form-item>
                     <el-form-item label="三围-(胸/腰/臀,cm)：">
                      <span>{{ props.row.bust }} / {{ props.row.waist }} / {{ props.row.hipline }}</span>
                    </el-form-item>
                  </el-form>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="ID" min-width="80">
               <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.orderId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="收件人" min-width="80">
               <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.receiver }}</span>
              </template>
            </el-table-column>
            <el-table-column label="收件人手机" min-width="80">
               <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" min-width="80">
               <template slot-scope="scope" >
                <!-- <i class="el-icon-time"></i> -->
                <!-- <span style="margin-left: 10px">{{ scope.row.status }}</span> -->
                <span style="margin-left: 10px"  :formatter="formatStatus">待付款</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
          v-if="!isSearch"
            align="center"
            style="padding-top:20px"
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalPage"
            :current-page="page"
            @current-change="switchPage"
          >
          </el-pagination>
        </el-main>
      </el-container>
    </el-container>
   </div>
</template>

<script>
import {getOrderList, searchOrder} from '@/api/admin'
export default {
  data () {
    return {
      orderList: {},
      page: 1,
      pageSize: 5,
      totalPage: 25,
      isSearch: false,
      filters: {
        // productName:"",
        mobile:"",
        // status: "",
        receiver: "",
      },
      orderStatusRule:[
        {statusCode:0,statusMean:"未付款"},
        {statusCode:1,statusMean:"未发货"},
        {statusCode:2,statusMean:"邮寄中"},
      ]
    }
  },
  components: {},
  computed: {},
  mounted(){

  },
  created() {
    this.getOrderListWithPage();
  },
  methods: {
    filtersOrder(){
      this.isSearch = true;//控制分页展示，搜索时分页查询失效，不能再分页查询了
      searchOrder(this.filters.receiver, this.filters.mobile).then(res => {
        this.orderList = res.value;
      });
//       let filters = this.filters;
//       console.log(filters);
//       //拿到有值的参数
//       let tempFilter = {};
//       for(let key in filters) {
//         if(typeof(filters[key]) != "undefined" && typeof(filters[key])
//         != "null" && filters[key] != null && filters[key] != "") {
//           tempFilter[key] = filters[key];
//         }
//       }
//       console.log(tempFilter);
//       //筛选
//       this.orderList = this.orderList.filter((item) => {
//         let flag = false;
//         for(let key in tempFilter) {
//           console.log(111,item[key],tempFilter[key]);
//           if(item[key].indexOf(tempFilter[key]) !== -1) {
//             flag = true;
//           } else {
//             flag = false;
//             break;
//           }
//         }
//         if(flag) {
//           return item;
//         }
//       });
//       console.log("进行筛选");
//       console.log(this.orderList);
    },
    formatStatus: function (row, column, cellValue, index) {
      console.log("row:");
      console.log(row);
			return row.status == 0 ? '待付款' : row.status == 1 ? '待派送' : '未知';
		},
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getOrderListWithPage(){
      getOrderList(this.page,this.pageSize).then(res =>{
        console.log("res");
        console.log(res);
        this.orderList = res.value;
      })
    },
    switchPage(page) {
      if (!this.isSearch) {
        this.page = page;
        this.getOrderListWithPage();
      } else {

      }
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
  }
}
</script>
<style scoped>

@import url("//unpkg.com/element-ui@2.8.2/lib/theme-chalk/index.css");
.demo-table-expand {
    font-size: 0;
}/*这段不能省，否则el-form-item 的 width相当于100%*/
 .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
.demo-table-expand .el-form-item{
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
