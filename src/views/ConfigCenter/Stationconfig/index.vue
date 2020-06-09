<template>
  <div>
    <el-row>
      <BaseTitle :moduleTitle="$route.meta.title" />
    </el-row>
    <div class="box_content">
      <el-row :gutter="10">
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
          <!-- <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="batchDel"
          >删除</el-button
        > -->
        </el-col>
      </el-row>
      <TableVue
        :config="data.configTable"
        :tableRow.sync="data.tableRow"
        ref="stationTable"
      >
        <template v-slot:status="slotData">
          <el-switch active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
          <span v-if="false">{{ slotData }}</span>
        </template>
        <template v-slot:operation="slotData">
          <el-button size="mini" type="danger" @click="hanleDel(slotData.data)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(slotData.data)"
            >编辑</el-button
          >
        </template>
      </TableVue>
    </div>
    <DialogBox
      :flag.sync="data.dialog_stock"
      :editData="data.editData"
      @refresTaleData="refresData"
    ></DialogBox>
  </div>
</template>
<script>
import BaseTitle from "@/components/common/BaseTitle";
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import { reactive, onBeforeMount } from "@vue/composition-api";
import DialogBox from "./dialog/stockList";
import { delstation } from "@/api/configCenter";
import { global } from "../../../utils/global_V3.0";
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
      // 弹框状态
      dialog_stock: false,
      editData: {},
      tableRow: {},
      /* 表格参数 */
      configTable: {
        // 多选框
        selection: true,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          { label: "采集站名", field: "name" },
          { label: "编号", field: "no" },
          { label: "所属区域", field: "areaName" },
          { label: "负责人", field: "principalPerson" },
          { label: "联系电话", field: "contactNumber" },
          { label: "数据传输方式", field: "transferMethod" },
          { label: "厂家唯一标识", field: "originalId" },
          // {
          //   label: "状态",
          //   field: "status",
          //   columnType: "slot",
          //   slotname: "status"
          // },
          {
            label: "操作",
            columnType: "slot",
            slotname: "operation",
            width: "170"
          }
        ],
        // 请求接口参数
        requestData: {
          url: "getcollectStatitions",
          method: "get",
          data: {
            page: 1,
            pageSize: 7
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
    /* methods 方法 */
    // const batchDel = () => {
    //   console.log(data.tableRow);
    //   let id = data.tableRow.idItem;
    //   if (!id || id.length === 0) {
    //     root.$message({
    //       message: "请选择需要删除的设备",
    //       type: "warning"
    //     });
    //     return false;
    //   }
    //   confirm({
    //     content: "确认删除选中数据,确认后无法恢复！",
    //     tip: "警告",
    //     fn: stationDel,
    //     id: "222"
    //   });
    // };
    // /* 批量删除采集站 */
    // const stationDel = () => {
    //   console.log(data.tableRow);
    //   let stationId = data.tableRow.idItem;
    //   console.log(stationId);
    //   delstation(stationId).then(res => {
    //     console.log(res);
    //     refresData();
    //   });
    // };
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
      console.log(hanleDelId.id);
      delstation({ id: hanleDelId.id })
        .then(res => {
          console.log(res);
          refresData();
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    };
    // 重置表格数据
    const refresData = () => {
      refs.stationTable.refreshData();
    };
    /* 编辑数据 */
    const handleEdit = params => {
      console.log(123123123123);
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
      refs.stationTable.paramsLoadData(requestData);
    };
    onBeforeMount(() => {
      data.selectData = "name";
    });
    return {
      data,
      operation,
      refresData,
      // batchDel,
      addDialogBox,
      handleEdit,
      hanleDel,
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
