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
/* 编辑计划任务 */
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

/* 添加模拟量控制 */
export function addsimulate(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/setting/simulate",
    data: data
  });
}

/* 删除模拟量 */
export function delsimulate(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/setting/simulate",
    data: data
  });
}

/* 编辑模拟量任务 */
export function editsimulate(data) {
  console.log(data);
  return service.request({
    method: "PUT",
    url: "/setting/simulate",
    data: data
  });
}
