<template>
  <header id="headerBox">
    <span class="module_title">{{ moduleTitle }}</span>
    <slot name="right" class="right"></slot>
  </header>
</template>

<script>
import { ref } from "@vue/composition-api";
export default {
  name: "headerBox",
  props: {
    moduleTitle: String
  },
  setup(props) {
    const test = ref("test");
    const testMethod = () => {
      console.log(222);
    };
    return {
      test,
      testMethod
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
#headerBox {
  // border: 1px solid red;
  height: $titleHeight;
  border-left: $maincolor 0.16vw solid;
}
.module_title {
  font-size: $titleFont;
  line-height: $titleFont;
  margin: 2px 0;
  float: left;
  padding-left: 7px;
  font-weight: bold;
}
</style>
