<template>
  <el-select v-model="data.selectValue" placeholder="请选择">
    <el-option
      v-for="item in data.option"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "Select",
  setup(props, { root }) {
    const data = reactive({
      selectValue: "name",
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" }
      ]
    });
    return {
      data
    };
  }
};
</script>
<style lang="scss"></style>
