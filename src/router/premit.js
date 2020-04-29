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
      store.commit("app/SET_USERNAME", "");
      console.log("aaaaa");
      next();
    } else {
      console.log("bbbb");
      next();
    }
    /* 路由动态添加 每个角色分配不同菜单 */
    console.log("存在");
  } else {
    console.log(to.path);
    console.log("不存在");
    if (whiteRouter.indexOf(to.path) !== -1) {
      console.log("不回登陆");
      next();
    } else {
      console.log("回登陆");
      next("/login");
    }
  }
  console.log(to); // 要进入的页面 下一个页面
  console.log(from); // 离开之前的页面 上一个页面
  console.log(next);
  // next();
  // token
});
