import axios from 'axios';

//http request拦截器,POST传参序列化
axios.interceptors.request.use(
  config => {
    //const tocken = getCookie('session');
    //config.data = JSON.stringify(config.data);//加上这句是为了处理数据，不加则报错
    //config.data = qs.stringify(config.data);
    //在拦截器中增加headers属性，拦截器的作用是当调用接口时它会判断
    config.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
     'Content-Type':'application/json;charset=UTF-8'
    }
    // if (tocken) {
    //   config.params = {'tocken': tocken};
    // }
    return config;
    },
  error =>{
    return Promise.reject(error);
  });
//http respone拦截器,返回状态判断
axios.interceptors.response.use(
  res =>{
    if(res.status == 200){
      return Promise.resolve(res);
    }
    return res;
  },
  error => {
  //404等问题可以在这里处理
  return Promise.reject(error);
});
//Get 请求方法
export function fetch(url,params={}){
  return new Promise(
    (resolve,reject) => {
      axios.get(url,{params:params})
      .then(res =>{
        resolve(res.data);
      })
      .catch(error =>{
        reject(error);
      })
    }
  )
}

//post 请求方法
export function post(url,data){
  return new Promise(
    (resolve,reject) => {
      axios.post(url,data)
      .then(res =>{
        resolve(res);
      })
      .catch(error =>{
        reject(error);
      })
    }
  )
}


