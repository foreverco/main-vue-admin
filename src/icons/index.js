import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";
// 自定义全局组件
Vue.component("svg-icon", SvgIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  // console.log(requireContext.keys());
  // console.log(requireContext.keys().map(requireContext));
  return requireContext.keys().map(requireContext);
};
// console.log(requireAll(req));
requireAll(req);
