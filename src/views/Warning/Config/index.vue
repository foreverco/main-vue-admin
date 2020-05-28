<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="label-wrap category">
          <label for="">区域:</label>
          <div class="warp-content">
            <SelectVue style="width:70%" :config="data.configSelect">
            </SelectVue>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="label-wrap had_per">
          <label for="">采集站: </label>
          <div class="warp-content">
            <el-select v-model="data.hadper_value" style="width:70%">
              <el-option
                v-for="item in data.had_per"
                :key="item.value"
                :value="item.value"
                :label="item.name"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="1" style="line-height:30px">
        <el-button size="mini">搜索</el-button>
      </el-col>
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
      ref="warningconfigTable"
    >
      <template v-slot:alarm="slotData">
        {{ slotData.data.alarmTerm === "2" ? ">" : "=" }}
        {{ slotData.data.alarmValue }}
      </template>
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.SENSORSTATUS"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="2"
        >
        </el-switch>
        <span v-if="false">{{ slotData.data.SENSORSTATUS }}</span>
      </template>
      <template v-slot:status="slotData">
        {{ slotData.data.alertMessage === "1" ? "开启" : "关闭" }}
      </template>
      <template v-slot:status="slotData">
        {{ slotData.data.alertinForm === "1" ? "开启" : "关闭" }}
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
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import DialogBox from "./dialog/stockList";
import { global } from "../../../utils/global_V3.0";
import { reactive } from "@vue/composition-api";
import { delwarningConfig } from "../../../api/warning";
export default {
  name: "WaarningConfig",
  components: {
    TableVue,
    DialogBox,
    SelectVue
  },
  setup(props, { root, refs }) {
    const { confirm } = global();
    const data = reactive({
      configSelect: {},
      // 弹框状态
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
          // { label: "设备ID", field: "sensorId" },
          { label: "设备名称", field: "sensorName" },
          { label: "设备地址", field: "areaName" },
          { label: "采集站", field: "stationName" },
          {
            label: "设备状态",
            field: "SENSORSTATUS",
            columnType: "slot",
            slotname: "status"
          },
          {
            label: "预警条件",
            field: "status",
            columnType: "slot",
            slotname: "alarm"
          },
          { label: "阈值超限间隔", field: "thresholdGap", width: "150" },
          {
            label: "告警短信",
            field: "alertMessage",
            columnType: "slot",
            slotname: "status"
          },
          {
            label: "告警短信",
            field: "alertinForm",
            columnType: "slot",
            slotname: "status"
          },
          // { label: "告警通知", field: "alertinForm" },
          {
            label: "操作",
            columnType: "slot",
            slotname: "operation",
            width: "170"
          }
        ],
        // 请求接口参数
        requestData: {
          url: "getWarningConfigList",
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
        content: "确认删除选中数据,确认后无法恢复！",
        tip: "警告",
        fn: warningConfigDel,
        id: "222"
      });
    };
    // 批量删除传感器
    const warningConfigDel = () => {
      // let sensorId = data.tableRow.idItem.toString();
      let warningConfigId = data.tableRow.idItem;
      console.log(warningConfigId);
      delwarningConfig(warningConfigId).then(res => {
        console.log(res);
        refresData();
      });
    };

    const handleEdit = params => {
      data.dialog_stock = true;
      let paramsData = JSON.parse(JSON.stringify(params));
      // 子组件赋值
      data.editData = paramsData;
    };
    // 单个删除
    let hanleDelId = "";
    const hanleDel = e => {
      hanleDelId = e;
      confirm({
        content: "确认删除选中数据,确认后无法恢复！",
        tip: "警告",
        fn: Delfn,
        id: "222"
      });
    };
    const Delfn = () => {
      let warningConfigId = [];
      warningConfigId.push(hanleDelId.id);
      delwarningConfig(warningConfigId).then(res => {
        refresData();
      });
    };
    const refresData = () => {
      refs.warningconfigTable.refreshData();
    };
    return {
      data,
      batchDel,
      handleEdit,
      hanleDel,
      refresData,
      Delfn
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
