import { reactive } from "@vue/composition-api";

export function paginationHook() {
  const pageData = reactive({
    currentPage: 1,
    pageSize: 5,
    total: 100,
    pageSizes: [5, 10, 15, 20]
  });
  //统计数据总和
  const totalCount = val => (pageData.total = val);
  const handleSizeChange = val => {
    pageData.pageSize = val;
  };
  const handleCurrentChange = val => {
    pageData.currentPage = val;
  };

  return {
    pageData,
    totalCount,
    handleSizeChange,
    handleCurrentChange
  };
}
