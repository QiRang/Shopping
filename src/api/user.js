import {fetch,post} from '@/utils/request';
const baseURL = 'http://localhost:8081';

//注销账号
export function deleteUser(userId){
  let url = baseURL + '/user/delete'
  let data = {
    userId
  }
  return post(url, data)
}

//用于详情页展示商品
export function getProductById(productId){
  let url = baseURL + "/product/findProductById";
  let param = {
    productId
  }
  return fetch(url,param);
}

//用于用户登陆
export function findUserByUsernameAndPassword(username, password){
  let url = baseURL + '/user/login';
  let param = {
    username,
    password
  }
  return fetch(url,param);

}
//用于用户注册
export function  addUser(user){
  let url = baseURL + '/user/insert';
  let data = user;
  return post(url, data);
}
//用于用户提交订单
export function createOrder(order){
  let url = baseURL + '/order/insert';
  let data = order;
  return post(url,data);
}


// 查找用户信息
export function findUserById(userId){
  let url = baseURL + '/user/findUserById'
  let data = {
    userId
  }
  return fetch(url, data)
}

// 查找用户的订单
export function findOrderByUserId(userId){
  let url = baseURL + '/order/findOrderByUserId'
  let param = {
    userId
  }
  return fetch(url, param)
}

//
export function getUserOrderByOrderId(orderId){
  let url = baseURL + '/order/findOrderByOrderId'
  let param = {
    orderId
  }
  return fetch(url, param)
}

