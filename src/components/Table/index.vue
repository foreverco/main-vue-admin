<template>
  <div>
    <el-table
      :data="data.tableData"
      border
      style="width: 100%;margin-top:10px;"
      :header-cell-style="{ background: '#262B40', color: '#fff' }"
      class="tableClass"
    >
      <!-- 多选框 -->
      <el-table-column
        v-if="data.tableConfig.selection"
        type="selection"
        width="55"
      >
      </el-table-column>

      <!-- 文本数据渲染 -->
      <template v-for="item in data.tableConfig.tHead">
        <!-- v-slot -->
        <el-table-column
          :key="item.field"
          v-if="item.columnType === 'slot'"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot :name="item.slotname" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- function -->
        <el-table-column
          :key="item.field"
          v-else-if="item.columnType === 'function'"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
        >
        </el-table-column>
        <!-- 文本 -->
        <el-table-column
          v-else
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
        >
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      style="margin-top:10px;"
      v-if="data.tableConfig.pagination.show"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.currentPage"
      :page-sizes="pageData.pageSizes"
      :page-size="pageData.pageSize"
      :layout="data.tableConfig.paginationLayout.layout"
      :total="pageData.total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { reactive, onBeforeMount, watch } from "@vue/composition-api";
import { loadData } from "./tableLoadData";
import { paginationHook } from "./paginationHook";
// import { recordPage } from "./recordPge";
export default {
  name: "Tablevue",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    // 加载数据
    const { tableData, tableLoadData } = loadData({ root });
    // 分页
    const {
      pageData,
      handleSizeChange,
      handleCurrentChange,
      totalCount
    } = paginationHook({
      root
    });
    // 翻页记录
    // const { aa, aafn } = recordPage({ root });
    // 组件变量
    const data = reactive({
      tableConfig: {
        // 多选框
        selection: true,
        // 翻页记录
        recordCheckbox: false,
        // 请求接口参数
        requestData: {},
        // 表头
        tHead: [],
        pagination: {
          show: true
        },
        paginationLayout: {
          layout: "prev, pager, next, jumper,total, sizes"
        }
      },
      tableData: [
        {
          sbname: "2016-05-02",
          sbnum: "王小虎",
          hadper: "上海市普陀区金沙江路 1518 弄",
          useper: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    });
    // watch(
    //   () => tableData.item,
    //   (newValue, oldValue) => (data.tableData = newValue)
    // );
    // 数据渲染
    watch(
      [() => tableData.item, () => tableData.total],
      ([tableData, totalCountnum]) => {
        data.tableData = tableData;
        totalCount(totalCountnum);
      }
    );

    // 页码监听
    watch(
      [() => pageData.pageSize, () => pageData.currentPage],
      ([pageSize, currentPage]) => {
        let requestData = data.tableConfig.requestData;
        if (requestData.data) {
          requestData.data.page = currentPage;
          requestData.data.pageSize = pageSize;
          console.log(data.tableConfig.requestData);
          tableLoadData(data.tableConfig.requestData);
        }
      }
    );
    /**
     * 方法 methods
     *  */

    // 初始化table配置
    // 匹配相同的key 相同则替换
    const initTaleConfig = () => {
      let configData = props.config;
      let keys = Object.keys(data.tableConfig);
      for (let key in configData) {
        if (keys.includes(key)) {
          // ["selection", "recordCheckbox", "requestUrl", "tHead"].includes("requestUrl")
          data.tableConfig[key] = configData[key];
        }
      }
    };

    /* onBeforeMount */
    onBeforeMount(() => {
      initTaleConfig();
      console.log(data.tableConfig.requestData);
      tableLoadData(data.tableConfig.requestData);
    });
    return { data, pageData, handleSizeChange, handleCurrentChange };
  }
};
</script>
<style lang="scss" scoped></style>
