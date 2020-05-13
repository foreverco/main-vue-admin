import { newsList } from "@/api/news";
import { reactive } from "@vue/composition-api";
import service from "../utils/request";
import Config from "@/utils/baseApi";
export function common() {
  const newsObj = reactive({
    item: []
  });
  const getNewsList = () => {
    newsList()
      .then(res => {
        console.log("common的res");
        console.log(res.data.data);
        newsObj.item = res.data.data;
      })
      .catch(() => {});
  };
  return {
    getNewsList,
    newsObj
  };
}

/**
 *用户列表接口
 *
 * @export
 * @param {*
 * Ctrl+Alt+D
 * } params
 * @returns
 */
export function loadTableData(params) {
  return service.request({
    method: params.method || "get",
    url: params.url,
    params: params.data
  });
}
