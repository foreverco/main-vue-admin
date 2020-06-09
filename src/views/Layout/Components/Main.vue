<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <div class="mainHeader">
          <div class="header-icon pull-left" @click="colspseState">
            <svg-icon iconClass="menu" className="menu"></svg-icon>
          </div>
          <breadcrumb class="breadcrumb-container" />
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import Breadcrumb from "./Test";
export default {
  name: "mainBody",
  components: {
    Breadcrumb
  },
  setup(props, { root }) {
    const colspseState = () => {
      root.$store.commit("app/SET_ISCOLLAPSE");
    };
    return {
      colspseState
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/main.scss";
#main-wrap {
  // height: 100%;
  // height: 100%;
  height: 100vh;
  // position: fixed;
  // top: 65px;
  // left: $navMenuWidth;
  // bottom: 0;
  // right: 0;
  // border: 10px solid #f7f7f7;
  // border-bottom: 0;
  // // background: #f7f7f7;
  // box-sizing: border-box;
  // background: red;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 10;
  // padding-left: $navMenuWidth + 10;
  padding-right: 10px;
  box-sizing: border-box;
  background: #f7f7f7;
  @include webkit(transition, all 0.3s ease 0s);
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  width: 98%;
  height: 99%;
  // padding: 30px 30px 0 0;
  // border: 1px solid red;
  box-sizing: border-box;
  .mainHeader {
    // border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    svg {
      margin-bottom: -3px;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.open {
  .main-content {
    padding-left: $navMenuWidth;
  }
}
.close {
  .main-content {
    padding-left: $navMenuWidthmini;
  }
}
</style>
