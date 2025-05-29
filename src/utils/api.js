import axios from 'axios';

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: 'https://api.example.com', // 设置 API 的基础 URL
  timeout: 5000, // 设置超时时间为 5 秒
});

// 添加请求拦截器
apiClient.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log('请求拦截器：请求即将发出');
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.error('请求拦截器：请求错误', error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
apiClient.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log('响应拦截器：收到响应');
    return response;
  },
  error => {
    // 对响应错误做点什么
    console.error('响应拦截器：响应错误', error);
    return Promise.reject(error);
  }
);

export default apiClient;