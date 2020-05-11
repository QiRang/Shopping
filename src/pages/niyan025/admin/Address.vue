.<!--  -->
<template>
  <div class='index-container'>根据userId查询用户的收货地址 {{ userId }}</div>
</template>

<script>
export default {
  data () {
    return {
      userId: this.$route.query
    }
  },
  components: {},
  computed: {},
  mounted() {
  //   console.log("跳过来了！");
  //   // 路由参数
  //  let mm = this.$route.query;//query包含传递的所有参数
  //  console.log(mm);
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
