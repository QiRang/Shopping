<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}

.required-item{
  color: red;
  font-weight:bold;
}

.footer-container{
  padding:0;
}
</style>
