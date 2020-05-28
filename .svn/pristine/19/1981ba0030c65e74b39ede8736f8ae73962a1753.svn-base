import service from "@/utils/request.js";
/**
 * 获取用户角色
 */

/**
 * 登录
 */
export function Login(data) {
  console.log(data);
  return service.request({
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "/auth/login/token",
    params: data
  });
}
export function reqUsername() {
  return service.request({
    method: "get",
    url: "/auth/user/info"
  });
}
