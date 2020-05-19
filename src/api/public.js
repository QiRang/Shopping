import {fetch,post} from '@/utils/request';
const baseURL = 'http://localhost:8081';
// 上传文件
export function uploadFile(files) {
  let url = baseURL + '/fileUpload'
  return post(url,{files})
}
//用于展示系统所有的category类别
export function getCategories(){
  let url = baseURL + "/categories"
  return fetch(url);
}

//用于首页分类别展示商品
export function getCategoryWithProductList(){
  let url = baseURL + "/category/product"
  return fetch(url);
}

// 更改订单的状态，用户取消订单，商家发货
export function changeOrderStatus(order){
  let url = baseURL + '/order/changeStatus'
  return post(url,order);
}

