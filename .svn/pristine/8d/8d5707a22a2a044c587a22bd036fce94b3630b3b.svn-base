<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlint="iconName" :href="iconName"></use>
  </svg>
</template>
<script>
import { ref, computed } from "@vue/composition-api";
export default {
  name: "SvgIcon",
  // props: ["iconClass", "className"],
  props: {
    iconClass: {
      type: String,
      default: ""
      // required: true,
      // validator: value => {
      //   return value >= 0;
      // }
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    // console.log(props.iconClass);
    // console.log(props.className);
    const msg = ref("lvlvlv");
    /**
     * computed 监听属性变化 并计算属性
     */
    // const plusOne = computed(() => {
    //   return count.value + 1;
    // });
    // const plusOne = computed({
    //   get: () => count.value + 5
    //   // set: val => {}
    // });
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });

    return {
      msg,
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  // fill: #fff !important;

  &.font50 {
    font-size: 50px;
  }
}
</style>
