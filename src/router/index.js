import Vue from 'vue'
import Router from 'vue-router'
import User from '@/pages/niyan025/admin/User'
import Category from '@/pages/niyan025/admin/products/Category'
import Images from '@/pages/niyan025/admin/Images'
import Address from '@/pages/niyan025/admin/Address'
import Order from '@/pages/niyan025/admin/Order'
import Product from '@/pages/niyan025/admin/products/Product'
import Cart from '@/pages/niyan025/front/Cart'
import UserCenter from '@/pages/niyan025/front/userCenter'
import Home from "@/pages/qin/Home"
import Loginn from '@/pages/qin/login/loginregister'
import Comment from '@/pages/qin/learn/comment'
import Detail from '@/pages/qin/detail'
import AdminLogin from '@/pages/pangweizhen/Login'
import Orders from '@/pages/pangweizhen/orders'
import Consult from '@/pages/pangweizhen/consult'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home
    },
    {
      path: '/admin/category/',
      name: '分类管理',
      component: Category
    },
    {
      path: '/admin/user',
      name: '用户管理',
      component: User
    },
    {
      path: '/admin/images',
      name: '用户管理',
      component: Images
    },
    {
      path: '/admin/address',
      name: '收货地址管理',
      component: Address
    },
    {
      path: '/admin/order',
      name: '订单管理',
      component: Order
    },
    {
      path: '/admin/login',
      name: '系统管理员登陆',
      component: AdminLogin
    },
    {
      path: '/admin/product',
      name: '商品管理',
      component: Product
    },
    {
      path: '/login/loginregister',
      name: '收货地址管理',
      component: Loginn
    },
     {
      path: '/learn/comment',
      name: '收货地址管理',
      component:Comment
    },
    {
      path: '/cart',
      name: '用户购物车',
      component:Cart
    },
    {
      path:'/item/detail',
      name:'商品介绍',
      component:Detail
    },
    {
      path:'/order/orders',
      name:'商品购买',
      component:Orders
    },
    {
      path:'/consult',
      name:'咨询店家',
      component:Consult
    },
    {
      path:'/userCenter',
      name:'用户中心',
      component:UserCenter
    }
  ]
})

