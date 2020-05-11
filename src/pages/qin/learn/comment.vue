<template>
  <div>
    <!-- <child @func="loadComments"></child> -->
    <commentBox @func="loadComments"></commentBox>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in list" :key="item.id">
        <span class="badge">评论人： {{ item.user }}</span>
        {{ item.content }}
      </li>
    </ul>
  </div>
</template>
<script>
import '@/assets/css/back/bootstrap.css';
  import  commentBox from '../learn/dam/commentBox';
  export default {
     data () {
    return {
          list: [
          { id: Date.now(), user: '李白', content: '天生我材必有用' },
          { id: Date.now(), user: '江小白', content: '劝君更尽一杯酒' },
          { id: Date.now(), user: '小马', content: '我姓马， 风吹草低见牛羊的马' }
        ]   
    }
  },
  created(){
        this.loadComments()
      },
    components: {
      // child,
      commentBox
    },
    methods: {
      loadComments() { // 从本地的 localStorage 中，加载评论列表
          var list = JSON.parse(localStorage.getItem('cmts') || '[]')
          this.list = list
          // localStorage.clear();
        }
      /*fatherMethod() {
        console.log('测试');*/
      // }
    }
  };
</script>