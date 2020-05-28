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
/* 添加采集站 */
export function addStatitions(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/device/collectionStation/collectStatitions",
    data: data
  });
}
/* 删除采集站 */
export function delstation(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/device/collectionStation/collectStatitions",
    params: data
  });
}

/* 添加控制站 */
export function addControls(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/device/controlStation/controlStations",
    data: data
  });
}
/* 删除控制站 */
export function delcontrols(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/device/controlStation/controlStations",
    params: data
  });
}

/* 添加继电器 */
export function addrelays(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/device/relay/relays",
    data: data
  });
}
/* 删除继电器 */
export function delrelay(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/device/relay/relays",
    data: data
  });
}

/* 农机农具 */
/* 添加农机农具 */
export function addStock(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/device/machinery/machinerys",
    data: data
  });
}

/* 删除农机农具 */
export function delStock(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/device/machinery/machinerys",
    data: data
  });
}
/* 领用农机农具 */
export function borrowStock(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/device/machinery/borrow",
    params: data
  });
}
/* 归还农机农具 */
export function remand(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/device/machineryUsageRecord/remand",
    params: data
  });
}
