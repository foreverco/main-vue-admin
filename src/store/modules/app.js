// import Cookie from "cookie_js";
import { Login, reqUsername } from "@/api/login.js";
import {
  setToken,
  setUserName,
  getUserName,
  removeToken,
  removeUserName
} from "../../utils/app";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  to_ken: "",
  username: getUserName() || "",
  roles: []
};
const getters = {
  username: state => state.username
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
          console.log(data.data.token_type);
          console.log(data.data.access_token);
          let dataStr =
            data.data.token_type.charAt(0).toUpperCase() +
            data.data.token_type.slice(1);
          let lastToken = dataStr + " " + data.data.access_token;
          console.log(lastToken);
          commit("SET_TOKEN", lastToken);
          setToken(lastToken);
          // commit("SET_USERNAME", JSON.parse(response.config.data).username);
          // console.log(JSON.parse(response.config.data).username);
          // setUserName(JSON.parse(response.config.data).username);
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
      removeUserName();
      commit("SET_TOKEN", "");
      // commit("SET_USERNAME", "");
      resolve();
    });
  },
  // 获取用户名
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      reqUsername().then(res => {
        console.log(res);
        console.log(res.data.data.nickname);
        commit("SET_USERNAME", res.data.data.nickname);
        // console.log(JSON.parse(response.config.data).username);
        setUserName(res.data.data.nickname);
      });
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
