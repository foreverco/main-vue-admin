<template>
  <div>
    <el-row>
      <BaseTitle :moduleTitle="$route.meta.title" />
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
        >
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="batchDel()"
          >批量删除</el-button
        > -->
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
            @change="changeStatus(slotData.data)"
          >
          </el-switch>
          <span v-if="false">{{ slotData.data.switchStatus }}</span>
        </template>
      </TableVue>
    </div>

    <DialogBox
      :flag.sync="data.dialog_stock"
      :editData.sync="data.editData"
      @refresTaleData="refresData"
    ></DialogBox>
  </div>
</template>
<script>
import BaseTitle from "@/components/common/BaseTitle";
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import DialogBox from "./dialog/stockList";
import { reactive, onBeforeMount } from "@vue/composition-api";
import { delrelay } from "@/api/configCenter";
import { edithandle } from "@/api/common";
import { global } from "@/utils/global_V3.0";
export default {
  components: {
    BaseTitle,
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

      /* 表格参数 */
      configTable: {
        // 多选框
        selection: true,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          { label: "设备名称", field: "name" },
          // { label: "设备编号", field: "no" },
          // { label: "发送格式", field: "sendFormat" },
          { label: "区域名称", field: "areaName" },
          { label: "控制站名称", field: "controlName" },
          // { label: "厂家唯一标识", field: "originalId", width: "130" },
          { label: "负责人", field: "principalPerson" },
          { label: "负责人电话", field: "contactNumber", width: "130" },
          {
            label: "开关操作",
            field: "switchStatus",
            columnType: "slot",
            slotname: "status"
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
    const refresData = () => {
      refs.sensorTable.refreshData();
    };
    let handleParams = {};
    const changeStatus = val => {
      handleParams.settingId = val.id;
      handleParams.settingOnoff = val.switchStatus;
      confirm({
        content: `确认${val.switchStatus === true ? "打开" : "关闭"}此设备`,
        tip: "警告",
        status: "状态修改成功",
        fn: handleStatus,
        failfn: () => {
          console.log(val.switchStatus);
          val.switchStatus === "true"
            ? (val.switchStatus = "false")
            : (val.switchStatus = "true");
          console.log(val.switchStatus);
        },
        id: "222"
      });
    };

    const handleStatus = () => {
      console.log(handleParams);
      edithandle(handleParams).then(res => {
        console.log(res);
      });
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
      refresData,
      changeStatus,
      handleStatus,
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
