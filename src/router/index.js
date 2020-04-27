import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入布局组件
import layout from "@/views/Layout";

const routes = [
  {
    path: "/",
    redirect: "/login",
    hidden: true,
    meta: {
      title: "主页",
      icon: "info"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("@/views/Login"),
    meta: {
      title: "登陆"
    }
  },
  {
    path: "/home",
    name: "Home",
    redirect: "index",
    component: layout,
    meta: {
      title: "首页",
      icon: "home"
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/Home"),
        meta: {
          title: "主页"
        }
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    component: layout,
    meta: {
      title: "信息管理",
      icon: "jiance"
    },
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        component: () => import("@/views/Info"),
        meta: {
          title: "信息列表"
        }
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        component: () => import("@/views/Info/category"),
        meta: {
          title: "信息分类"
        }
      }
    ]
  },
  /* 用户管理 */
  {
    path: "/user",
    name: "User",
    component: layout,
    meta: {
      title: "用户管理",
      icon: "menu"
    },
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        component: () => import("@/views/User"),
        meta: {
          title: "用户列表"
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
