/**
 * @Author JohnLi
 * @Date 2018/4/23 17:15
 */
import { Subject } from 'rxjs';
class GlobalDataService {
  globalheaderChange = new Subject();
  globalHeader = [];
  globalData = {
    roleTypeId: 1
  };
  globalHeaders = {};
  getGlobalData () {
    return this.globalData;
  }
  setGlobalData (params) {
    if (typeof params !== 'object') params = {};
    Object.assign(this.globalData, params);
  }
  setGlobalHeader (data) {
    this.globalHeader = data;
    this.globalHeaderChange(data);
  }
  getGlobalHeader () {
    return this.globalHeader;
  }
  globalHeaderChange (header) {
    this.globalheaderChange.next(header);
  }
  onGlobalHeaderChange () {
    return this.globalheaderChange;
  }
}

const globalData = new GlobalDataService(); // export 输出的都是同一个实例
export default globalData;
