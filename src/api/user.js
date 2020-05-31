import service from "../utils/request";

/* 获取菜单树 */
export function getMenuList() {
  return service.request({
    method: "get",
    url: "/auth/menu"
  });
}

/* 添加用户 */
export function addUser(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/auth/user",
    data: data
  });
}

/* 添加角色 */
export function addRole(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/auth/role",
    data: data
  });
}

/* 删除角色 */
export function delrole(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/auth/role",
    data: data
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
