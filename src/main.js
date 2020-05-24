import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";

// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// 自定义全局组件
import "./icons";

// vue-video-player
import VideoPlayer from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";
//播放rtsp视频
import "videojs-flash";

import "./assets/iconfont/iconfont.css";

Vue.use(VideoPlayer);

Vue.use(ElementUI);
/* 导入初始化配置 */
import Config from "./utils/baseApi";
Vue.use(VueCompositionApi);

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
