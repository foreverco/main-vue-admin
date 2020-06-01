import service from "../utils/request";

/* 获取菜单树 */
export function getMenuList() {
  return service.request({
    method: "get",
    url: "/auth/menu"
  });
}
/* 新增修改菜单 */
export function addMenu(data) {
  console.log("新增修改菜单");
  console.log(data);
  return service.request({
    method: "post",
    url: "/auth/menu",
    data: data
  });
}
/* 更新菜单顺序 */
export function priorityMenu(data) {
  console.log("更新修改菜单");
  console.log(data);
  return service.request({
    method: "PUT",
    url: "/auth/menu/priority",
    data: data
  });
}

/* 删除菜单 */
export function delmenu(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/auth/menu",
    data: data
  });
}

/* 获取菜单权限 */
export function getauthoritymenu() {
  return service.request({
    method: "get",
    url: "/auth/authority/menu"
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
