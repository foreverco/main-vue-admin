import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";
import { Login } from "@/api/login.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
    // isCollapse: JSON.parse(localStorage.getItem("isCollapse")) || false
    // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false
  },
  getters: {
    // computed
    count: state => state.count + 10
  },
  mutations: {
    SET_ISCOLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      // html本地存储
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
      // localStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
      // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
    }
  },
  actions: {
    login({ commit }, loginParams) {
      return new Promise((resolve, reject) => {
        // 接口
        Login(loginParams)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {}
});
