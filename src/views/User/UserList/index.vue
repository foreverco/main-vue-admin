<template>
  <div>
    <el-row>
      <BaseTitle moduleTitle="用户列表" />
    </el-row>
    <div class="box_content">
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
        ref="userTable"
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
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(slotData.data)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="hanleDel(slotData.data)"
            >删除</el-button
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
import { reactive, onBeforeMount } from "@vue/composition-api";
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import DialogBox from "./dialog/stockList";
export default {
  name: "UserList",
  components: {
    BaseTitle,
    TableVue,
    SelectVue,
    DialogBox
  },
  setup(props, { root, refs }) {
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
          { label: "姓名", field: "name" },
          { label: "昵称", field: "nickname" },
          { label: "账号", field: "account" },
          { label: "密码", field: "password" },
          { label: "邮件", field: "mail" },
          { label: "性别", field: "gender" },
          { label: "手机号", field: "mobile" },
          { label: "备注", field: "remark" },
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
          url: "getUserList",
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
    const search = () => {
      let requestData = {
        [data.selectData]: data.keyWord
      };
      refs.userTable.paramsLoadData(requestData);
    };
    const refresData = () => {
      refs.userTable.refreshData();
    };
    onBeforeMount(() => {
      data.selectData = "name";
    });
    return {
      data,
      batchDel,
      refresData,
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
