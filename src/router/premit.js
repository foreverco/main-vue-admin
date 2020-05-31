import router from "./index";
import store from "../store";
import { getToken, removeToken, removeUserName } from "../utils/app";

const whiteRouter = ["/login"];
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = "国草园智慧农业-" + to.meta.title;
  }
  if (getToken()) {
    if (to.path === "/login") {
      removeToken();
      removeUserName();
      store.commit("app/SET_TOKEN", "");
      // store.commit("app/SET_USERNAME", "");
      next();
    } else {
      // 获取用户角色
      // 动态分配路由权限
      /**
       * 何时处理路由
       * 以什么条件处理路由 */
      next();
    }
    /* 路由动态添加 每个角色分配不同菜单 */
  } else {
    console.log(to.path);
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
