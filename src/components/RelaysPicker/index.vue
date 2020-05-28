<template>
  <div>
    <el-row>
      <el-col :span="11" v-if="init.largeArea">
        <el-form-item label="大区域">
          <el-select
            v-model="data.largeAreaValue"
            @change="handlelargeArea"
            style="width:60%"
          >
            <el-option
              v-for="item in data.largeArea"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1" v-if="init.areas">
        <el-form-item label="区域">
          <el-select
            v-model="data.areasValue"
            @change="handleAreas"
            style="width:60%"
          >
            <el-option
              v-for="item in data.areas"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="init.controls || init.relays">
      <el-col :span="11" v-if="init.controls">
        <el-form-item label="控制站">
          <el-select
            v-model="data.controlsValue"
            @change="handleControls"
            style="width:60%"
          >
            <el-option
              v-for="item in data.controls"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1" v-if="init.relays">
        <el-form-item label="继电器">
          <el-select
            v-model="data.relaysValue"
            @change="handleRelays"
            style="width:60%"
          >
            <el-option
              v-for="item in data.relays"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { reqareas, reqStatitions, reqSensors } from "../../api/common";
import { watch, onBeforeMount, reactive } from "@vue/composition-api";
import { relaysPicker } from "./relaysPicker";
export default {
  name: "Relayspicker",
  props: {
    relaysPickerLevel: {
      type: Array,
      default: () => []
    },
    relaysData: {
      type: Object,
      default: () => {}
    },
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { root, emit }) {
    console.log(props.relaysData);
    // 初始化省市区联动
    const init = reactive({
      largeArea: false,
      areas: false,
      controls: false,
      relays: false
    });

    const {
      // 事件
      getlargeArea,
      // getareas,
      handleAreas,
      handlelargeArea,
      handleControls,
      handleRelays,
      // 数据集合
      data,
      resultData
    } = relaysPicker();
    /* 初始化 */
    const initRelaysPicker = () => {
      console.log(props.relaysPickerLevel);
      console.log(props.relaysData);
      let initData = props.relaysPickerLevel;
      if (initData.length === 0) {
        for (let key in init) {
          init[key] = true;
        }
      } else {
        initData.forEach(element => {
          init[element] = true;
        });
      }
    };
    watch(
      [
        () => resultData.largeAreaValue,
        () => resultData.areasValue,
        () => resultData.controlsValue,
        () => resultData.relaysValue
      ],
      ([areas, controls, relays]) => {
        emit("update:relaysData", resultData);
        console.log(resultData);
      }
    );
    watch(
      () => props.dialogShow,
      (newVale, oldvalue) => {
        console.log(41414141414);
        setTimeout(() => {
          data.largeAreaValue = resultData.largeareaName;
          data.areasValue = resultData.areaName;
          data.controlsValue = resultData.controlsName;
          data.relaysValue = resultData.relaysName;
        }, 500);
      }
    );
    onBeforeMount(() => {
      // 初始化
      initRelaysPicker();
      // 获取大区域
      getlargeArea();
    });
    return {
      init,
      data,
      // 事件
      getlargeArea,
      // getareas,
      handlelargeArea,
      handleAreas,
      handleControls,
      handleRelays
    };
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 10px;
}
</style>
