<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mainBody"
};
</script>
<style lang="scss" scoped>
@import "../../../styles/main.scss";
#main-wrap {
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
  height: 98%;
  // padding: 30px 30px 0 0;
  border: 1px solid red;
  box-sizing: border-box;
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
