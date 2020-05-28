<template>
  <div>
    <el-row :gutter="10" justify="space-between">
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
      ref="sensorTable"
    >
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.switchStatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="true"
          inactive-value="false"
        >
        </el-switch>
        <span v-if="false">{{ slotData.data.switchStatus }}</span>
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
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import DialogBox from "./dialog/stockList";
import { reactive, onBeforeMount } from "@vue/composition-api";
import { delrelay } from "@/api/configCenter";
import { global } from "../../../utils/global_V3.0";
export default {
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
      // table选择的数据
      tableRow: {},
      // 弹框状态
      dialog_stock: false,
      editData: {},

      sb_value: "",
      hadper_value: "",
      user_per: "",
      // 设备名称
      options: [
        {
          value: "选项1",
          label: "空气监测器"
        },
        {
          value: "选项2",
          label: "土壤监测器"
        },
        {
          value: "选项3",
          label: "湿度监测器"
        },
        {
          value: "选项4",
          label: "温度监测器"
        }
      ],
      // 责任人
      had_per: [
        { value: "id1", name: "吴诗豪" },
        { value: "id2", name: "张小艳" },
        { value: "id3", name: "胡锐" }
      ],

      /* 表格参数 */
      configTable: {
        // 多选框
        selection: true,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          { label: "设备名称", field: "name" },
          { label: "设备编号", field: "no" },
          { label: "发送格式", field: "sendFormat" },
          { label: "区域名称", field: "areaName" },
          { label: "控制站名称", field: "controlName", width: "130" },
          { label: "厂家唯一标识", field: "originalId", width: "130" },
          { label: "负责人", field: "principalPerson" },
          { label: "负责人电话", field: "contactNumber", width: "130" },
          {
            label: "状态",
            field: "switchStatus",
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
          url: "getRelaysList",
          method: "get",
          data: {
            page: 1,
            pageSize: 6
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
        content: "确认删除选中数据,确认后无法恢复！",
        tip: "警告",
        fn: sensorDel,
        id: "222"
      });
    };
    // 删除传感器
    const sensorDel = () => {
      // let sensorId = data.tableRow.idItem.toString();
      let sensorId = data.tableRow.idItem;
      console.log(sensorId);
      delrelay(sensorId).then(res => {
        console.log(res);
        refresData();
      });
    };
    const refresData = () => {
      refs.sensorTable.refreshData();
    };
    /* 单条删除数据 */
    let hanleDelId = "";
    const hanleDel = params => {
      hanleDelId = params;
      confirm({
        content: "确认删除选中数据,确认后无法恢复！",
        tip: "警告",
        fn: Delfn,
        id: "222"
      });
    };
    const Delfn = () => {
      let relaysId = [];
      relaysId.push(hanleDelId.id);
      console.log(relaysId);
      delrelay(relaysId).then(res => {
        console.log(res);
        refresData();
      });
    };
    /* 编辑数据 */
    const handleEdit = params => {
      // console.log(params);
      data.dialog_stock = true;
      let paramsData = JSON.parse(JSON.stringify(params));
      // 子组件赋值
      data.editData = paramsData;
    };
    const addDialogBox = () => {
      data.editData = {};
      console.log(data.editData);
      data.dialog_stock = true;
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
      batchDel,
      refresData,
      hanleDel,
      handleEdit,
      addDialogBox,
      Delfn,
      search
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
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
