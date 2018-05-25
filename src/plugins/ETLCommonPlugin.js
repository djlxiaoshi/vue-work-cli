/**
 * @Author JohnLi
 * @Date 2018/5/25 10:50
 */
import HTTP from '@/assets/js/http';
const ETLCommonPlugin = {
  install (Vue, options) {
    Vue.http = HTTP;
    Vue.filter('statusFilters', function (value) {
      return value ? '是' : '否';
    });
    Vue.prototype.$http = HTTP;
  }
};

export default ETLCommonPlugin;
