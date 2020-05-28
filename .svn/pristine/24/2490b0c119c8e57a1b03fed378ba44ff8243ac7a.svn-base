import { reactive } from "@vue/composition-api";
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";
export function loadData() {
  const tableData = reactive({
    item: [],
    total: 0
  });

  const tableLoadData = params => {
    let requestJson = params;
    let requestParams = {
      url: requestUrl[requestJson.url],
      method: requestJson.method,
      data: requestJson.data
    };
    // console.log(requestParams);
    loadTableData(requestParams)
      .then(response => {
        let responseData = response.data.data.records;
        tableData.item = responseData;
        tableData.total =
          responseData.length === 0 ? 0 : response.data.data.total;

        // console.log(tableData.item);
        // if (responseData && responseData.length > 0) {
        //   // data.tableData = responseData;
        // }
      })
      .catch(error => {});
  };

  return {
    tableData,
    tableLoadData
  };
}
/**
 *
 * 处理表格接口数据
 * @export
 * @returns
 */
