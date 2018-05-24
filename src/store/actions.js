/**
 * @Author JohnLi
 * @Date 2018/5/24 14:22
 */
import { CLEAR_USER_MSG, SET_USER_MSG, SET_GLOBAL_HEADER } from './types';

const actions = {
  setUserMsg ({commit, state, rootState}, params) {
    commit(SET_USER_MSG, params);
  },
  clearUserMsg ({commit, state, rootState}) {
    commit(CLEAR_USER_MSG, {});
  },
  setGlobalHeader ({commit, state, rootState}, params) {
    commit(SET_GLOBAL_HEADER, params);
  }
};

export { actions };
