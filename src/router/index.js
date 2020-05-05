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
          title: "主页",
          icon: "navmenu"
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
          title: "信息列表",
          icon: "navmenu"
        }
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        component: () => import("@/views/Info/category"),
        meta: {
          title: "信息分类",
          icon: "navmenu"
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
      icon: "navmenu"
    },
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        component: () => import("@/views/User"),
        meta: {
          title: "用户列表",
          icon: "navmenu"
        }
      }
    ]
  },

  /* 视频中心 */
  {
    path: "/configcenter",
    name: "Configcenter",
    component: layout,
    meta: {
      title: "配置中心",
      icon: "navmenu"
    },
    children: [
      {
        path: "/plantingarea",
        name: "Plantingarea",
        component: () => import("@/views/ConfigCenter/Plantingarea"),
        meta: {
          title: "种植区域划分",
          icon: "navmenu"
        }
      },
      {
        path: "/deviceconfig",
        name: "Deviceconfig",
        component: () => import("@/views/ConfigCenter/Deviceconfig"),
        meta: {
          title: "前端设备配置",
          icon: "navmenu"
        }
      },
      {
        path: "/agricultural",
        name: "agricultural",
        component: () => import("@/views/ConfigCenter/Agricultural"),
        meta: {
          title: "农机农具",
          icon: "navmenu"
        },
        children: [
          {
            path: "/agricultural/stockList",
            name: "StockList",
            component: () =>
              import("@/views/ConfigCenter/Agricultural/StockList"),
            meta: {
              title: "备案列表"
              // icon: "navmenu"
            }
          },
          {
            path: "/agricultural/useList",
            name: "UseList",
            component: () =>
              import("@/views/ConfigCenter/Agricultural/UseList"),
            meta: {
              title: "使用记录"
              // icon: "navmenu"
            }
          }
        ]
      }
    ]
  },
  /* 控制中心 */
  {
    path: "/control",
    name: "control",
    component: layout,
    meta: {
      title: "控制中心",
      icon: "menu"
    },
    children: [
      {
        path: "/control1",
        name: "control1",
        component: () => import("@/views/User"),
        meta: {
          title: "控制中心",
          icon: "menu"
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
