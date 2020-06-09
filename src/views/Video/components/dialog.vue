<template>
  <div>
    <el-dialog
      :title="data.dialogTitleName"
      :visible.sync="data.dialog_stock_flag"
      @close="closeDialog"
      @opened="openDialog"
    >
      <!-- <el-card> -->
      <el-form :model="data.form" ref="addSensorForm" :rules="formRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="摄像头名: " prop="name">
              <el-input
                v-model="data.form.name"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备编码: " prop="videoCode">
              <el-input
                v-model="data.form.videoCode"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备类型: ">
              <SelectVue
                :config="data.sbTypeSelect"
                style="width:60%"
                :selectData.sync="data.form.videoType"
              ></SelectVue>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备坐标: ">
              <el-button @click="openMap">打开地图</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="经度: " prop="longitude">
              <el-input
                v-model="data.form.longitude"
                autocomplete="off"
                :disabled="true"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度: " prop="latitude">
              <el-input
                v-model="data.form.latitude"
                autocomplete="off"
                :disabled="true"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备状态：">
              <el-switch
                v-model="data.form.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="在线"
                inactive-text="离线"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- </el-card> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="mini" @click="submit('addSensorForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-drawer
      title="我是标题"
      :visible.sync="data.drawer"
      :with-header="false"
      @opened="draweropened"
    >
      <Map ref="map33" :videoPiont.sync="data.videoPiont"></Map>
      <div class="drawerBtnBox">
        <el-button type="success" @click="getpoint">确定</el-button>
      </div>
    </el-drawer>
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
import SelectVue from "@/components/Select";
import Map from "@/components/mapView/MapInfo";
export default {
  name: "dialogStock",
  components: {
    SelectVue,
    Map
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
    // 验证手机号
    let validatecontactNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (validatePhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const formRules = {
      videoCode: [
        { required: true, message: "请输入功能标识", trigger: "blur" }
      ],
      name: [{ required: true, message: "请输入摄像头名称", trigger: "blur" }],
      actionDesc: [
        { required: true, message: "请输入功能描述", trigger: "blur" }
      ]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "修改视频设备信息",
      // 弹框状态
      dialog_stock_flag: false,
      drawer: false,
      videoPiont: [],
      // 表单数据
      sbTypeSelect: {
        init: [
          { value: "1", label: "枪击型" },
          { value: "2", label: "鹰眼型" }
          // { value: "3", label: "其他类型" }
        ]
      },
      // 初始化数据
      formEditData: {},
      form: {
        name: "",
        videoCode: "",
        latitude: "",
        longitude: "",
        videoType: "",
        status: 1
      }
    });
    watch(
      () => props.flag,
      (newVale, oldvalue) => (data.dialog_stock_flag = newVale)
    );
    watch(
      () => props.flag,
      (newVale, oldvalue) => (data.dialog_stock_flag = newVale)
    );
    /* methods */
    // 清空表数据
    const resetForm = () => {
      refs.addSensorForm.resetFields();
    };
    const submit = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let requestParams = JSON.parse(JSON.stringify(data.form));
          console.log(requestParams);
          addVideoList(requestParams).then(res => {
            root.$message({
              message: res.data.msg,
              type: "success"
            });
            close();
            emit("videomsg");
          });
          // .catch(err => {
          //   console.log(err);
          // });
        } else {
          root.$message({
            message: "请填写必填项",
            type: "error"
          });
          return false;
        }
      });
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
      console.log(data.form);
      // 初始值处理
      let editData = props.editData;
      console.log(editData);
      data.form.name = editData.label;
      data.form.videoCode = editData.videoCode;
      data.form.latitude = editData.latitude;
      data.form.longitude = editData.longitude;
      data.form.status = editData.status;
      data.form.videoType = editData.videoType;
    };
    const openMap = () => {
      console.log(123);
      data.drawer = true;
    };
    const draweropened = () => {};
    const getpoint = () => {
      data.form.latitude = data.videoPiont.latitude;
      data.form.longitude = data.videoPiont.longitude;
      data.drawer = false;
    };
    return {
      formRules,
      data,
      /* methods */
      close,
      openDialog,
      submit,
      closeDialog,
      openMap,
      draweropened,
      getpoint
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
.sb_map {
  // .el-form-item__content {
  // border: 1px solid red;
  text-align: left;
  button {
    margin-left: 12px;
  }
  // }
}
.sb_switchStatus {
  // border: 1px solid blue;
  display: flex;
  align-items: center;
}
</style>
