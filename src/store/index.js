import { createStore } from 'vuex';
import auth from './modules/auth.module.js';
import category from './modules/category.module.js';
import gift from './modules/gift.module.js';
import list from './modules/list.module.js';
import message from './modules/message.module.js';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    category,
    gift,
    list,
    message
  }
})
