// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
//引入element
import ElementUI from 'element-ui';//用于完整引入
import 'element-ui/lib/theme-chalk/index.css';//引入样式
//引入需要使用的部分组件
//import { Button, Select } from 'element-ui';

// 引入图标
import './assets/niyan/iconfont/iconfont.css';
import './assets/niyan/iconfont/iconfont.js';

//注册vuex
import Vuex from 'vuex';
Vue.use(Vuex);



/*用来得到精确的加法结果
*说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
*调用：accAdd(arg1,arg2)
*返回值：arg1加上arg2的精确结果
*/
function accAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return (arg1*m+arg2*m)/m
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg){
  return accAdd(arg,this);
}

/*
*乘法函数，用来得到精确的乘法结果
*说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
*调用：accMul(arg1,arg2)
*返回值：arg1乘以arg2的精确结果
*/
function accMul(arg1,arg2)
{
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
  return accMul(arg, this);
}


// 每次刚进入网站会调用main.js,每次调用的时候，先把localStorage里的car读出来
var car = JSON.parse(sessionStorage.getItem("car")|| "[]");
var store = new Vuex.Store({
  state:{//调用方法：this.$store.stata.***
    // car:[]//将购物车中商品的数据用一个数组存储起来，在car数组中存储一些商品对象，
    // 设计成这个样子
    // {productId:商品的id, count:购买的数量, selected:该商品是否选中,true为选中,
    // price:商品单价,userId:用户Id,store:库存量}
    car:car,
  },
  mutations:{//this.$store.commit("方法的名称"， "按需传递唯一的参数")
    //把商品添加到car中去
    addToCar(state, goodsinfo){
      //点击加入购物车时，把商品对象保存到car中
      //1.如果购物车中之前就已经有这个商品了，就直接加一下数量就可以了
      //2.如果没有则直接把商品数据push进去
      var flag = false;//假设在购物车中没有找到对应商品
      state.car.some(item => {
          if(item.productId == goodsinfo.productId){
            //说明购物车中已经有这个商品了，只需要加数量就可以了
            item.count += parseInt(goodsinfo.count);
            flag = true;
            return true;//终止循环
          }
      });
      if(!flag){
        //购物车里面没有这个商品
        state.car.push(goodsinfo);
      }
      //当更新car之后，把car数组存储到本地的sessionStorage
      sessionStorage.setItem("car",JSON.stringify(state.car));
    },
    updateGoodsInfo(state,goodsinfo){
      // const {index,key,value} = data;
      // state.goodsList[index][key]=value;
      // localStorage.setItem("goodsList",JSON.stringify(state.goodsList));
      //修改购物车里面的数量值
      state.car.forEach(item => {
        if(item.productId == goodsinfo.productId){
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      });
      sessionStorage.setItem("car",JSON.stringify(state.car));
    },
    removeFromCar(state,productId){
      //根据id删除store里面的相关商品
      state.car.some((item, index) => {
        if(item.productId == productId){
          state.car.splice(index, 1);
          return true;
        }
      });
      sessionStorage.setItem("car",JSON.stringify(state.car));
    },
    updateGoodsSelected(state,goodsinfo){
      state.car.some(item => {
        if(item.productId == goodsinfo.productId){
          item.selected = goodsinfo.selected;
          return true;
        }
      });
      sessionStorage.setItem("car",JSON.stringify(state.car));
    },

  },
  getters: {//this.$store.getters.***//相当于计算属性，已相当于filters过滤器
    getAllCount(state){
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getCoodsCount(state){
      var o = {};
      state.car.forEach(item => {
        o[item.productId] = item.count;
      });
      // console.log("productId与count对应的关系：");
      // console.log(o);
      return o;
    },
    getCoodsSelected(state){
      var o = {};
      state.car.forEach(item => {
        o[item.productId] = item.selected;
      });
      // console.log("productId与selected对应的关系：");
      // console.log(o);
      return o;
    },
    getCoodsCountAndAmount(state){
      var o = {
        count:0,//勾选的数量
        amount:0.00//勾选的总价
      };
      state.car.forEach(item =>{
        if(item.selected){
          o.count += parseInt(item.count);
          console.log(item.count);
          console.log(item.price);
          o.amount += item.count * item.price;
          // let l = item.count.mul(item.price);
          // o.amount.accAdd(l);
        }
      });
      return o;
    },
    getGoodsIdAndCount(state){
      var list = [];
      state.car.forEach(item => {
        if(item.selected){
          let o = {productId:item.productId,count:item.count,userId:item.userId}
          list.push(o);
        }
      });
      return list;
    }

  }
});
//使用element
Vue.use(ElementUI)//这句用于完整引入
//Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
// Vue.use(Button)
/* eslint-disable no-new */

// Vue.prototype.fetch = fetch;
// Vue.prototype.post = post;
Vue.prototype.getNowFormatDate = function() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
  month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
  strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
};

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,//挂载store状态管理对象
});
