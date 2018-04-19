/**
 * @Author JohnLi
 * @Date 2018/4/19 11:44
 */
import axios from 'axios';

class HttpService {
  get (url, params, hasWarning) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
}

const Http = new HttpService();
export { Http };
