/**
 * @Author JohnLi
 * @Date 2018/4/19 11:44
 */
import axios from 'axios';
import { Notification } from 'element-ui';
import ENV from '@/environment/dev.env';

const CODE = {
  SUCCEE: 0,
  NO_LOGIN: -14,
  NO_RIGHT: -2
};

// 请求发送拦截
axios.interceptors.request.use(function (config) {
  // 设置携带Cookies
  config.withCredentials = true;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 增加响应拦截器（判断用户是否登录）
axios.interceptors.response.use((response) => {
  if (response.status === 200) {
    if (response.data.error_code !== CODE.SUCCEE) {
      if (response.data.error_code === CODE.NO_LOGIN) {
        window.location.href = ENV.SSO;
      }
    } else {
      if (response.config.method === 'post') {
        Notification.success({
          title: 'Success',
          message: '操作成功'
        });
      }
    }
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

class HttpService {
  get (url, params, hasWarning = true) {
    url = ENV.API + url;
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        if (hasWarning) {
          Notification.error({
            title: 'Error',
            message: '服务器错误'
          });
        }
        reject(error);
      });
    });
  }
  post (url, params, hasWarning = true) {
    url = ENV.API + url;
    if (params.constructor.name !== 'FormData') {
      params = this.formatData(params);
    }
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(function (response) {
        if (response.data.error_code !== 0) {
          if (hasWarning) {
            Notification.error({
              title: 'Error',
              message: response.data.error_message
            });
          }
          reject(response.data.error_message);
        }
        resolve(response.data);
      }).catch(function (error) {
        if (hasWarning) {
          Notification.error({
            title: 'Error',
            message: '服务器错误'
          });
        }
        reject(error);
      });
    });
  }
  formatData (params) {
    const queryStrArr = [];
    Object.keys(params).forEach(key => {
      const value = params[key];
      let queryStr = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      if (Array.isArray(value)) {
        queryStr = encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(params[key]));
      }
      queryStrArr.push(queryStr);
    });
    return queryStrArr.join('&');
  }
}

const http = new HttpService();
export default http;
