<template>
  <div>
    <!-- <el-form :inline="true" class="demo-form-inline"> -->
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">设备名称:</label>
          <div class="warp-content">
            <el-select
              v-model="sb_value"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label-wrap date">
          <label for="">领用时间:</label>
          <div class="warp-content">
            <el-date-picker
              v-model="date_value"
              type="date"
              placeholder="选择日期"
              style="width:100%"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap had_per">
          <label for="">责任人: </label>
          <div class="warp-content">
            <el-select v-model="hadper_value" style="width:100%">
              <el-option
                v-for="item in had_per"
                :key="item.value"
                :value="item.value"
                :label="item.name"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap user_per">
          <label for="">领用人: </label>
          <div class="warp-content">
            <el-input
              v-model="user_per"
              placeholder="领用人"
              style="width:100%"
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="1" style="line-height:40px">
        <el-button size="mini">搜索</el-button>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          @click="dialog_stock = true"
          >添加</el-button
        >
        <el-button type="danger" icon="el-icon-delete" @click="delmanyMsg"
          >删除</el-button
        >
      </el-col>
    </el-row>
    <!-- </el-form> -->
    <div class="black-space-20"></div>
    <el-table
      :data="table_data"
      height="400"
      border
      style="width: 100%"
      :header-cell-style="{ background: '#344a5f', color: '#fff' }"
      class="tableClass"
    >
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column type="index" width="50" label="ID"> </el-table-column>
      <el-table-column prop="facility" label="设备名称"> </el-table-column>
      <el-table-column prop="number" label="编号"> </el-table-column>
      <el-table-column prop="type" label="型号"> </el-table-column>
      <el-table-column prop="hadper" label="责任人"> </el-table-column>
      <el-table-column prop="adress" label="所在地"> </el-table-column>
      <el-table-column label="使用状态">
        <el-switch
          style="display: block"
          v-model="use_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="使用中"
          inactive-text="库存"
        >
        </el-switch>
      </el-table-column>
      <el-table-column prop="uerper" label="领用人"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="success"
            :index="scope"
            size="mini"
            @click="dialog_stock = true"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="delMsg">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-20"></div>
    <el-row>
      <el-col :span="12">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next, jumper,total, sizes"
          :total="1000"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 新增弹框 -->
    <DialogStock :flag.sync="dialog_stock"></DialogStock>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
import DialogStock from "./dialog/stockList";
import { global } from "../../../../utils/global_V3.0";
export default {
  name: "stock",
  components: { DialogStock },
  setup(props, { root }) {
    const { confirm, str } = global();
    /* data数据 */
    // 弹框状态
    const dialog_stock = ref(false);
    const sb_value = ref("");
    const date_value = ref("");
    const hadper_value = ref("");
    const user_per = ref("");
    const use_status = ref(true);
    // 设备名称
    const options = reactive([
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
    ]);
    // 责任人
    const had_per = reactive([
      { value: "id1", name: "吴诗豪" },
      { value: "id2", name: "张小艳" },
      { value: "id3", name: "胡锐" }
    ]);

    // 表格数据
    const table_data = reactive([
      {
        facility: "哈哈1",
        number: "9527",
        type: "SB-125",
        hadper: "王伟",
        adress: "A区-75",
        status: true,
        uerper: "陈赫"
      },
      {
        facility: "哈哈1",
        number: "9527",
        type: "SB-125",
        hadper: "王伟",
        adress: "A区-75",
        status: true,
        uerper: "陈赫"
      },
      {
        facility: "哈哈1",
        number: "9527",
        type: "SB-125",
        hadper: "王伟",
        adress: "A区-75",
        status: true,
        uerper: "陈赫"
      },
      {
        facility: "哈哈1",
        number: "9527",
        type: "SB-125",
        hadper: "王伟",
        adress: "A区-75",
        status: true,
        uerper: "陈赫"
      },
      {
        facility: "哈哈1",
        number: "9527",
        type: "SB-125",
        hadper: "王伟",
        adress: "A区-75",
        status: true,
        uerper: "陈赫"
      },
      {
        facility: "哈哈1",
        number: "9527",
        type: "SB-125",
        hadper: "王伟",
        adress: "A区-75",
        status: true,
        uerper: "陈赫"
      },
      {
        facility: "哈哈1",
        number: "9527",
        type: "SB-125",
        hadper: "王伟",
        adress: "A区-75",
        status: true,
        uerper: "陈赫"
      },
      {
        facility: "哈哈1",
        number: "9527",
        type: "SB-125",
        hadper: "王伟",
        adress: "A区-75",
        status: true,
        uerper: "陈赫"
      }
    ]);
    /* methods */
    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
    };
    // 删除数据
    const delMsg = () => {
      confirm({
        content: "确认删除当前数据,确认后无法恢复！",
        fn: confirmDel,
        id: "111"
      });
      // root.confirm({
      //   content: "确认删除当前数据,确认后无法恢复！",
      //   tip: "警告",
      //   fn: confirmDel,
      //   id: "222"
      // });
    };
    // 删除多条信息
    const delmanyMsg = () => {
      confirm({
        content: "确认删除选中数据,确认后无法恢复！",
        tip: "警告",
        fn: confirmDel,
        id: "222"
      });
      // root.confirm({
      //   content: "确认删除选中数据,确认后无法恢复！",
      //   type: "success",
      //   fn: confirmDel,
      //   id: "11111"
      // });
    };
    const confirmDel = value => {
      console.log(value);
    };

    return {
      /* data数据 ref */
      // 弹框状态
      dialog_stock,
      hadper_value,
      // 责任人
      had_per,
      // 设备名称
      sb_value,
      // 领用日期
      date_value,
      // 使用人
      user_per,

      /* data数据 reactive */
      options,
      // 表格数据
      table_data,
      use_status,

      /* methods方法 */
      handleSizeChange,
      handleCurrentChange,
      delMsg,
      delmanyMsg
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.label-wrap {
  &.category {
    @include babelDom(left, 70, 40);
  }
  &.date {
    @include babelDom(left, 70, 40);
  }
  &.had_per {
    @include babelDom(left, 50, 40);
  }
  &.user_per {
    @include babelDom(left, 50, 40);
  }
}
// .el-table {
//   // border: 1px solid red;
//   // height: 75vh;
//   // overflow: auto;
//   td {
//     text-align: center !important;
//     color: red;
//   }
// }
// .el-table td,
// .el-table th {
//   text-align: center !important;
// }
</style>
