  <template id="comment">
    <div>
      <div class="form-group">
        <label for="">评论人：</label>
        <input type="text" class="form-control" v-model="user">
      </div>
      <div class="form-group">
        <label for="">评论内容：</label>
        <textarea class="form-control" v-model="content"></textarea>
      </div>
      <div class="form-group">
        <input type="button" class="btn btn-primary" value="发表评论" @click="postComment">
      </div>
    </div>
  </template>
