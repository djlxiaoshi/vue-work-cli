/**
 * @Author JohnLi
 * @Date 2018/5/24 14:15
 */
import Vuex from 'vuex';
import Vue from 'vue';
import { mutations } from './mutations';
import { actions } from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userMsg: {},
    globalHeader: []
  },
  mutations: mutations,
  actions: actions,
  getters: {
    userMsg: state => state.userMsg,
    globalHeader: state => state.globalHeader
  }
});

export default store;
