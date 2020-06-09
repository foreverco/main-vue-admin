<template>
  <div>
    <!-- <el-row>
      <BaseTitle :moduleTitle="$route.meta.title" />
    </el-row> -->
    <div class="box_content">
      <el-row :gutter="10" justify="space-between" align="middle">
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
            size="mini"
            icon="el-icon-circle-plus-outline"
            @click="addDialogBox"
            >添加</el-button
          >
          <el-button
            type="danger"
            size="mini"
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
        <template v-slot:msgType="slotData">
          {{ slotData.data.messageType | filterType }}
        </template>
        <template v-slot:status="slotData">
          <span
            :style="{
              color: slotData.data.status === '未回复' ? 'red' : 'blue'
            }"
          >
            {{ slotData.data.status }}
          </span>
        </template>
        <template v-slot:operation="slotData">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(slotData.data)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="hadleFindAns(slotData.data)"
            >查看详情</el-button
          >
          <el-button size="mini" type="success">专家回复</el-button>
          <el-button size="mini" type="danger" @click="hanleDel(slotData.data)"
            >删除</el-button
          >
        </template>
      </TableVue>
    </div>
    <MsgDialog
      :flag.sync="data.dialog_stock"
      :editData.sync="data.editData"
      @refresTaleData="refresData"
    ></MsgDialog>
    <AddDialog
      :flag.sync="data.add_dialog_stock"
      :editData.sync="data.editData"
      @refresTaleData="refresData"
    ></AddDialog>
  </div>
</template>
<script>
// import BaseTitle from "@/components/common/BaseTitle";
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import MsgDialog from "./dialog/msgDialog";
import AddDialog from "./dialog/dialog";
import { reactive, onBeforeMount } from "@vue/composition-api";
import { delremote } from "@/api/remote";
import { global } from "@/utils/global_V3.0";
export default {
  components: {
    // BaseTitle,
    TableVue,
    SelectVue,
    MsgDialog,
    AddDialog
  },
  filters: {
    filterType: function(val) {
      switch (val) {
        case "0":
          return "中草药种植类1";
        case "1":
          return "中草药种植类2";
      }
    }
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
      // 添加编辑模态框
      add_dialog_stock: false,
      editData: {},
      /* 表格参数 */
      configTable: {
        // 多选框
        selection: true,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          { label: "标题", field: "title" },
          { label: "发送时间", field: "createDate", width: "160" },
          { label: "创建人", field: "createUser" },
          { label: "更新人", field: "updateUser" },
          // { label: "消息类型", field: "messageType" },
          {
            label: "消息类型",
            columnType: "slot",
            slotname: "msgType"
          },
          { label: "消息状态", columnType: "slot", slotname: "status" },

          {
            label: "操作",
            columnType: "slot",
            slotname: "operation",
            width: "350"
          }
        ],
        // 请求接口参数
        requestData: {
          url: "getRemoteList",
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
      delremote(sensorId).then(res => {
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
      let plansId = [];
      plansId.push(hanleDelId.id);
      console.log(plansId);
      delremote(plansId).then(res => {
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
      data.add_dialog_stock = true;
    };
    const search = () => {
      let requestData = {
        [data.selectData]: data.keyWord
      };
      refs.sensorTable.paramsLoadData(requestData);
    };
    /* 查看详情模态框 */
    const hadleFindAns = params => {
      console.log(params);
      data.editData = params;
      data.dialog_stock = true;
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
      search,
      hadleFindAns
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
