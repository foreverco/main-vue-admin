<template>
  <el-select v-model="data.selectValue" placeholder="请选择">
    <el-option
      v-for="item in data.initOption"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "Select",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    console.log(props.config);
    const data = reactive({
      selectValue: "",
      initOption: [],
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" }
      ]
    });
    /* 初始化下拉选项 */
    const initOption = () => {
      let initData = props.config.init;
      let optionArr = [];
      if (initData.length === 0) {
        return false;
      }
      initData.forEach(item => {
        let arr = data.option.filter(elem => elem.value === item);
        if (arr.length > 0) {
          optionArr.push(arr[0]);
        }
        console.log(optionArr);
      });
      if (optionArr.length === 0) {
        return false;
      }
      // 初始化赋值
      data.initOption = optionArr;
      // 初始化搜索类型
      data.selectValue = optionArr[0].value;
    };
    onMounted(() => {
      initOption();
    });
    return {
      data
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
