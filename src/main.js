import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";
// 自定义全局方法
// import global from "@/utils/global";
// 自定义全局组件
import "./icons";
// Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
/* 导入初始化配置 */
import Config from "./utils/baseApi";
Vue.prototype.$config = Config;

import moment from "moment";
//定义一个全局过滤器实现日期格式化
Vue.filter("datefmt", function(input, fmtstring) {
  //当input为时间戳时，需转为Number类型
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format(fmtstring);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
