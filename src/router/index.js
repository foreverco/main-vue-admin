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
  /* 监测中心 */
  {
    path: "/monitoring",
    name: "Monitoring",
    component: layout,
    meta: {
      title: "监测中心",
      icon: "jiance"
    },
    children: [
      {
        path: "/collect",
        name: "Collect",
        component: () => import("@/views/Monitoring/Collect"),
        meta: {
          title: "设备采集",
          icon: "navmenu"
        },
        children: [
          {
            path: "/collect/type",
            name: "Type",
            component: () => import("@/views/Monitoring/Collect/Type"),
            meta: {
              title: "类别统计"
              // icon: "navmenu"
            }
          },
          {
            path: "/collect/place",
            name: "Place",
            component: () => import("@/views/Monitoring/Collect/Place"),
            meta: {
              title: "区域统计"
              // icon: "navmenu"
            }
          }
        ]
      },
      {
        path: "/mapView",
        name: "MapView",
        component: () => import("@/views/Monitoring/MapView"),
        meta: {
          title: "地图展示",
          icon: "navmenu"
        }
      }
    ]
  },
  /* 视频中心 */
  {
    path: "/video",
    name: "Video",
    component: layout,
    meta: {
      title: "视频中心",
      icon: "video"
    },
    children: [
      {
        path: "/videoIndex",
        name: "VideoIndex",
        component: () => import("@/views/Video"),
        meta: {
          title: "视频中心",
          icon: "navmenu"
        }
      }
    ]
  },

  /* 控制中心 */
  {
    path: "/control",
    name: "Control",
    component: layout,
    meta: {
      title: "控制中心",
      icon: "control"
    },
    children: [
      {
        path: "/control/manual",
        name: "Manual",
        component: () => import("@/views/Control/Manual"),
        meta: {
          title: "手动控制",
          icon: "menu"
        }
      },
      {
        path: "/control/relay",
        name: "Relay",
        component: () => import("@/views/Control/Relay"),
        meta: {
          title: "模拟量控制",
          icon: "menu"
        }
      },
      {
        path: "/control/plan",
        name: "Plan",
        component: () => import("@/views/Control/Plan"),
        meta: {
          title: "计划任务控制",
          icon: "menu"
        }
      }
    ]
  },
  /* 预警中心 */
  {
    path: "/warning",
    name: "Warning",
    component: layout,
    meta: {
      title: "预警中心",
      icon: "yujing"
    },
    children: [
      {
        path: "/warning/config",
        name: "Config",
        component: () => import("@/views/Warning/Config"),
        meta: {
          title: "预警设置",
          icon: "menu"
        }
      },
      {
        path: "/warning/record",
        name: "Record",
        component: () => import("@/views/Warning/Record"),
        meta: {
          title: "预警日志",
          icon: "menu"
        }
      }
    ]
  },

  /* 配置中心 */
  {
    path: "/configcenter",
    name: "Configcenter",
    component: layout,
    meta: {
      title: "配置中心",
      icon: "config"
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
        path: "/sensorconfig",
        name: "Sensorconfig",
        component: () => import("@/views/ConfigCenter/Sensorconfig"),
        meta: {
          title: "传感器配置",
          icon: "navmenu"
        }
      },
      {
        path: "/controlconfig",
        name: "Controlconfig",
        component: () => import("@/views/ConfigCenter/Controlconfig"),
        meta: {
          title: "控制器配置",
          icon: "navmenu"
        }
      },
      {
        path: "/relayconfig",
        name: "Relayconfig",
        component: () => import("@/views/ConfigCenter/Relayconfig"),
        meta: {
          title: "继电器配置",
          icon: "navmenu"
        }
      },
      {
        path: "/stationconfig",
        name: "Stationconfig",
        component: () => import("@/views/ConfigCenter/Stationconfig"),
        meta: {
          title: "采集站配置",
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
  /* 用户管理 */
  {
    path: "/user",
    name: "User",
    component: layout,
    meta: {
      title: "用户管理",
      icon: "user"
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
  /* 远程专家 */
  {
    path: "/remote",
    name: "Remote",
    component: layout,
    meta: {
      title: "远程专家",
      icon: "remote"
    },
    children: [
      {
        path: "/remoteIndex",
        name: "RemoteIndex",
        component: () => import("@/views/Remote"),
        meta: {
          title: "远程专家",
          icon: "navmenu"
        }
      }
    ]
  },
  /* 信息管理 */
  // {
  //   path: "/info",
  //   name: "Info",
  //   component: layout,
  //   meta: {
  //     title: "信息管理",
  //     icon: "jiance"
  //   },
  //   children: [
  //     {
  //       path: "/infoIndex",
  //       name: "InfoIndex",
  //       component: () => import("@/views/Info"),
  //       meta: {
  //         title: "信息列表",
  //         icon: "navmenu"
  //       }
  //     },
  //     {
  //       path: "/infoCategory",
  //       name: "InfoCategory",
  //       component: () => import("@/views/Info/category"),
  //       meta: {
  //         title: "信息分类",
  //         icon: "navmenu"
  //       }
  //     }
  //   ]
  // }
  // /* 新闻 */
  {
    path: "",
    name: "News",
    component: layout,
    meta: {
      title: "新闻中心",
      icon: "menu"
    },
    children: [
      {
        path: "/news",
        name: "NewsList",
        component: () => import("@/views/News"),
        meta: {
          title: "新闻列表",
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
