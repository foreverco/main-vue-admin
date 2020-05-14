import service from "../utils/request";
import Config from "@/utils/baseApi";
/* 列表 */
export function newsList() {
  return service.request({
    method: "get",
    url: "/news/newsList",
    baseURL: Config.proxy.hr
  });
}
