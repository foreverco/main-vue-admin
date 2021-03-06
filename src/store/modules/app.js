// import Cookie from "cookie_js";
import { Login } from "@/api/login.js";
import {
  setToken,
  setUserName,
  getUserName,
  removeToken,
  removeUserName
} from "../../utils/app";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  // isCollapse: JSON.parse(localStorage.getItem("isCollapse")) || false
  // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false
  to_ken: "",
  username: getUserName() || ""
};
const getters = {
  // username: state => state.username
};
const mutations = {
  SET_ISCOLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    // html本地存储
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    // localStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.to_ken = value;
  },
  SET_USERNAME(state, value) {
    state.user = value;
  }
};
const actions = {
  login({ commit }, loginParams) {
    return new Promise((resolve, reject) => {
      // 接口
      Login(loginParams)
        .then(response => {
          console.log(response);
          let data = response.data;
          commit("SET_TOKEN", response.headers.authorization);
          setToken(response.headers.authorization);
          commit("SET_USERNAME", JSON.parse(response.config.data).username);
          console.log(JSON.parse(response.config.data).username);
          setUserName(JSON.parse(response.config.data).username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 登出
  loginOut({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken();
      // removeUserName();
      commit("SET_TOKEN", "");
      // commit("SET_USERNAME", "");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
