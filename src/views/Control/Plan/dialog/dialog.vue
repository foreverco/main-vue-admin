<template>
  <div>
    <el-dialog
      :title="data.dialogTitleName"
      :visible.sync="data.dialog_stock_flag"
      @close="closeDialog"
      @opened="openDialog"
    >
      <el-form :model="data.form" ref="addSensorForm" :rules="formRules">
        <el-card class="sbsub" v-if="!data.form.sensorid">
          <el-form-item label="">
            <RelaysPicker
              :relaysData.sync="data.relaysData"
              :dialogShow="data.dialog_stock_flag"
            ></RelaysPicker>
            <!-- {{ data.relaysData }} -->
          </el-form-item>
          <el-row>
            <el-button
              type="success"
              size="mini"
              :disabled="data.relaysData.relaysValue ? false : true"
              @click="getsensorMsg"
              >{{
                data.relaysData.relaysValue ? "查询设备ID" : "选择继电器"
              }}</el-button
            >
          </el-row>
        </el-card>
        <el-card>
          <el-row>
            <el-col :span="11">
              <el-form-item label="设备名称">
                <el-input
                  v-model="data.sbname"
                  placeholder="设备名称"
                  :disabled="true"
                  autocomplete="off"
                  style="width:60%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="设备编号">
                <el-input
                  v-model="data.sbno"
                  placeholder="设备编号"
                  :disabled="true"
                  autocomplete="off"
                  style="width:60%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="打开时间" prop="settingBeginTime">
                <el-date-picker
                  v-model="data.form.settingBeginTime"
                  type="datetime"
                  placeholder="选择打开时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width:80%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="关闭时间" prop="settingEndTime">
                <el-date-picker
                  v-model="data.form.settingEndTime"
                  type="datetime"
                  placeholder="选择关闭时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width:80%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="mini" @click="submit('addSensorForm')"
          >确 定</el-button
        >
      </div>
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
import SelectVue from "@/components/Select";
import RelaysPicker from "@/components/RelaysPicker";
import { validatePhone } from "@/utils/validate";
import { addsensor, placeSelect, reqcollectSelect } from "@/api/configCenter";
import { reqRelaysMsg } from "@/api/common";
import { addplan, editplan } from "@/api/control";

export default {
  name: "dialogStockPlan",
  components: {
    RelaysPicker
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

  setup(props, { root, emit, refs }) {
    const formRules = {
      settingBeginTime: [
        { required: true, message: "请输入离线间隔时间", trigger: "blur" }
      ],
      settingEndTime: [
        { required: true, message: "请输入阈值超限间隔", trigger: "blur" }
      ]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "新增计划任务",
      // 传感器数据
      relaysData: {},
      // 弹框状态
      dialog_stock_flag: false,
      sbname: "",
      sbno: "",
      // 表单数据
      form: {
        // 设备ID
        // settingId: "",
        // 开时间
        settingBeginTime: "",
        settingEndTime: ""
      }
    });
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
          requestParams.settingId = data.relaysData.relaysValue;
          // requestParams.relayId = data.relaysData.relaysValue;
          // console.log(requestParams);
          let editData = props.editData;
          if (editData.relayId) {
            console.log("编辑");
            console.log(requestParams);
            editplan(requestParams).then(res => {
              root.$message({
                message: res.data.msg,
                type: "success"
              });
              close();
              emit("refresTaleData");
            });
          } else {
            console.log("新增");
            addplan(requestParams).then(res => {
              root.$message({
                message: res.data.msg,
                type: "success"
              });
              close();
              emit("refresTaleData");
            });
          }
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
      emit("update:flag", false);
      // data.form.SENSORID = "";
      // for (let key in data.relaysData) {
      //   data.relaysData[key] = "";
      // }
      data.form = {};
      data.relaysData.largeAreaValue = "";
      data.relaysData.areasValue = "";
      data.relaysData.controlsValue = "";
      data.relaysData.relaysValue = "";

      data.relaysData.largeareaName = "";
      data.relaysData.areaName = "";
      data.relaysData.controlsName = "";
      data.relaysData.relaysName = "";
    };
    const closeDialog = () => {
      close();
    };
    // 打开弹窗
    const openDialog = () => {
      // console.log(data.form);
      // 初始值处理
      console.log(props.editData);
      let editData = props.editData;
      if (editData.relayId) {
        data.dialogTitleName = "编辑计划任务";
        data.form = editData;
        // data.relaysData.largeAreaValue = editData.regionId;
        // data.relaysData.areasValue = editData.areaId;
        // data.relaysData.controlsValue = editData.collectStationId;
        data.relaysData.relaysValue = editData.relayId;

        data.relaysData.largeareaName = editData.pareaName;
        data.relaysData.areaName = editData.areaName;
        data.relaysData.controlsName = editData.stationName;
        data.relaysData.relaysName = editData.relayName;
      }
      // data.form.areaId = props.editData.areaId;
      // data.form.collectStationId = props.editData.collectStationId;
      // data.form.type = props.editData.type;
    };

    // 获取继电器详情
    const getsensorMsg = () => {
      reqRelaysMsg(data.relaysData.relaysValue).then(res => {
        console.log(res);
        let baseSensorMsg = res.data.data;
        data.sbname = baseSensorMsg.name;
        data.sbno = baseSensorMsg.no;
      });
    };

    return {
      formRules,
      data,
      /* methods */
      close,
      openDialog,
      submit,
      closeDialog,
      getsensorMsg
      // getplaceSel,
      // collectSelect
    };
  }
};
</script>
<style lang="scss">
.el-dialog .sbsub .el-form-item__label {
  // border: 1px solid red !important;
  width: 70px;
}
.sbsub .el-card__body {
  padding: 0 20px;
}
.el-card.sbsub {
  margin-bottom: 10px;
}
</style>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.el-row {
  margin: 20px 0;
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
.sb_status {
  // border: 1px solid blue;
  display: flex;
  align-items: center;
}
</style>
