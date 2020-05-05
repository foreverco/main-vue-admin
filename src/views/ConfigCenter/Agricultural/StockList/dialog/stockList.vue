<template>
  <div>
    <el-dialog
      title="新增农机农具"
      :visible.sync="dialog_stock_flag"
      @close="close"
    >
      <el-form :model="form">
        <el-row>
          <el-col :span="11">
            <div class="label-wrap sb_name">
              <label for="">设备名称: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.sbname"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="label-wrap sb_name">
              <label for="">设备编号: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.sbnumber"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <div class="label-wrap sb_name">
              <label for="">设备编号: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.sbtype"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div class="label-wrap sb_name">
              <label for="">责任人: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.hadper"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="label-wrap sb_name">
              <label for="">联系方式: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.hadphone"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div class="label-wrap sb_name">
              <label for="">使用人: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.useper"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="label-wrap sb_name">
              <label for="">联系方式: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.usephone"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <div class="label-wrap sb_usestatus">
              <label for="">是否领用: </label>
              <div class="warp-content">
                <el-switch
                  style="display: block"
                  v-model="form.usestatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="是"
                  inactive-text="否"
                >
                </el-switch>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="close">取 消</el-button> -->
        <el-button type="success" size="mini" @click="close">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, watch, computed } from "@vue/composition-api";
export default {
  name: "dialogStock",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { root, emit }) {
    /* data数据 */
    // 弹框状态
    const dialog_stock_flag = ref(false);
    // 表单数据
    const form = reactive({
      sbname: "",
      sbnumber: "",
      sbtype: "",
      hadper: "",
      hadphone: "",
      useper: "",
      usephone: "",
      usestatus: ""
    });
    /* watch */

    watch(() => {
      console.log(123);
      dialog_stock_flag.value = props.flag;
    });
    /* methods */
    const close = () => {
      dialog_stock_flag.value = false;
      emit("update:flag", false);
      // this.$emit("close", this.dialog_stock_flag);
    };
    return {
      /* ref */
      dialog_stock_flag,
      /* reactive */
      form,
      // propsFlag,
      /* methods */
      close
    };
  }
  // data() {
  //   return {
  //     dialog_stock_flag: true,
  //     form: {
  //       sbname: "",
  //       sbnumber: "",
  //       sbtype: "",
  //       hadper: "",
  //       hadphone: "",
  //       useper: "",
  //       usephone: "",
  //       usestatus: ""
  //     },
  //   };
  // },
  // props: {
  //   flag: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // watch: {
  //   flag: {
  //     handler(newValue, oldValue) {
  //       this.dialog_stock_flag = newValue;
  //       console.log(newValue);
  //     }
  //   }
  // },
  // methods: {
  //   close() {
  //     this.dialog_stock_flag = false;
  //     this.$emit("update:flag", false);
  //     // this.$emit("close", this.dialog_stock_flag);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.el-row {
  margin: 20px 0;
}
.label-wrap {
  &.sb_name {
    @include babelDom(left, 70, 40);
  }
  &.sb_usestatus {
    @include babelDom(left, 70, 20);
  }
}
</style>
