import {fetch,post} from '@/utils/request';
const baseURL = 'http://localhost:8081'

// 查询用户列表
export function getUserList(pageNum, pageSize) {
  let url = baseURL + '/users'
  let param = {
    pageNum,
    pageSize,
  }
  return fetch(url, param)
}
// 查询商品列表
export function getProductList(pageNum, pageSize) {
  let url = baseURL + '/products'
  let param = {
    pageNum,
    pageSize,
  }
  return fetch(url, param)
}
// 查询订单列表
export function getOrderList(pageNum, pageSize) {
  let url = baseURL + '/orders'
  let param = {
    pageNum,
    pageSize,
  }
  return fetch(url, param)
}
//更新商品图片
export function updateProductImages(productId,productImages) {
  let url = baseURL + "/product/updateProductImages"
  let data = {
    productId,
    productImages
  }
  return post(url,data);
}

//添加商品
export function addProduct(product){
  let url = baseURL + "/product/insert"
  let data = product
  return post(url,data);
}

//分页获取分类名
export function getCategoryList(pageNum,pageSize){
  let url = baseURL + "/category/page"
  let param = {
    pageNum,
    pageSize
  }
  return fetch(url,param);
}

//更新商品类别
export function updateCategory(category) {
  let url = baseURL + "/category/update"
  let data = category;
  return post(url,data);
}

//添加商品类别
export function addCategory(category){
  let url = baseURL + "/category/insert"
  let data = category
  return post(url,data);
}

//删除商品类别
export function deleteCategory(categoryId){
  let url = baseURL + "/category/delete"
  let data = { categoryId }
  return post(url,data);
}

// 编辑商品
export function editProduct(product){
  let url = baseURL + "/product/update"
  let data = product
  return post(url,data);
}

// 删除商品
export function deleteProduct(productId){
  let url = baseURL + "/product/delete"
  let data = { productId }
  return post(url,data);
}

// 检索商品
export function searchProduct(productName){
  let url = baseURL + "/search/products"
  let param = { productName }
  return fetch(url, param);
}
// 检索分类
export function searchCategory(categoryName){
  let url = baseURL + "/search/categories"
  let param = { categoryName }
  return fetch(url, param);
}
// 检索订单
export function searchOrder(receiver = "", mobile = ""){
  let url = baseURL + "/search/orders"
  let param = { receiver, mobile}
  return fetch(url, param);
}
// 检索用户
export function searchUser(username){
  let url = baseURL + "/search/users"
  let param = { username }
  return fetch(url, param);
}


