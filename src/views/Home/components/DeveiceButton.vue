<template>
  <ul class="deveice_button">
    <li>
      <i class="iconfont iconkongqiwendu"></i>
      <span>空气温度</span>
    </li>
    <li>
      <i class="iconfont iconkongqishidu"></i>
      <span>空气湿度</span>
    </li>
    <li>
      <i class="iconfont iconturangwendu"></i>
      <span>土壤温度</span>
    </li>
    <li>
      <i class="iconfont iconturangshidu"></i>
      <span>土壤湿度</span>
    </li>
    <li>
      <i class="iconfont iconguangzhaoqiangdu"></i>
      <span>光照强度</span>
    </li>
    <li>
      <i class="iconfont iconturanghuanjing"></i>
      <span>CO2浓度</span>
    </li>
    <li>
      <i class="iconfont iconturanghuanjing"></i>
      <span>CO2浓度</span>
    </li>
    <li>
      <i class="iconfont iconjiangshuiliang"></i>
      <span>降水量</span>
    </li>
    <li>
      <i class="iconfont iconfengsu1"></i>
      <span>风速</span>
    </li>
  </ul>
</template>

<script></script>

<style lang="scss" scoped>
@import "@/styles/reset.scss";
.deveice_button {
  border: 1px solid red;
  position: absolute;
  top: 2vh;
  left: 7.5vw;
  font-size: 12px;
  display: flex;
  width: 35vw;
}
.deveice_button li {
  border: 1px solid green;
  flex: 1;
}
</style>
