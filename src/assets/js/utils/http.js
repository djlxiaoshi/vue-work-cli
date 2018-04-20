/**
 * @Author JohnLi
 * @Date 2018/4/19 11:44
 */
import axios from 'axios';
import { Notification } from 'element-ui';
// import { } from
class HttpService {
  get (url, params, hasWarning) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        Notification.error({
          title: 'Error',
          message: '服务器错误'
        });
        reject(error);
      });
    });
  }
  post (url, params, hasWarning) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        Notification.error({
          title: 'Error',
          message: '服务器错误'
        });
        reject(error);
      });
    });
  }
}

const Http = new HttpService();
export { Http };
