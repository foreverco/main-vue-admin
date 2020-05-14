<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">设备名称:</label>
          <div class="warp-content">
            <SelectVue style="width:100%" :config="data.configSelect">
            </SelectVue>
            <!-- <el-select
              v-model="data.sb_value"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in data.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap had_per">
          <label for="">责任人: </label>
          <div class="warp-content">
            <el-select v-model="data.hadper_value" style="width:100%">
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
      <el-col :span="4">
        <div class="label-wrap user_per">
          <label for="">领用人: </label>
          <div class="warp-content">
            <el-input
              v-model="data.user_per"
              placeholder="领用人"
              style="width:100%"
            ></el-input>
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
          @click="dialog_stock = true"
          >添加</el-button
        >
        <el-button type="danger" size="small" icon="el-icon-delete"
          >删除</el-button
        >
      </el-col>
    </el-row>
    <TableVue :config="data.configTable">
      <template v-slot:status="slotData">
        <el-switch active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
        <span v-if="false">{{ slotData }}</span>
      </template>
      <template v-slot:operation="slotData">
        <el-button size="mini" type="danger" @click="operation(slotData.data)"
          >删除</el-button
        >
        <el-button size="mini" type="success" @click="operation(slotData.data)"
          >编辑</el-button
        >
      </template>
    </TableVue>
  </div>
</template>
<script>
import TableVue from "@/components/Table";
import SelectVue from "@/components/Select";
import { reactive } from "@vue/composition-api";
export default {
  components: {
    TableVue,
    SelectVue
  },
  setup(props, { root }) {
    const data = reactive({
      configSelect: {
        init: ["name"]
      },
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
          { label: "ID", field: "id" },
          { label: "设备名称", field: "identify" },
          { label: "设备型号", field: "roleName" },
          { label: "设备类型", field: "remark" },
          { label: "设备状态", field: "remark" },
          { label: "安装时间", field: "remark" },
          { label: "生产产家", field: "remark" },
          { label: "所在区域", field: "remark" },
          { label: "负责人", field: "remark9" },
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
          url: "getGoodsList",
          method: "get",
          data: {
            page: 1,
            pageSize: 3
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
    return {
      data,
      operation
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
