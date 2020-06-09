<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="title">菜单功能</span>
      </div>
      <el-row type="flex" justify="left">
        <el-button
          type="primary"
          :disabled="menuData.menuType !== 'PAGE'"
          @click="showDialog"
          >添加功能按钮</el-button
        >
      </el-row>
      <TableVue
        :config="data.configTable"
        :tableRow.sync="data.tableRow"
        ref="menubtnTable"
      >
        <template v-slot:staus="slotData">
          <div class="stausBox">
            <span
              :style="{
                background: slotData.data.status === 1 ? 'green' : 'red'
              }"
            ></span>
            <!-- {{ slotData.data.status }} -->
            <!-- <span style="margin:3px">|</span> -->
            <span>{{ slotData.data.actionName }}</span>
          </div>
        </template>

        <template v-slot:operation="slotData">
          <span @click="handleEdit(slotData.data)">编辑</span>
          <span style="margin:3px">|</span>
          <span @click="handleDel(slotData.data)">删除</span>
          <span style="margin:3px">|</span>
          <span @click="handleFindApi(slotData.data)">接口权限</span>
        </template>
      </TableVue>
    </el-card>
    <Dialog
      :flag.sync="data.dialog_stock"
      :editData.sync="data.editData"
      @refresTaleData="refresData"
    ></Dialog>
    <Apidialog
      :flag.sync="data.api_handleFindApi_stock"
      :editData.sync="data.apieditData"
      @refresTaleData="refresData"
    ></Apidialog>
  </div>
</template>
<script>
import { reactive, watch } from "@vue/composition-api";
import TableVue from "@/components/Table";
import Dialog from "./dialog";
import Apidialog from "./dialog/apidialog";
import { delaction } from "@/api/user";
import { global } from "@/utils/global_V3.0";
export default {
  name: "menuBtn",
  components: {
    TableVue,
    Dialog,
    Apidialog
  },
  props: {
    menuData: {
      type: Object,
      required: true
    }
  },
  setup(props, { root, refs }) {
    const { confirm } = global();
    const data = reactive({
      // 添加功能按钮弹框
      dialog_stock: false,
      //api接口弹框
      api_handleFindApi_stock: false,
      editData: {},
      apieditData: {},
      // table选择的数据
      tableRow: {},
      /* 表格参数 */
      configTable: {
        //初始化是否加载
        isLoadingData: false,
        // 多选框
        selection: false,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          // { label: "设备ID", field: "sensorId" },
          {
            label: "功能名称",
            // field: "actionName",
            columnType: "slot",
            slotname: "staus"
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
          url: "getMenubtn",
          method: "get",
          data: {
            menuId: "",
            page: 1,
            pageSize: 5
          }
        },
        pagination: {
          show: false
        },
        paginationLayout: {
          layout: "prev, pager, next, jumper,total, sizes"
        }
      }
    });
    watch(
      () => props.menuData,
      (newVal, oldVal) => {
        if (newVal.id) {
          console.log(newVal);
          let menuIdData = newVal.id;
          let requestData = {
            menuId: menuIdData
          };
          refs.menubtnTable && refs.menubtnTable.paramsLoadData(requestData);
        }
      }
    );
    // const searchmebuBtn = () => {
    //   console.log(props.menuData.id);
    //   let menuIdData = props.menuData.id;
    //   let requestData = {
    //     menuId: menuIdData
    //   };
    //   refs.menubtnTable.paramsLoadData(requestData);
    // };
    /* 添加功能弹框 */
    const showDialog = () => {
      data.dialog_stock = true;
      let paramsData = JSON.parse(JSON.stringify(props.menuData));
      console.log(paramsData);
      // 子组件赋值
      data.editData = paramsData;
    };
    /* 删除功能 */
    const handleDel = params => {
      console.log(params);
      let plansId = [];
      plansId.push(params.id);
      confirm({
        content: "确认删除选中数据,确认后无法恢复！",
        tip: "警告",
        fn: () => {
          delaction(plansId).then(res => {
            console.log(res);
            refresData();
          });
        },
        id: "222"
      });
    };
    /* 接口权限弹框 */
    const handleFindApi = () => {
      data.api_handleFindApi_stock = true;
      let paramsData = JSON.parse(JSON.stringify(props.menuData));
      // 子组件赋值
      data.editData = paramsData;
      console.log(data.editData);
    };

    /* 刷新表格 */
    const refresData = () => {
      refs.menubtnTable.refreshData();
    };

    return {
      data,
      showDialog,
      refresData,
      handleDel,
      handleFindApi
      // searchmebuBtn
    };
  }
};
</script>
<style lang="scss">
@import "@/styles/config.scss";
.stausBox {
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    // height: 10px;
    margin: 0 3px;
    // background: $maincolor;
    // &:hover {
    //   cursor: pointer;
    // }
    &:first-child {
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background: red;
      display: inline-block;
    }
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.title {
  display: inline-block;
  float: left;
}

.text {
  font-size: 14px;
}
</style>
