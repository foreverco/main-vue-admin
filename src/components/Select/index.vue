<template>
  <el-select v-model="data.selectValue" placeholder="请选择" @change="select">
    <el-option
      v-for="item in data.initOption"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
import { reactive, onMounted, watch } from "@vue/composition-api";
export default {
  name: "Select",
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    selectData: {
      type: String,
      default: () => ""
    }
  },
  setup(props, { root, emit }) {
    // console.log(props.config);
    const data = reactive({
      selectValue: "",
      initOption: []
      // option: [
      //   { value: "name", label: "姓名" },
      //   { value: "phone", label: "手机号" },
      //   { value: "email", label: "邮箱" },
      //   { value: "one", label: "区域一" },
      //   { value: "two", label: "区域二" },
      //   { value: "three", label: "区域三" },
      //   { value: "caiji1", label: "采集一" },
      //   { value: "caiji2", label: "采集二" },
      //   { value: "caiji3", label: "采集三" },
      //   { value: "shebei1", label: "风向" },
      //   { value: "shebei2", label: "温度" },
      //   { value: "shebei3", label: "湿度" },
      //   { value: "809cd9ee6156bf6f1efc4b2515c93bc7", label: "区域一" },
      //   { value: "1", label: "区域二" }
      // ]
    });
    /* 初始化下拉选项 */
    const initOption = () => {
      data.initOption = props.config.init;
      // let optionArr = [];
      // if (initData.length === 0) {
      //   return false;
      // }
      // initData.forEach(item => {
      //   let arr = data.option.filter(elem => elem.value === item);
      //   if (arr.length > 0) {
      //     optionArr.push(arr[0]);
      //   }
      //   console.log(optionArr);
      // });
      // if (optionArr.length === 0) {
      //   return false;
      // }
      // 初始化赋值
      // data.initOption = optionArr;
      // 初始化搜索类型
      // data.selectValue = data.initOption[0].value;
      data.selectValue = props.selectData;
      // console.log(data.selectValue);

      // props.selectData = optionArr[0].value;
      // emit("update:selectData", optionArr[0].value);
      // console.log(optionArr[0].value);
      // console.log(props.selectData);
    };
    const select = val => {
      // console.log(val);
      // let filterData = data.option.filter(item => item.value == val)[0];
      let filterData = val;
      // console.log(filterData);
      emit("update:selectData", filterData);
      // console.log(data.selectValue);
    };
    onMounted(() => {
      initOption();
    });
    watch(
      () => props.selectData,
      (newValue, oldValue) => (data.selectValue = newValue)
    );
    return {
      data,
      select
    };
  }
};
</script>
<style lang="scss"></style>

<!--
组件文件位置: 
    src => components => Select => index.vue
组件引用方式: 
    import SelectVue from "@/components/Select";
    <selectVue :config="data.configOption"></selectVue>
参数配置:
  configOption: {
    init: ["name", "phone"]
  }
configOption:  
    类型:Object
init: 类型:Array
    可配置数据: ["name","phone","email"]
 
-->
