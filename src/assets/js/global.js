/**
 * @Author JohnLi
 * @Date 2018/4/23 17:15
 */

class GlobalDataService {
  globalData = {
    roleTypeId: 1
  };
  globalHeaders = {};
  setGlobalData (params) {
    Object.assign(this.globalData, params);
  }
  getGlobalData () {
    return this.globalData;
  }
  setGlobalHeaders (headers) {
  }
  // onGlobalHeaderChange () {
  //   Vue.$on('globalHeaderChange', );
  // }
}

const globalData = new GlobalDataService();
export default globalData;
