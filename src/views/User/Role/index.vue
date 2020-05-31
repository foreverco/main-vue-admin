<template>
  <div>
    <!-- <svg-icon iconClass="info" className="info font50"></svg-icon> -->
    <el-row>
      <el-col :md="12" :sm="14">
        <div class="label-wrap category">
          <label for="">关键字:</label>
          <div class="warp-content">
            <el-row :gutter="16">
              <el-col :span="8">
                <SelectVue
                  style="width:100%"
                  :config="data.configSelect"
                  :selectData.sync="data.selectData"
                >
                </SelectVue>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="data.keyWord"
                  placeholder="请输入关键字"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button size="mini" @click="search">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :md="{ span: 8, offset: 4 }" :sm="10">
        <el-button
          type="success"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="addDialogBox"
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
          :inactive-value="0"
        >
        </el-switch>
        <!-- {{ slotData.data.status }} -->
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
      :editData.sync="data.editData"
      @refresTaleData="refresData"
    ></DialogBox>
  </div>
</template>
<script>
import { reactive, onBeforeMount } from "@vue/composition-api";
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import DialogBox from "./dialog/stockList";
import { delrole } from "@/api/user";
import { global } from "@/utils/global_V3.0";
export default {
  name: "Role",
  components: {
    TableVue,
    SelectVue,
    DialogBox
  },
  setup(props, { root, refs }) {
    const { confirm } = global();
    const data = reactive({
      configSelect: {
        init: [
          {
            value: "name",
            label: "控制站名称"
          },
          {
            value: "principalPerson",
            label: "负责人"
          },
          {
            value: "type",
            label: "设备名称"
          }
        ]
      },
      // 下拉框选中值
      selectData: "",
      // 关键字
      keyWord: "",
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
      console.log(data.tableRow);
      let id = data.tableRow.idItem;
      if (!id || id.length === 0) {
        root.$message({
          message: "请选择需要删除的设备",
          type: "warning"
        });
        return false;
      }
      confirm({
        content: "确认删除选中角色?确认后无法恢复！",
        tip: "警告",
        fn: rolemanyDel,
        id: "222"
      });
    };
    // 批量删除角色
    const rolemanyDel = () => {
      // let sensorId = data.tableRow.idItem.toString();
      let sensorId = data.tableRow.idItem;
      console.log(sensorId);
      delrole(sensorId).then(res => {
        console.log(res);
        refresData();
      });
    };
    const addDialogBox = () => {
      data.editData = {};
      console.log(data.editData);
      data.dialog_stock = true;
    };
    /* 单条删除角色 */
    let hanleDelId = "";
    const hanleDel = params => {
      hanleDelId = params;
      confirm({
        content: "确认删除选中角色,确认后无法恢复！",
        tip: "警告",
        fn: Delfn,
        id: "222"
      });
    };
    const Delfn = () => {
      let relaysId = [];
      relaysId.push(hanleDelId.id);
      console.log(relaysId);
      delrole(relaysId).then(res => {
        console.log(res);
        refresData();
      });
    };
    /* 编辑角色信息 */
    const handleEdit = params => {
      data.dialog_stock = true;
      // console.log(params);
      let paramsData = JSON.parse(JSON.stringify(params));
      data.editData = paramsData;
    };
    const refresData = () => {
      refs.roleTable.refreshData();
    };
    const search = () => {
      let requestData = {
        [data.selectData]: data.keyWord
      };
      refs.sensorTable.paramsLoadData(requestData);
    };
    onBeforeMount(() => {
      data.selectData = "name";
    });
    return {
      data,
      addDialogBox,
      batchDel,
      hanleDel,
      handleEdit,
      search,
      refresData
    };
  }
};
</script>
<style lang="scss" scoped>
.label-wrap {
  &.category {
    @include babelDom(left, 70, 30);
  }
  &.date {
    @include babelDom(left, 70, 30);
  }
  &.had_per {
    @include babelDom(left, 50, 30);
  }
  &.user_per {
    @include babelDom(left, 50, 30);
  }
}
</style>
