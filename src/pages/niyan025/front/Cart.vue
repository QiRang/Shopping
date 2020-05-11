.<!--  -->
<template>
  <div>
    <my-nav></my-nav>
    <!-- 购物车 -->
    <div class="container cart-container" :style="cartBack">
      <div class="row">
        <div class="col-md-12" style="padding:15px;text-align:right;">
          <span>已选商品 <span style="color:red;" v-text="$store.getters.getCoodsCountAndAmount.count">0</span> 件 </span>
          <span class="price">￥<label>{{ $store.getters.getCoodsCountAndAmount.amount }}</label></span>
          <button :class="['btn', 'btn-danger', 'btn-lg',
          $store.getters.getCoodsCountAndAmount.count > 0 ?'':'disabled']" @click="goToBuy()">结算</button>
        </div>
      </div>
      <table class="table ">
        <thead>
          <tr>
            <th style="width:40%" colspan="2">商品信息</th>
            <th style="width:20%">单价</th>
            <th style="width:20%">数量</th>
            <!-- <th style="width:15%">金额</th> -->
            <th style="width:20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in carts" :key="index">
           <td style="text-align:left;padding:5px;width:20%;">
             	<input type="checkbox" class="cartCheckBox" name="cartCheckBox" :checked="$store.getters.getCoodsSelected[item.productId]"
               @change="selectedChanged(item.productId, !$store.getters.getCoodsSelected[item.productId])">
							<img class="cartProductImg" :src="item.productImages">
           </td>
           <td style="text-align:left;width:20%;" v-text="item.productName"></td>
           <td class="price">￥{{ item.price }}</td>
           <td>
             <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon btn btn-default" @click.self="changeNumber(item.productId, -1,item.stock)">-</div>
                <!-- 问题：如何从购物车中获取商品数量呢？
                      1.第一种方法：我们可以先创建一个空对象 ，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 productId
                      作为 对象 的 属性名，count值作为对象的属性值，这样把商品循环一遍后就会得到一个对象
                      {1：2，2：4} productId:count的对应关系  -->
                  <input type="number" :value="$store.getters.getCoodsCount[item.productId]"
                   class="mount" readonly="readonly">
                <!-- 2.第二种方法：给carts里面的对象新增一个count属性 -->
                <!-- <input type="number" v-model="item.count" class="mount" readonly="readonly" @change="countChanged"> -->
                <div class="input-group-addon btn btn-default" @click.self="changeNumber(item.productId, 1,item.stock)">+</div>
              </div>
            </div>
           </td>
           <!-- <td class="price">￥{{ item.price * item.count}}</td> -->
           <td>
             <button class="btn btn-danger" @click="remove(item.productId,index)">删除</button>
           </td>
          </tr>
          <!-- 全选结算区域 -->
          <!-- <tr class="cart-bottom">
            <td colspan="2">
              <div class="left">
                <input type="checkbox" class="cartCheckBox" name="cartCheckBox">
                <span>全选</span>
              </div>
            </td>
            <td colspan="4">
              <div class="right">
                <span>已选商品 <span style="color:red;" v-text="$store.getters.getCoodsCountAndAmount.count">0</span> 件 合计</span>
                <span class="price">￥<label>{{ $store.getters.getCoodsCountAndAmount.amount }}</label></span>
                <button class="btn btn-danger disabled btn-lg">结算</button>
              </div>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <!-- footer -->
    <div class="container footer-container">
          <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { getProductById } from '@/api/user';
import myNav from '@/components/MyNav';
import myFooter from '@/components/MyFooter';
export default {
  data () {
    return {
      carts: [
        // {productId:0,productImages:"",productName:"商品一", stock:0, price: 10.00,count:2},
        // {productId:1,productImages:"",productName:"商品二", stock:0, price: 2.01,count:4},
      ],
      hasList: true,
      totalPrice: 0,
      selectAllStatus: false,
      obj: {
        name: 'hello'
      },
      accont: false,
      cartBack:{
        backgroundImage: "url(" + require("@/assets/niyan/images/detailscontainer.jpg") + ")",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% 50%",
      },
    }
  },
  components:{
    myNav,myFooter
  },
  mounted(){},
  created(){
    this.getAllProductsById();
    // this.getTotalPrice();
  },
  methods:{
    // 获取商品的信息
    getAllProductsById(){
      this.$store.state.car.forEach(item => {
        //根据productId多次请求获取product信息
        getProductById(parseInt(item.productId)).then(res => {
          this.carts.push(res.value);
          // let cartItem = res.value;
          // this.$store.state.car.some(element => {
          //   if(element.productId == item.productId){
          //     console.log("count:",element.count);
          //    cartItem.count = element.count;
          //   }
          // });
          // this.carts.push(cartItem);
          // console.log(this.carts);
        });
      });
    },
    changeNumber(productId,val,stock){
      var number = this.$store.getters.getCoodsCount[productId];
      if(number + val > stock){
        alert("库存物资不足！");
        return;
      }
      this.$store.commit("updateGoodsInfo", {
            productId,
            count: number + val <= 0 ? 1 : number + val
      });
    },
    //删除商品
    remove(productId,index){
      //用 productId 删除 store 里面的；同时还要要删除当前组件中的，用index删carts
      this.carts.splice(index,1);
      this.$store.commit("removeFromCar",productId);
    },
    selectedChanged(productId,selected){
      //每当点击开关，把最新的开关状态同步到 store中
      console.log(productId,selected);
      this.$store.commit("updateGoodsSelected",{
        productId,
        selected
      });
    },

    //页面跳转
    goToBuy(){
      //要获取productId，对应的amout[{productId:id1,count:count1},{productId:id2,count:count2}]
      let list = this.$store.getters.getGoodsIdAndCount;
      console.log("去购买");
      this.$router.push({
        path:`/order/orders`,
        query:{orderItems: JSON.stringify( list )}
      });
   },
  }
}
</script>
<style scoped>
.container{
  box-sizing:border-box;
}
.cart-container{
  padding: 50px 10px;
}

.table td{
  padding: 0;
}
tr{
  width:100%;
  text-align: center;
  padding-top: 20px;

}
.table th {
  border-bottom: 2px solid rgba(255,255,255,0.5);
}
.table td{
  padding:20px 0 20px 0;
  border-bottom: 1px solid rgba(255,255,255,0.5);
}
.price{
  color: red;
  font-size: 20px;
  padding: 0 10px 0 10px;
}
td .btn-default{
  width: 20%;
  padding: 0;
}
td .mount{
  width: 40%;
}
.cartProductImg{
  height:60px;
  width:100px;
  padding-left: 10%;
}
.cart-bottom td{
  padding-top: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  /* border: 1px solid red; */
}
div.right{
  text-align: right;
}
div.left{
  text-align: left;
}
</style>
