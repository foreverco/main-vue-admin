<template>
  <div id="layout" :class="menuStatus ? 'close' : 'open'">
    <LayoutHeader class="headerClass" />
    <LayoutNav />
    <LayoutMain />
  </div>
</template>
<script>
import LayoutNav from "./Components/Nav";
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import { computed } from "@vue/composition-api";
export default {
  name: "Layout",
  components: {
    LayoutNav,
    LayoutHeader,
    LayoutMain
  },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStatus
    };
  }
};
</script>
<style lang="scss" scoped>
.headerClass {
  position: fixed;
  z-index: 1001;
}
</style>
