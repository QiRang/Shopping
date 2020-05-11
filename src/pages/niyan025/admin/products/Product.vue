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
              <el-menu-item index="2-1" @click="goToOrderList">订单列表</el-menu-item>
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
      <el-container>
        <!--工具条-->
        <el-header style="margin-top:50px;background-color: white;border:0px;">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
              <el-form-item>
                <el-input v-model="filters.productName" placeholder="商品名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="getProductByName">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleAdd">新增</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-header>
        <el-main>
            <el-table
            :data="productList"
            style="width: 100%"
            @cell-click="handleCellChange"
            >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              label="ID"
              min-width="80">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.productId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品名"
              min-width="100">
              <template slot-scope="scope">
                <p>{{ scope.row.productName }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="类别"
              min-width="80">
              <template slot-scope="scope">
                <p>{{ scope.row.category.categoryName }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="价格"
              min-width="100">
              <template slot-scope="scope">
              <p>{{ scope.row.price }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="库存量"
              min-width="80">
              <template slot-scope="scope">
                <p>{{ scope.row.stock }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="创建日期"
              min-width="180">
              <template slot-scope="scope">
              <p>{{ scope.row.createDate }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="描述"
              min-width="150"
              >
              <template slot-scope="scope">
              <p>{{ scope.row.describes}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="productImages" label="图片" min-width="100"
            column-key="image"
            >
                 <!-- 图片的显示 -->
                 <template  slot-scope="scope">
                    <img :src="scope.row.productImages" width="50" height="50"/>
                 </template>
            </el-table-column>
            <el-table-column label="操作" min-width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click.native="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.native="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--工具条-->
          <!-- <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
          </el-col> -->
          <el-pagination
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
            <!-- 编辑界面 -->
          <el-dialog title="编辑" :visible.sync = "editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" ref="editForm">
              <el-form-item label="类别" prop="categoryId">
                <el-select v-model="editForm.categoryId" placeholder="请选择">
                  <el-option
                    v-for="item in categories"
                    :key="item.categoryId"
                    :label="item.categoryName"
                    :value="item.categoryId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品名" prop="productName">
                <el-input v-model="editForm.productName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品描述" prop="describes">
                <el-input v-model="editForm.describes" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="库存量" prop="stock">
                <el-input v-model="editForm.stock" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="价格" prop="price">
                <el-input v-model="editForm.price" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="创建日期" prop="createDate" style="display:none;">
                <el-input v-model="editForm.createDate" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native.prevent ="editSubmit" :loading="editLoading">提交</el-button>
          </div>
          </el-dialog>

          <!--新增界面-->
          <el-dialog title="新增" :visible.sync = "addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
              <el-form-item label="类别" prop="categoryId">
                <!-- <el-input v-model="addForm.categoryId" auto-complete="off"></el-input> -->
                <el-select v-model="addForm.categoryId" placeholder="请选择">
                  <el-option
                    v-for="item in categories"
                    :key="item.categoryId"
                    :label="item.categoryName"
                    :value="item.categoryId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品名" prop="productName">
                <el-input v-model="addForm.productName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品描述" prop="describes">
                <el-input v-model="addForm.describes" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="库存量" prop="stock">
                <el-input v-model="addForm.stock" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="价格" prop="price">
                <el-input v-model="addForm.price" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="创建日期" prop="createDate" style="display:none;">
                <el-input v-model="addForm.createDate" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="addFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
          </el-dialog>
       </el-container>
    </el-container>
  </div>
</template>

<script>
import { getProductList,addProduct,editProduct} from "@/api/admin"
import {getCategories} from "@/api/public"
export default {
  data () {
    return {
      categories: [],
      category: '',
      page: 1,
      pageSize: 5,
      totalPage: 25,
      isSearch: false,
      productList: [],
      filters:{
        productName: ''
      },
      listLoading: false,
      addFormVisible: false,//新增界面是否显示
      editFormVisible: false,//编辑页面是否显示
      addLoading: false,
      editLoading: false,
      addFormRules: {
        productName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        stock: [{ required: true, message: '请输入库存量', trigger: 'blur' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }]
      },
      //新增界面数据
      addForm: {
        categoryId: 1,
        productName: '',
        describes: '',
        stock: 0,
        price: 0.00,
        createDate: null,

      },
      editForm: {
        categoryId: 1,
        productName: '',
        describes: '',
        stock: 0,
        price: 0.00,
        createDate: null,

      }

    }
  },
  methods: {
    switchPage(page) {
      if (!this.isSearch) {
        this.page = page;
        this.getProductListWithPage();
      } else {
      }
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getProductListWithPage(){
      getProductList(this.page, this.pageSize).then(res =>{
        this.productList = res.value;
      })
    },
    getAllCategory(){
      getCategories().then(res =>{
        console.log(res);
        this.categories = res.value;
        console.log("categories");
        console.log(this.categories);
      })
    },
    getProductByName(){
      console.log(this.filters.productName);
      this.isSearch = true;//控制分页展示，搜索时分页查询失效，不能再分页查询了
      this.productList = this.productList.filter(value => value.productName.indexOf(this.filters.productName) !== -1 );
      console.log(this.userList);
    },
    //删除商品
    handleDelete: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        //logoff(row.userId);
        //this.getUserListWithPage();
      }).catch((err) => {
        console.log(err);
      });
    },
    getNowFormatDate () {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
      month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
      },
    //显示编辑界面
    handleEdit: function (index, row) {
      console.log("显示编辑界面");
      console.log(row);
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.editForm.categoryId = row.category.categoryId;
      console.log(this.editForm);
    },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm.createDate = this.getNowFormatDate();
      console.log("时间为");
      console.log(this.addForm.createDate);
    },
    //新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            let product = Object.assign({}, this.addForm);
            console.log("product");
            console.log(product);
            addProduct(product).then(res =>{
              this.addLoading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getProductListWithPage();
            }).catch(error =>{
              console.log(error);
            })
          });
        }
      });
    },
    // 编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if(valid){
          this.$confirm("确认修改么？", "提示",{}).then(() =>{
            this.editLoading = true;
            let product = Object.assign({}, this.editForm);
            console.log(product);
            editProduct(product).then(res =>{
              this.editLoading = false;
              this.$message({message: "修改成功", type: "success"});
              console.log(this);
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getProductListWithPage();
            }).catch(error =>{
              console.log(error);
              });
          });
        }
      });
    },
    handleCellChange: function(row, column, cell, event){
      console.log(column.columnKey);
      //columnKey,用于标识哪一列
     if(column.columnKey === 'image'){
        console.log("去图片管理页");
        this.goToImages(row.productId, row.productImages);
      }
    },
    goToCategoryList: function () {
      console.log("去category页");
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
    goToImages(productId, productImages) {
      // console.log("row:");
      // console.log(row);
      // let temp = row.userId;
      this.$router.push({
          path: `/admin/images`,
          query: {productId,productImages}
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
    console.log("执行created");
    this.getProductListWithPage();
    this.getAllCategory();
  },
}
</script>
<style scoped>
@import url("//unpkg.com/element-ui@2.8.2/lib/theme-chalk/index.css");
</style>
