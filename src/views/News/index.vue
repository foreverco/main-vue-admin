<template>
  <div>
    <el-row>
      <video
        id="my-video"
        class="video-js"
        controls
        preload="auto"
        width="640"
        height="264"
        poster="MY_VIDEO_POSTER.jpg"
        data-setup="{}"
      >
        <source
          src="http://192.168.1.163:6011/34020000002000000003"
          type="video/ogg"
        />
      </video>
      <!-- <video
        id="my-video"
        class="video-js"
        controls
        preload="auto"
        width="640"
        height="264"
        poster="MY_VIDEO_POSTER.jpg"
        data-setup="{}"
      >
        <source
          src="http://192.168.1.163:6011/34020000002000000003"
          type="video/ogg"
        />
      </video> -->
    </el-row>
  </div>
</template>
<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch
} from "@vue/composition-api";

export default {
  name: "stock",
  setup(props, { root }) {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.label-wrap {
  &.category {
    @include babelDom(left, 70, 40);
  }
  &.date {
    @include babelDom(left, 70, 40);
  }
  &.had_per {
    @include babelDom(left, 50, 40);
  }
  &.user_per {
    @include babelDom(left, 50, 40);
  }
}
// .el-table {
//   // border: 1px solid red;
//   // height: 75vh;
//   // overflow: auto;
//   td {
//     text-align: center !important;
//     color: red;
//   }
// }
// .el-table td,
// .el-table th {
//   text-align: center !important;
// }
</style>
