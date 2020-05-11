<template>
  <div class="hello">
            
        <div class="card">
              <div class="card-header">
                    <h3 class="card-title">Add Brand </h3>
              </div>
              <div class="card-body form-inline">
                    <label>
                        ID:
                        <input type="text" class="form-control" v-model="id">
                    </label>    
                    <label>
                        Name:
                        <!-- keyup.enter 绑定键盘修饰符 -->
                        <input type="text" class="form-control" v-model="name" @keyup.enter="add">
                    </label> 
                    <label>
                    <input type="button" value="Add" class="btn btn-primary" @click="add">
                    </label>
                    <label>
                        Search keywords
                        <!-- 注意：Vue中所有指令，在调用时，都以v-开头 -->
                        <input type="text" class="form-control" v-model="keywords" >
                    </label>
              </div>
        </div>
        
        
        <table class="table table-hover table-bordered table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Ctime</th>
                    <th>Operation</th>
                </tr>
            </thead>
            <tbody>
                <!--之前，v-for中的数据都是直接从data上的list中直接渲染过来的-->
                <!--现在我们自定义了一个search方法，同时把所有关键字，通过传参的形式传递给了search方法-->
                <!--在search方法内部，通过执行for循环，把所有符合搜索关键词的数据保存到一个新的数组中，返回-->
                <tr v-for="item in search(keywords)" :key="item.id">
                    <td>{{item.id}}</td>
                    <td v-text="item.name"></td>
                    <td>{{ item.ctime |dateFormat()}}</td>
                    <td>
                        <a href="" @click.prevent="del(item.id)" >Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
  </div>
</template>
<style>
    
</style>
<script>
import '@/assets/css/back/bootstrap.css';
export default {
  data () {
    return {
                    id: "",
                    name: "",
                    keywords:'',
                    list: [
                    {id:1, name:"宝马", ctime: new Date()},
                    {id:2, name:"奔驰", ctime: new Date()},
                    ]    
    }
  },
  methods: {
                    add(){
                        // 1获取到id和name,直接从data上获取
                        // 2组织出一个对象
                        // 3调用相关数组方法， 添加到data上的list中
                        // 4在vue中已经实现了数据的双向绑定，每当我们修改了data中的数据，VUe会监听到数据的改动，自动把更新的数据应用到应用上
                        var car = {id:this.id, name:this.name, ctime:new Date()}
                        this.list.push(car) 
                        this.id=this.name=''
                    },
                    del(id){
                        //1如歌根据id找到删除这一项的索引
                        //2直接调用数组的splice方法
                        this.list.some((item, i)=>{
                            if(item.id==id){
                                //在数组的some方法中。如果return true，就会立即终止这个后续循环
                                this.list.splice(i, 1)
                                return ture;
                            }
                        })
                    },
                    search(keywords){
                        var newList = []
                        //Foreach some filter findIndex这些都属于数组的新方法
                        //都会对数组中的每一项进行遍历


                        /*
                        方法一
                        this.list.forEach(item=>{
                            if(item.name.indexOf(keywords)!=-1){
                                newList.push(item)
                            }
                        })
                        return newList
                        */

                        //方法二
                        //在ES6中，为字符串提供了一个新的方法。String.prototype.includes('要包含合法的字符串')
                        //如果包含，则返回true，否则返回false
                         // contain
                        var newList = this.list.filter(item=>{
                            if(item.name.includes(keywords)){
                                return item
                            }
                        })
                        return newList
                    }

  },
  filters: { // 定义私有过滤器    过滤器有两个 条件  【过滤器名称 和 处理函数】
        // 过滤器调用的时候，采用的是就近原则，如果私有过滤器和全局过滤器名称一致了，这时候 优先调用私有过滤器
        dateFormat: function (dateStr, pattern = '') {
          // 根据给定的时间字符串，得到特定的时间
          var dt = new Date(dateStr)

          //   yyyy-mm-dd
          var y = dt.getFullYear()
          // 用padStart()补足位数
          var m = (dt.getMonth() + 1).toString().padStart(2, '0')
          var d = dt.getDate().toString().padStart(2, '0')

          if (pattern.toLowerCase() === 'yyyy-mm-dd') {
            return `${y}-${m}-${d}`
          } else {
            var hh = dt.getHours().toString().padStart(2, '0')
            var mm = dt.getMinutes().toString().padStart(2, '0')
            var ss = dt.getSeconds().toString().padStart(2, '0')

            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
          }
        }
      }
}
</script>
