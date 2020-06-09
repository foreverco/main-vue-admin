import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import app from "./modules/app";
import common from "./modules/common";
import login from "./modules/login";
import map from "./modules/map.js";
import home from "./modules/home.js";
import permission from "./modules/permission";

export default new Vuex.Store({
  modules: {
    app,
    common,
    login,
    map,
    permission,
    home
  }
});
