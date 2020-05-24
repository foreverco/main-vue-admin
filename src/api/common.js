import { newsList } from "@/api/news";
import { reactive } from "@vue/composition-api";
import service from "../utils/request";
import Config from "@/utils/baseApi";
export function common() {
  const newsObj = reactive({
    item: []
  });
  const getNewsList = () => {
    newsList()
      .then(res => {
        console.log("common的res");
        console.log(res.data.data);
        newsObj.item = res.data.data;
      })
      .catch(() => {});
  };
  return {
    getNewsList,
    newsObj
  };
}

/**
 *用户列表接口
 *
 * @export
 * @param {*
 * Ctrl+Alt+D
 * } params
 * @returns
 */
export function loadTableData(params) {
  return service.request({
    method: params.method || "get",
    url: params.url,
    params: params.data
    // baseURL: Config.proxy.zxy
  });
}

/**
 * 获取传感器ID
 *reqareas 获取区域ID
 *reqStatitions 获取采集站

 
 */

export function reqareas() {
  return service.request({
    method: "get",
    url: "/device/common/areas"
  });
}

export function reqStatitions(params) {
  return service.request({
    method: "get",
    url: "/device/common/collectStatitions",
    params: params
  });
}

export function reqSensors(params) {
  return service.request({
    method: "get",
    url: "/device/common/sensors",
    params: params
  });
}

/* 根据id获取传感器信息 */

export function reqSensorsMsg(params) {
  console.log(params);
  return service.request({
    method: "get",
    url: `/device/sensor/sensor/${params}`,
    params: params
  });
}
