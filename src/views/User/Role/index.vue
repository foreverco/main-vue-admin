<template>
  <div>
    <!-- <svg-icon iconClass="info" className="info font50"></svg-icon> -->
    <el-row>
      <el-col :span="5" :offset="6">
        <el-button
          type="success"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="data.dialog_stock = true"
          >添加</el-button
        >
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="batchDel()"
          >批量删除</el-button
        >
      </el-col>
    </el-row>
    <TableVue
      :config="data.configTable"
      :tableRow.sync="data.tableRow"
      ref="roleTable"
    >
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="开启"
          inactive-text="禁用"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
        <span v-if="false">{{ slotData.data.SENSORSTATUS }}</span>
      </template>
      <template v-slot:operation="slotData">
        <el-button size="mini" type="success" @click="handleEdit(slotData.data)"
          >编辑</el-button
        >
        <el-button size="mini" type="danger" @click="hanleDel(slotData.data)"
          >删除</el-button
        >
      </template>
    </TableVue>
    <DialogBox
      :flag.sync="data.dialog_stock"
      :editData="data.editData"
      @refresTaleData="refresData"
    ></DialogBox>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import DialogBox from "./dialog/stockList";
export default {
  name: "Role",
  components: {
    TableVue,
    // SelectVue,
    DialogBox
  },
  setup(props, { root, refs }) {
    const data = reactive({
      // 弹框显示
      dialog_stock: false,
      editData: {},
      // table选择的数据
      tableRow: {},
      /* 表格参数 */
      configTable: {
        // 多选框
        selection: true,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          { label: "角色名", field: "roleName" },
          { label: "角色编码", field: "roleCode" },
          { label: "角色描述", field: "roleDesc" },
          {
            label: "角色状态",
            field: "status",
            columnType: "slot",
            slotname: "status"
          },
          {
            label: "操作",
            columnType: "slot",
            slotname: "operation",
            width: "170"
          }
        ],
        // 请求接口参数
        requestData: {
          url: "getRoleList",
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
    const batchDel = () => {
      console.log("批量删除");
    };
    const refresData = () => {
      refs.warningconfigTable.refreshData();
    };
    return {
      data,
      batchDel,
      refresData
    };
  }
};
</script>
<style lang="scss" scoped></style>
