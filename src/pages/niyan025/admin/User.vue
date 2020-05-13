.<!--  -->
<template>
  <div>
    <div style="background-color: rgb(32, 160, 255);height:50px;"></div>
    <el-container>
      <el-aside width="150px" style="padding-top:100px;">
        <el-menu
          default-active="3"
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
      <el-container>
        <!--工具条-->
        <el-header style="margin-top:50px;background-color: white;border:0px;">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
              <el-form-item>
                <el-input v-model="filters.username" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="getUserByName">查询</el-button>
              </el-form-item>
              <!-- <el-form-item>
                <el-button type="primary" @click="handleAdd">新增</el-button>
              </el-form-item> -->
            </el-form>
          </el-col>
        </el-header>
        <el-main>
            <el-table
            :data="userList"
            style="width: 100%"
            @cell-click="handleCellChange"
            >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              label="ID"
              min-width="80">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.userId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              min-width="180">
              <template slot-scope="scope">
                <p>{{ scope.row.username }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="密码"
              min-width="180">
              <template slot-scope="scope">
              <p>{{ scope.row.password }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="电话号码"
              min-width="120">
              <template slot-scope="scope">
              <p>{{ scope.row.phoneNumber }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="性别"
              min-width="80"
              :formatter="formatSex">
            </el-table-column>
            <el-table-column
              label="出生日期"
              min-width="180">
              <template slot-scope="scope">
              <p>{{ scope.row.birth }}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column
              label="收货地址"
              min-width="150"
              column-key="address"
              >
              <template slot-scope="scope">
              <p>点击进入待完善</p>
              </template>
            </el-table-column> -->
            <el-table-column prop="userImage" label="图片" min-width="100"
            column-key="image"
            >
                 <!-- 图片的显示 -->
                 <template  slot-scope="scope">
                    <img :src="scope.row.userImage" width="50" height="50"/>
                 </template>
            </el-table-column>
            <el-table-column label="操作" min-width="200">
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
          <!--工具条-->
          <!-- <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
          </el-col> -->
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
            <!-- 编辑界面 -->
          <!-- <el-dialog title="编辑" :visible.sync = "editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="editForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户密码">
                <el-input v-model="editForm.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="editForm.sex">
                  <el-radio class="radio" :label="0">男</el-radio>
                  <el-radio class="radio" :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
              <el-button type="primary" @click.native="editSubmit">提交</el-button>
          </div>
          </el-dialog> -->

          <!--新增界面-->
          <!-- <el-dialog title="新增" :visible.sync = "addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username" auto-complete="off"></el-input>
              </el-form-item>
               <el-form-item label="用户密码" prop="password">
                <el-input v-model="addForm.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="addForm.sex">
                  <el-radio class="radio" :label="0">男</el-radio>
                  <el-radio class="radio" :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker type="date" placeholder="选择出生日期" v-model="addForm.birth"></el-date-picker>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="addFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
          </el-dialog> -->
       </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserList,searchUser } from '@/api/admin';
import { deleteUser } from '@/api/user';

//import qs from 'qs' ;
export default {
  data () {
    return {
      dialogVisible: false,
      filters: {
					username: ''
				},
      userList: [],
      //需要给分页组件传的信息
      // paginations: {
      //     page_index: 1,  // 当前位于哪页
      //     total: 100,        // 总数
      //     page_size: 5,   // 1页显示多少条
      //     page_sizes: [5, 10, 15, 20],  //每页显示多少条
      //     layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
      // },
      page: 1,
      pageSize: 5,
      totalPage: 25,
      isSearch: false,
      listLoading: false,
      sels: [],//列表选中列
      // editFormVisible: false,//编辑界面是否显示
      // editLoading: false,
      // editFormRules: {
      //   name: [
      //     { required: true, message: '请输入姓名', trigger: 'blur' }
      //   ]
      // },
      // //编辑界面数据
      // editForm: {
      //   id: 0,
      //   name: '',
      //   sex: 3,
      //   password: 0,
      //   birth: '',
      // },
      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      //新增界面数据
      addForm: {
        username: '',
        password: '',
        sex: 3,
        birth: '',
        phoneNumber: ''
      }
    }
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // handleRowChange: function(row){
    //   console.log(row);
    //   //这个方法针对整行
    // },
    handleCellChange: function(row, column, cell, event){
      console.log(column.columnKey);
      //columnKey,用于标识哪一列
      if(column.columnKey === 'address'){
        console.log("去收货管理页");
        this.goToAddress(row.userId);
      } else if(column.columnKey === 'image'){
        // console.log("去图片管理页");
        // this.goToImages(row.userId, row.userImage);
      }
    },
    formatSex: function (row, column, cellValue, index) {
      //console.log(row);
			return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
		},
    getUserByName(){
      console.log("Get User By Name");
      this.isSearch = true;
      searchUser(this.filters.username).then(res =>{
        this.userList = res.value;
      });
      // this.userList = this.userList.filter(value => value.username.indexOf(this.filters.username) !== -1 );
      // console.log(this.userList);

    },
    // getUserListWithPage () {
    //   //let that = this;
    //   this.axios({
    //     method: "get",
    //     url:`${this.baseURL}/users`,
    //     params: {
    //         pageNum: this.page,
    //         pageSize: 5
    //     }
    //   })
    //   .then((res)=> {
    //       console.log(res.data.value);
    //       console.log(this);
    //       this.userList = res.data.value;
    //       console.log("完成");
    //       console.log('userList' + this.userList);
    //       // this.userList.forEach(item => {
    //       //   console.log(item);
    //       // });
    //       //这里如果forEach了的话，渲染不出来userId项，故注释掉
    //   })
    //   .catch((error)=> {
    //       console.log(error);
    //   });
    // },
    //按页获取用户大小
    getUserListWithPage () {
      getUserList(this.page, this.pageSize).then(res =>{
        console.log("res:");
        console.log(res);
        this.userList = res.value;
      }).catch(error =>{
        console.log("error:");
        console.log(error);
      })
    },
    switchPage(page) {
      if (!this.isSearch) {
        this.page = page;
        this.getUserListWithPage();
      } else {

      }
    },
    //删除用户
    handleDelete: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        deleteUser(row.userId);
        this.getUserListWithPage();
      }).catch((err) => {
        console.log(err);
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
            editUser(para).then((res) => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getUserList();
            });
          });
        }
      });
    },
    //新增
    // addSubmit: function () {
    //   this.$refs.addForm.validate((valid) => {
    //     if (valid) {
    //       this.$confirm('确认提交吗？', '提示', {}).then(() => {
    //         this.addLoading = true;
    //         let user = Object.assign({}, this.addForm);
    //         register(user).then(res =>{
    //           console.log("res");
    //           console.log(res);
    //           // this.addLoading = false;
    //           // this.$message({
    //           //   message: '提交成功',
    //           //   type: 'success'
    //           // });
    //           // this.$refs['addForm'].resetFields();
    //           // this.addFormVisible = false;
    //           this.getUserListWithPage();
    //         }).catch(error =>{
    //           console.log(error);
    //         })
    //       });
    //     }
    //   });
    // },
    selsChange: function (sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        //NProgress.start();
        let para = { ids: ids };
        batchRemoveUser(para).then((res) => {
          this.listLoading = false;
          //NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getUserList();
        });
      }).catch(() => {
      });
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
    this.getUserListWithPage();
  },
  mounted() {
    //console.log("mounted");
    this.filters.username = ''
  },
  destroyed() {
    //window.removeEventListener('hashchange', this.afterQRScan);
  }
}
</script>


<style scoped>
/* header{

} */

</style>
