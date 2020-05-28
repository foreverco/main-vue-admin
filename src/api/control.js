import service from "../utils/request";
/* 添加计划任务 */
export function addplan(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/setting/control/controlSave",
    data: data
  });
}
/* 添加计划任务 */
export function editplan(data) {
  console.log(data);
  return service.request({
    method: "PUT",
    url: "/setting/control/controlUpdate",
    data: data
  });
}
/* 删除传感器 */
export function delplan(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/setting/control/controldelet",
    data: data
  });
}
