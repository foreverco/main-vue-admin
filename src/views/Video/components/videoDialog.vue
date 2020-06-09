<template>
  <div>
    <el-dialog
      :title="data.dialogTitleName"
      :visible.sync="data.dialog_stock_flag"
      @close="closeDialog"
      @opened="openDialog"
      id="mapdialog"
    >
      <Video></Video>
      {{ editDataVideo }}
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="success" size="mini" @click="submit('addSensorForm')"
          >确 定</el-button
        >
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
import {
  ref,
  reactive,
  watch,
  computed,
  onMounted
} from "@vue/composition-api";
import Video from "@/components/common/video";
// import Map from "@/components/mapView/MapInfo";
export default {
  name: "mapDialog",
  components: {
    Video
    // Map
  },
  props: {
    flagVideo: {
      type: Boolean,
      default: false
    },
    editDataVideo: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { root, emit, refs }) {
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "添加视频设备坐标",
      // 弹框状态
      dialog_stock_flag: false,
      modify: ""
    });
    watch(
      () => props.flagVideo,
      (newVale, oldvalue) => (data.dialog_stock_flag = newVale)
    );
    /* methods */
    // 清空表数据

    const submit = formName => {};
    const close = () => {
      data.dialog_stock_flag = false;
      emit("update:flagVideo", false);
    };
    const closeDialog = () => {
      close();
    };
    // 打开弹窗
    const openDialog = () => {
      console.log(data.form);
      // 初始值处理
      let editDataVideo = props.editDataVideo;
      console.log(editDataVideo);
    };
    return {
      data,
      /* methods */
      close,
      openDialog,
      submit,
      closeDialog
    };
  }
};
</script>
<style lang="scss">
#mapdialog #map {
  height: 85vh;
  width: 100%;
  position: relative;
  z-index: 100001 !important;
}
</style>
