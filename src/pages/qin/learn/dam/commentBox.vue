<template>
  <div>
    <!-- <button @click="childMethod()">点击</button> -->
    <div class="form-group">
        <label>评论人：</label>
        <input type="text" class="form-control" v-model="user">
      </div>

      <div class="form-group">
        <label>评论内容：</label>
        <textarea class="form-control" v-model="content"></textarea>
      </div>

      <div class="form-group">
        <input type="button" value="发表评论" class="btn btn-primary" @click="postComment">
      </div>
  </div>
</template>
<script>
  export default {
     data () {
    return {
       user: '',
       content: ''
    }
  },
    methods: {
             postComment() { // 发表评论的方法
          // 分析：发表评论的业务逻辑
          // 1. 评论数据存到哪里去？？？   存放到了 localStorage 中  localStorage.setItem('cmts', '')
          // 2. 先组织出一个最新的评论数据对象
          // 3. 想办法，把 第二步中，得到的评论对象，保存到 localStorage 中：
          //  3.1 localStorage 只支持存放字符串数据， 要先调用 JSON.stringify 
          //  3.2 在保存 最新的 评论数据之前，要先从 localStorage 获取到之前的评论数据（string）， 转换为 一个  数组对象， 然后，把最新的评论， push 到这个数组
          //  3.3 如果获取到的 localStorage 中的 评论字符串，为空不存在， 则  可以 返回一个 '[]'  让 JSON.parse 去转换
          //  3.4  把 最新的  评论列表数组，再次调用 JSON.stringify 转为  数组字符串，然后调用 localStorage.setItem()

          var comment = { id: Date.now(), user: this.user, content: this.content }

          // 从 localStorage 中获取所有的评论
          var list = JSON.parse(localStorage.getItem('cmts') || '[]')
          list.unshift(comment)
          // 重新保存最新的 评论数据
          localStorage.setItem('cmts', JSON.stringify(list))

          this.user = this.content = ''

          // this.loadComments() // ?????
          this.$emit('func')
        }
     /* childMethod() {
        this.$emit('fatherMethod');
      }*/
    }
  };
</script>