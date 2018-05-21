/**
 * @Author JohnLi
 * @Date 2018/5/10 11:50
 */

class GlobalDataService {
  globalData = {};
  getGlobalData () {
    return this.globalData;
  }
  setGlobalData (params) {
    if (typeof params !== 'object') params = {};
    Object.assign(this.globalData, params);
  }
}

const globalData = new GlobalDataService();

export default globalData;
