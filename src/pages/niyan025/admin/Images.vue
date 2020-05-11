.<!--  -->
<template>
  <div class='index-container'>
    <!-- {{userId}} -->
    <div style="margin-bottom:50px;width:200px;text-align:center;">
      <img :src="productImages" style="display:block" width="200px" height="200px"/>
      <div style="">当前图片</div>
    </div>

    <div style="border-radius:2px;width:200px;text-align:center;">
      <el-upload
        class="uploader"
        action="http://localhost:8081/fileUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" width="100px" height="100px">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button style="margin-top:20px;" size="mini" type="primary" @click="onSubmit">确认修改</el-button>
    </div>
  </div>
</template>

<script>
import { uploadFile } from '@/api/public';
import {updateProductImages} from '@/api/admin'
export default {
  data () {
    return {
      //userId: this.$route.query.userId,
      productId: this.$route.query.productId,
      productImages: this.$route.query.productImages,
      imageUrl: ''
    }
  },
  components: {},
  computed: {},
  mounted() {
    console.log(this.$route.query);
  },
  methods: {
    beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
      console.log(file);
      const isJPG = true;
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
     handleAvatarSuccess(res, file) {
        console.log(res);
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.value;
      },
     onSubmit() {
       console.log(this.productId,this.imageUrl);
        updateProductImages(this.productId,this.imageUrl).then(res =>{
          console.log(this);
          console.log(res);
          if(res.data.code === 200){
            alert("修改成功");
            this.goToProductList();
          }
        })
    },
    goToProductList: function () {
      console.log("go to productlist");
      this.$router.push({
        path: `/admin/product`
      })
    },
  },
  created() {
    //this.changeImageLimit();
  },
}
</script>
<style scoped>
 .uploader {
    width:200px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 1;
    height: 178px;
  }
  .uploader:hover {
    border-color: #409EFF;
  }
  .none{
    opacity: 0;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;

  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
