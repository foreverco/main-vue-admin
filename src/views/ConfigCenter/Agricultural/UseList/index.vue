<template>
  <div>
    <TableVue :config="data.configTable">
      <template v-slot:status="slotData">
        <el-switch active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
        <span v-if="false">{{ slotData }}</span>
      </template>
      <template v-slot:operation="slotData">
        <el-button size="mini" type="danger" @click="operation(slotData.data)"
          >删除</el-button
        >
        <el-button size="mini" type="success" @click="operation(slotData.data)"
          >编辑</el-button
        >
      </template>
    </TableVue>
  </div>
</template>
<script>
import TableVue from "@/components/Table";
import { reactive } from "@vue/composition-api";
export default {
  name: "userList",
  components: { TableVue },
  setup(props, { root }) {
    const data = reactive({
      /* table组件配置参数 */
      configTable: {
        // 多选框
        selection: true,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          { label: "ID", field: "id" },
          { label: "用户名", field: "identify", width: "150" },
          { label: "角色名", field: "roleName" },
          { label: "权限", field: "remark" },
          {
            label: "状态",
            field: "status",
            columnType: "slot",
            slotname: "status"
          },
          {
            label: "操作",
            columnType: "slot",
            slotname: "operation"
          }
        ],
        // tHead: [
        //   { label: "设备名称", field: "sbname", width: "150" },
        //   { label: "编号", field: "sbnum" },
        //   { label: "责任人", field: "hadper" },
        //   { label: "领用人", field: "useper" },
        //   {
        //     label: "状态",
        //     field: "status",
        //     columnType: "slot",
        //     slotname: "status"
        //   },
        //   {
        //     label: "操作",
        //     columnType: "slot",
        //     slotname: "operation"
        //   }
        // ],
        // 请求接口参数
        requestData: {
          url: "getGoodsList",
          method: "get",
          data: {
            page: 1,
            pageSize: 5
          }
        },
        pagination: {
          show: true
        },
        paginationLayout: {
          layout: "prev, pager, next, jumper,total, sizes"
        }
      }
    });
    /* methods 方法 */
    let operation = params => {
      console.log(params);
    };
    return { data, operation };
  }
};
</script>
<style lang="scss" scoped></style>
