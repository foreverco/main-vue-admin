<template>
  <ul class="equi_msg">
    <li class="guide_item">
      <div>
        <span>
          <i class="iconfont iconshidu"></i>
          13°C
        </span>
        <span>空气湿度</span>
      </div>
    </li>
    <li class="guide_item">
      <div>
        <span>
          <i class="iconfont iconshidu"></i>
          13°C
        </span>
        <span>空气湿度</span>
      </div>
    </li>
    <li class="guide_item">
      <div>
        <span>
          <i class="iconfont iconshidu"></i>
          13°C
        </span>
        <span>空气湿度</span>
      </div>
    </li>
    <li class="guide_item">
      <div>
        <span>
          <i class="iconfont iconshidu"></i>
          13°C
        </span>
        <span>空气湿度</span>
      </div>
    </li>
    <li class="guide_item">
      <div>
        <span>
          <i class="iconfont iconshidu"></i>
          13°C
        </span>
        <span>空气湿度</span>
      </div>
    </li>
    <li class="guide_item">
      <div>
        <span>
          <i class="iconfont iconshidu"></i>
          13°C
        </span>
        <span>空气湿度</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "footer_guide",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/reset.scss";
.equi_msg {
  z-index: 100;
  display: flex;
  height: 50px;
  justify-content: space-between;
  // border: 1px solid blue;
}

.guide_item {
  // border: 1px solid red;
  width: 15%;
  text-align: center;
  color: #000;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(131, 131, 131, 0.35);
  border-radius: 4px;
}
.guide_item > div {
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
}
.guide_item > div > span > i {
  color: #11966b;
  font-size: 1.5vh;
}
.guide_item > span {
  font-size: 0.75vw;
}
.guide_item > span:last-child {
  font-size: 1vh;
}
</style>
