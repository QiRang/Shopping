<template>
   <!-- footer，每页都有 -->
  <div :style="footerBack" class="footer"></div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      footerBack:{
        // backgroundImage: "url(" + require("@/assets/niyan/images/footer2.jpg") + ")",
        backgroundImage: "url(" + require("@/assets/niyan/images/footer3.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
    }
  },
  methods: {}
}
</script>
<style scoped>
.footer{
  color:white;
  font-size: 14px;
  text-align: center;
  height: 200px;
  line-height: 200px;
  margin:0px;
}
</style>
