import Cookie from "cookie_js";

const admintoKen = "admin_toKen";
const username = "username";

export function getToken() {
  return Cookie.get(admintoKen);
}

export function setToken(toKen) {
  return Cookie.set(admintoKen, toKen);
}
export function removeToken() {
  return Cookie.remove(admintoKen);
}

export function setUserName(value) {
  return Cookie.set(username, value);
}

export function getUserName() {
  return Cookie.get(username);
}
export function removeUserName() {
  return Cookie.remove(username);
}
