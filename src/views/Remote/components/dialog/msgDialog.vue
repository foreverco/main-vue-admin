<template>
  <div>
    <el-dialog
      :title="data.dialogTitleName"
      :visible.sync="data.dialog_stock_flag"
      @close="closeDialog"
      @opened="openDialog"
    >
      <el-row>
        <el-col :span="11">
          <el-row class="videoBox">
            <el-col :span="24">
              <Video></Video>
            </el-col>
          </el-row>
          <el-row class="picBox">
            <el-col :span="12">
              <img src="../../../../assets/8-jidi-tu2.png" alt="" />
            </el-col>
            <el-col :span="12">
              <img src="../../../../assets/8-jidi-tu3.png" alt="" />
            </el-col>
            <el-col :span="12">
              <img src="../../../../assets/8-jidi-tu4.png" alt="" />
            </el-col>
            <el-col :span="12">
              <img src="../../../../assets/8-jidi-tu2.png" alt="" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form>
            <el-row>
              <el-col :span="24">
                <div class="label-wrap sb_name">
                  <label for="" class="iconlabel">
                    问题描述
                  </label>
                  <div class="warp-content question">
                    <span>{{ editData.question }}</span>
                  </div>
                </div>
                <!-- <el-form-item label="问题描述: " prop="name">
                  <el-input
                    v-model="editData.question"
                    :disabled="true"
                    type="textarea"
                    :rows="2"
                    autocomplete="off"
                    style="width:60%"
                  ></el-input>
                </el-form-item> -->
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="label-wrap sb_name">
                  <label for="" class="iconlabel">
                    对话框
                  </label>
                  <div class="warp-content dialogueList">
                    <div
                      v-for="(item, index) in data.dialogueList"
                      :key="index"
                    >
                      <span>专家:</span>
                      <span>{{ item.commentContext }}</span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <div class="dialog-footer">
            <el-button type="success" size="mini" @click="closeDialog"
              >确 定</el-button
            >
          </div>
        </el-col>
      </el-row>
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
import { addVideoList } from "@/api/video";
import { validatePhone } from "@/utils/validate";
import { reqExpertPage } from "@/api/remote";
import Video from "@/components/common/video";
export default {
  name: "msgDialog",
  components: {
    Video
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { root, emit, refs, parent }) {
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "详情信息",
      // 弹框状态
      dialog_stock_flag: false,
      // 初始化数据
      formEditData: {},
      form: {
        question: ""
      },
      dialogueList: []
    });
    watch(
      () => props.flag,
      (newVale, oldvalue) => (data.dialog_stock_flag = newVale)
    );
    /* methods */
    // 清空表数据
    const resetForm = () => {
      // refs.addSensorForm.resetFields();
    };
    const close = () => {
      data.dialog_stock_flag = false;
      resetForm();
      // emit("videomsg");
      emit("update:flag", false);

      // videomsg();
    };
    const closeDialog = () => {
      close();
    };
    // 打开弹窗
    const openDialog = () => {
      let editData = props.editData;
      reqExpertPage({ id: editData.id }).then(res => {
        console.log(res);
        data.dialogueList = res.data.data;
      });
      console.log(data.form);
      // 初始值处理
      console.log(editData);
      data.form.name = editData.label;
    };
    return {
      data,
      /* methods */
      close,
      openDialog,
      closeDialog
    };
  }
};
</script>
<style lang="scss">
.el-drawer {
  .drawerBtnBox {
    position: absolute;
    width: 100%;
    height: 15vh;
    background: #00000010;
    .el-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  // position: relative;
  // height: 80vh;
  // #map {
  //   position: absolute;
  // }
}
</style>
<style lang="scss" scoped>
@import "@/styles/config.scss";
// .el-select {
//   width: 72% !important;
//   .el-dialog .el-form-item__label {
//     width: 68px;
//   }
// }
.el-row {
  margin: 10px 0;
}
.label-wrap {
  &.sb_name {
    @include babelDom(left, 65, 35);
  }
}
.warp-content {
  width: 70%;
  border: 1px solid #cccccc60;
  border-radius: 5px;
  padding: 5px;
  &.dialogueList {
    height: 30vh;
    // overflow: auto;
    > div {
      text-align: left;
      span {
        display: inline-block;
        width: 75%;
        float: right;
        &:first-child {
          width: 20%;
          float: left;
        }
      }
    }
  }
  &.question {
    height: 10vh;
  }
}
.dialog-footer {
  position: absolute;
  bottom: 0;
  right: 0;
}
.picBox {
  .el-col {
    // border: 1px solid red;
    img {
      width: 90%;
    }
  }
}
</style>
