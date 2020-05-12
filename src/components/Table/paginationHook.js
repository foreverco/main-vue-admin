import { reactive } from "@vue/composition-api";

export function paginationHook() {
  const pageData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 100,
    pageSizes: [1, 2, 3, 4]
  });
  //统计数据总和
  const totalCount = val => (pageData.total = val);
  const handleSizeChange = val => {
    // console.log(val);
    pageData.pageSize = val;
  };
  const handleCurrentChange = val => {
    // console.log(val);
    pageData.currentPage = val;
  };

  return {
    pageData,
    totalCount,
    handleSizeChange,
    handleCurrentChange
  };
}
