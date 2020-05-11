.<!--  -->
<template>
  <div>
    <div style="background-color: rgb(32, 160, 255);height:50px;"></div>
    <el-container>
      <el-aside width="150px" style="padding-top:100px;">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="0">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- <el-menu-item index="1">
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
                <el-input v-model="filters.categoryName" placeholder="类别名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="getCategoryByName">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleAdd">新增</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-header>
        <el-main>
            <el-table
            :data="categoryList"
            style="width: 100%"
            >
            <el-table-column
              label="ID"
              min-width="180">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.categoryId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="类别名"
              min-width="180">
              <template slot-scope="scope">
                <p>{{ scope.row.categoryName }}</p>
              </template>
            </el-table-column>
            <el-table-column label="图标" min-width="180" column-key="categoryIcon">
              <template slot-scope="scope">
                <!-- <p>{{ scope.row.categoryIcon }}</p> -->
                <!-- <i class="niyan-iconfont" :class="scope.row.categoryIcon"></i> -->
                <svg class="niyan-iconfont" aria-hidden="true">
                    <use :xlink:href = scope.row.categoryIcon ></use>
                </svg>
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

          <el-dialog title="新增类别" :visible.sync = "addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">

              <el-form-item label="类别名" prop="categoryName">
                <el-input v-model="addForm.categoryName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="categoryIcon">
                <el-input v-model="addForm.categoryIcon" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="addFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
          </el-dialog>

          <!-- <el-dialog title="查询" :visible.sync = "findFormVisible" :close-on-click-modal="false">
            <el-form :model="findForm" label-width="80px" ref="findForm" :rules="findFormRules">
              <el-form-item label="类别名" prop="categoryName">
                <el-input v-model="findForm.categoryName" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="findFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
          </el-dialog> -->


          <el-dialog title="编辑" :visible.sync = "editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" ref="editForm" :rules="editFormRules">
              <el-form-item label="类别名" prop="categoryName">
                <el-input v-model="editForm.categoryName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="categoryIcon">
                <el-input v-model="editForm.categoryIcon" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
          </div>
          </el-dialog>

       </el-container>
    </el-container>
  </div>
</template>

<script>
import '@/assets/css/back/style.css';
import {getCategoryList,updateCategory,addCategory,deleteCategory} from "@/api/admin";
export default {
  data () {
    return {
      filters:{
        categoryName: ''
      },
      categoryList:[
        {
          categoryId:1,
          categoryName: '衣服'
        },
        {
          categoryId:2,
          categoryName: '书籍'
        }
      ],
      page: 1,
      pageSize: 5,
      totalPage: 25,
      isSearch: false,
      listLoading: false,
      editFormVisible: false,
      findFormVisible: false,
      addFormVisible: false,
      editLoading: false,
      //编辑界面数据
      editForm: {
        categoryName:'',
        categoryIcon:""
      },
      editFormRules: {
        categoryName: [{ required: true, message: '请输入类别名', trigger: 'blur' }],
      },

      //查询
      findForm: {
        categoryName:''
      },
      findFormRules: {
        categoryName: [{ required: true, message: '请输入类别名', trigger: 'blur' }],
      },
      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        categoryName: [{ required: true, message: '请输入类别名', trigger: 'blur' }],
      },
      //新增界面数据
      addForm: {
       categoryName:'',
       categoryIcon:"",
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

    // handleCellChange: function(row, column, cell, event){
    //   console.log(column.columnKey);
    //   //columnKey,用于标识哪一列
    //   if(column.columnKey === 'products'){
    //     console.log("去商品列表页");
    //     this.goToProductList(row.categoryId)
    //   }
    // },
    getCategoryByName (){
      console.log("Cet Category By Name");
      this.isSearch = true;//控制分页展示，搜索时分页查询失效，不能再分页查询了
      this.categoryList = this.categoryList.filter(value => value.categoryName.indexOf(this.filters.categoryName) !== -1 );

    },
    switchPage(page) {
      if (!this.isSearch) {
        this.page = page;
        this.getCategoryListWithPage();
      } else {
        this.page = page;
        this.getCategoryListWithPage();
      }
    },

    getCategoryListWithPage(){
      getCategoryList(this.page,this.pageSize).then(res =>{
        console.log(res);
        this.categoryList = res.value;
      })
    },
    // editCategory(category){

    // },

    //删除
    handleDelete: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', { type: 'warning'}).then(() => {
        this.listLoading = true;
        let para = row.categoryId;
        console.log(1,para);
        deleteCategory(para).then(res =>{
          console.log("success delete");
          this.listLoading = false;
          this.$message({
                message: '删除成功',
                type: 'success'
          });
          this.getCategoryListWithPage();
        });
      });
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      console.log("新增");
      console.log(this.addFormVisible);
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            updateCategory(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getCategoryListWithPage();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            addCategory(para).then((res) => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getCategoryListWithPage();
            });
          });
        }
      });
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
    goToCategoryList: function () {
      console.log("去商品页");
      this.$router.push({
          path: `/admin/category`,
      })
    },
    goToProductList () {
      console.log("go to productlist");
      this.$router.push({
        path: `/admin/product`,
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
    console.log("created");
    this.getCategoryListWithPage();
  },
}
</script>
<style>
#niyan-hanfudoupeng {
  color: red !important;
}
</style>
