import service from "../utils/request";

/* 获取菜单树 */
export function getMenuList() {
  return service.request({
    method: "get",
    url: "/auth/menu"
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
