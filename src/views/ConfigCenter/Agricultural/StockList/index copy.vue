<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="label-wrap">
            <label for="">设备名称:</label>
            <div class="warp-content">
              <el-select
                v-model="value"
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

          <el-form-item label="设备名称:">
            <el-select v-model="value" placeholder="请选择" style="width:100px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div class="label-wrap">
            <label for="">领用时间:</label>
            <div class="warp-content">
              <el-date-picker
                v-model="value2"
                type="date"
                placeholder="选择日期"
                style="width:120px"
              >
              </el-date-picker>
            </div>
          </div>
          <el-form-item label="领用时间:">
            <!-- <el-date-picker
              v-model="value2"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker> -->
            <el-date-picker
              v-model="value2"
              type="date"
              placeholder="选择日期"
              style="width:120px"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div class="label-wrap">
            <label for="">责任人:</label>
            <div class="warp-content">
              <el-select v-model="value" style="width:100px">
                <el-option
                  v-for="item in hadPer"
                  :key="item.value"
                  :value="item.value"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </div>
          <el-form-item label="责任人:">
            <el-select v-model="value" style="width:100px">
              <el-option
                v-for="item in hadPer"
                :key="item.value"
                :value="item.value"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div class="label-wrap">
            <label for="">领用人:</label>
            <div class="warp-content">
              <el-select v-model="value" style="width:100px">
                <el-input
                  v-model="userPer"
                  placeholder="领用人"
                  style="width:100px"
                ></el-input>
              </el-select>
            </div>
          </div>
          <el-form-item label="领用人">
            <el-input
              v-model="userPer"
              placeholder="领用人"
              style="width:100px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button>搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="success" icon="el-icon-plus">添加</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "stock",
  setup(props, { root }) {
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
    const hadPer = reactive([
      { value: "id1", name: "吴诗豪" },
      { value: "id2", name: "张小艳" },
      { value: "id3", name: "胡锐" }
    ]);
    const value = ref("");
    const value2 = ref("");
    const userPer = ref("");
    return {
      /* data数据 */
      options,
      // 责任人
      hadPer,
      // 设备名称
      value,
      // 领用日期
      value2,
      // 使用人
      userPer
    };
  }
};
</script>
<style lang="scss" scoped>
.label-wrap {
  label {
    float: left;
    line-height: 40px;
    width: 80px;
  }
  .warp-content {
    margin-left: 80px;
  }
}
</style>
