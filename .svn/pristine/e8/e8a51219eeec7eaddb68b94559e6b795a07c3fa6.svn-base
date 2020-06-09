import axios from "axios";
import service from "@/utils/request.js";
/**
 * 首页接口
 */
// 实况天气
const CITYID = "101080403";
export const reqWeather = () => {
  return axios.request({
    type: "get",
    url:
      "https://tianqiapi.com/api?version=v6&appid=41624998&appsecret=0X3izBoB&cityid=" +
      CITYID
  });
};
// 七日天气
export const reqWeatherMsg = () => {
  return axios.request({
    type: "get",
    url:
      "https://tianqiapi.com/api?version=v1&appid=41624998&appsecret=0X3izBoB&cityid=" +
      CITYID
  });
};

// 设备采集趋势
export function reqDeveice(areasId, factor) {
  return service.request({
    method: "get",
    url: "/monitor/monitor/areaFirstPage/" + areasId,
    params: { factor }
  });
}

// 今日告警信息
export function reqWarning() {
  return service.request({
    method: "get",
    url: "/alert/alertLog/selectLogToday"
  });
}
