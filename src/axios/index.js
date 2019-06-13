import Axios from "axios";

// Axios.defaults.baseURL = process.env.API_ROOT

// 请求拦截
Axios.interceptors.request.use(config => {
  // todo
  console.log("config=" + config);
  // config.baseURL= '';
  return config;
},error => {
  // todo
  return Promise.reject(error)
});
// 响应拦截器
Axios.interceptors.response.use(response => {
  console.log(response);
  // todo
  return response.data
}, error => {
  // todo
  return Promise.reject(error)
});

export default Axios;
