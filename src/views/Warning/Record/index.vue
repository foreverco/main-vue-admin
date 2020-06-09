<template>
  <div>
    <el-row>
      <BaseTitle moduleTitle="预警日志" />
    </el-row>
    <div class="box_content">
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
          <!-- <el-button
          type="success"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="addDialogBox"
          >添加</el-button
        > -->
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="batchDel()"
            >修改状态</el-button
          >
        </el-col>
      </el-row>
      <TableVue
        :config="data.configTable"
        :tableRow.sync="data.tableRow"
        ref="recordTable"
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
          {{ slotData.data.logStatus === "已处理" ? "已处理" : "未处理" }}
        </template>
        <template v-slot:status="slotData">
          {{ slotData.data.logStatus === "已处理" ? "已处理" : "未处理" }}
        </template>
        <!-- <template v-slot:operation="slotData">
        <el-button size="mini" type="success" @click="handleEdit(slotData.data)"
          >编辑</el-button
        >

      </template> -->
      </TableVue>
    </div>
  </div>
</template>
<script>
import BaseTitle from "@/components/common/BaseTitle";
import { reactive, onBeforeMount } from "@vue/composition-api";
import { delwarningConfig } from "@/api/warning";
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import { delrecord } from "@/api/warning";
import { global } from "../../../utils/global_V3.0.js";
export default {
  name: "record",
  components: {
    BaseTitle,
    TableVue,
    SelectVue
  },
  setup(props, { root, refs }) {
    const { confirm } = global();
    const data = reactive({
      editData: {},
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
      /* 表格参数 */
      configTable: {
        // 多选框
        selection: true,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          // { label: "设备ID", field: "sensorId" },
          { label: "设备名称", field: "settingName" },
          { label: "设备地址", field: "areaName" },
          { label: "告警原因", field: "logQuestion", width: 300 },
          // { label: "告警状态", field: "logStatus" },
          {
            label: "处理状态",
            field: "logStatus",
            columnType: "slot",
            slotname: "status"
          }
          // { label: "告警通知", field: "alertinForm" },
          // {
          //   label: "操作",
          //   columnType: "slot",
          //   slotname: "operation",
          //   width: "170"
          // }
        ],
        // 请求接口参数
        requestData: {
          url: "getRecordList",
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
        content: "确认修改设备处理状态！",
        tip: "警告",
        status: "状态修改成功",
        fn: recordDel,
        id: "222"
      });
    };
    // 删除传感器
    const recordDel = () => {
      // let sensorId = data.tableRow.idItem.toString();
      let recordId = data.tableRow.idItem;
      console.log(recordId);
      delrecord(recordId).then(res => {
        console.log(res);
        refresData();
      });
    };
    const refresData = () => {
      refs.recordTable.refreshData();
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
  a {
    justify-content: space-around;
  }
}
</style>
