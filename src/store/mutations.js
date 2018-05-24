/**
 * @Author JohnLi
 * @Date 2018/5/24 14:23
 */
import { SET_USER_MSG, CLEAR_USER_MSG, SET_GLOBAL_HEADER } from './types';
const mutations = {
  [SET_USER_MSG] (state, data) {
    state.userMsg = data;
  },
  [CLEAR_USER_MSG] (state, data) {
    state.userMsg = data;
  },
  [SET_GLOBAL_HEADER] (state, data) {
    state.globalHeader = data;
  }
};

export { mutations };
