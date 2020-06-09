import service from "@/utils/request.js";
/**
 * 远程专家接口
 */

// 远程专家列表
export function reqDeveice(areasValue, factor) {
  return service.request({
    method: "get",
    url: "/monitor/monitor/sortInfo/" + areasValue,
    params: factor
  });
}

/* 查看详情 */
export function reqExpertPage(params) {
  console.log(params);
  return service.request({
    method: "get",
    url: "/expert/remoteExpertPage/details",
    params: params
  });
}

/* 添加修改问题 */
export function addQues(data) {
  console.log(data);
  return service.request({
    method: "post",
    url: "/expert/remoteExpertPage/question",
    data: data
  });
}
/* 删除远程专家接口 */
export function delremote(data) {
  console.log(data);
  return service.request({
    method: "DELETE",
    url: "/expert/remoteExpertPage",
    data: data
  });
}
