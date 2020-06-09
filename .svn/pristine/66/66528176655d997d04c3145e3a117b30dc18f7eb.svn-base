import service from "@/utils/request.js";
/**
 * 监测中心接口
 */
// 根据大区域id获取小区域列表信息
export function reqDeveiceAreaList(areaId) {
  return service.request({
    method: "get",
    url: "/monitor/monitor/areaList/" + areaId
  });
}
// 设备区域统计
export function deveiceAreaStatistics(areaId) {
  return service.request({
    method: "get",
    url: "/monitor/monitor/areaInfo/" + areaId
  });
}
// 设备类别统计
export function deveiceTypeStatistics(factor) {
  return service.request({
    method: "get",
    url: "/monitor/monitor/sortInfo/" + factor
  });
}
// 设备类型下拉框
export function reqDeviceType() {
  return service.request({
    method: "get",
    url: "/device/common/deviceType"
  });
}
/**
 * 配置中心地图部分接口
 */
/**
 * 获取区域列表(无分页)
 */
export function reqAreaList() {
  return service.request({
    method: "get",
    url: "/device/area/areas"
  });
}
/**
 * 添加种植区域
 */
export function addPlantArea(data) {
  // console.log(data);
  return service.request({
    method: "post",
    url: "/device/area/areas",
    data
  });
}
/**
 * 根据id获取区域详情
 */
export function reqAreaDetail(data) {
  return service.request({
    method: "get",
    url: "/device/area/area",
    params: data
  });
}
/**
 * 删除区域
 */
export function delArea(data) {
  return service.request({
    method: "delete",
    url: "/device/area/areas",
    params: data
  });
}
