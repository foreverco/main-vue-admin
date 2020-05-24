import service from "../utils/request";
import Config from "@/utils/baseApi";
/* 添加传感器 */
export function addsensor(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/device/sensor/sensors",
    data: data
    // baseURL: Config.proxy.zxy
  });
}
/* 删除传感器 */
export function delsensor(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/device/sensor/sensors",
    data: data
  });
}
/* 区域下拉列表 */
export function placeSelect() {
  return service.request({
    method: "get",
    url: "/device/common/areas"
  });
}
/* 采集站下拉列表 */
export function reqcollectSelect() {
  return service.request({
    method: "get",
    url: "/device/common/collectStatitions"
  });
}
/* 设备类型下拉列表 */
export function reqsbtypeSelect() {
  return service.request({
    method: "get",
    url: "/device/common/deviceType"
  });
}
