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
            <SensorPicker
              :sensorData.sync="data.sensorData"
              :dialogShow="data.dialog_stock_flag"
            ></SensorPicker>
          </el-form-item>
          <el-row>
            <el-button
              type="success"
              size="mini"
              :disabled="data.sensorData.sensorsValue ? false : true"
              @click="getsensorMsg"
              >{{
                data.sensorData.sensorsValue ? "查询设备ID" : "选择传感器"
              }}</el-button
            >
          </el-row>
        </el-card>
        <el-row>
          <el-card>
            <el-form-item label="联动设备">
              <el-col
                :span="20"
                v-if="data.checkList.length === 0"
                style="border:1px solid #cccccc50;border-radius:5px;"
                >请确认传感器信息</el-col
              >
              <template v-else>
                <el-col
                  :span="5"
                  v-for="(item, index) in data.checkList"
                  :key="index"
                >
                  <el-checkbox
                    :label="item.name"
                    v-model="data.checkList[index].ischeck"
                    @change="changeCheckList"
                  ></el-checkbox>
                </el-col>
              </template>
            </el-form-item>
          </el-card>
        </el-row>
        <el-card>
          <el-row>
            <el-col :span="11">
              <el-form-item label="预警条件">
                <SelectVue
                  :config="data.termSelect"
                  style="width:60%"
                  :selectData.sync="data.form.settingTerm"
                ></SelectVue>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="预警值" prop="settingThreshold">
                <el-input
                  v-model="data.form.settingThreshold"
                  placeholder="请输入预警值"
                  style="width:60%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="开关设备">
                <el-switch
                  v-model="data.form.settingOnoff"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="1"
                  nactive-value="0"
                >
                </el-switch>
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
import SensorPicker from "@/components/SensorPicker";
import { validatePhone } from "@/utils/validate";
import { addsensor, placeSelect, reqcollectSelect } from "@/api/configCenter";
import { reqRelaysMsg, sengetrelay } from "@/api/common";
import { addsimulate, editsimulate } from "@/api/control";

export default {
  name: "dialogStockRelay",
  components: {
    SensorPicker,
    SelectVue
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
      settingThreshold: [
        { required: true, message: "请输入预警值", trigger: "blur" }
      ],
      settingEndTime: [
        { required: true, message: "请输入阈值超限间隔", trigger: "blur" }
      ]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "新增模拟量任务",
      // 传感器数据
      sensorData: {},
      // 阈值条件下拉
      termSelect: {
        init: [
          {
            label: "大于",
            value: "0"
          },
          {
            label: "小于",
            value: "1"
          }
        ]
      },
      // 弹框状态
      dialog_stock_flag: false,
      checkList: [],
      // 表单数据
      form: {
        // 设备ID
        // settingId: "",
        settingTerm: "",
        // 开时间
        settingOnoff: "1",
        //预警值
        settingThreshold: "",
        // 继电器id列表
        relayList: []
      }
    });
    // watch(
    //   data.checkList,
    //   // () => data.sensorData.largeAreaValue,
    //   (newval, oldval) => {
    //     console.log(newval);
    //   }
    // );
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
          console.log(data.form);
          requestParams.settingId = data.sensorData.sensorsValue;
          let editData = props.editData;
          if (editData.id) {
            requestParams.settingId = editData.sensorId;
            console.log("编辑");
            console.log(requestParams);
            editsimulate(requestParams).then(res => {
              root.$message({
                message: res.data.msg,
                type: "success"
              });
              close();
              emit("refresTaleData");
            });
          } else {
            console.log("新增");
            addsimulate(requestParams).then(res => {
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
      data.dialogTitleName = "新增模拟量任务";
      data.form = {};
      data.sensorData.largeAreaValue = "";
      data.sensorData.areasValue = "";
      data.sensorData.statitionsValue = "";
      data.sensorData.sensorsValue = "";

      data.sensorData.largeareaName = "";
      data.sensorData.areaName = "";
      data.sensorData.statitionsName = "";
      data.sensorData.sensorsName = "";
    };
    const closeDialog = () => {
      close();
    };
    // 打开弹窗
    const openDialog = () => {
      // 初始值处理
      console.log(props.editData);
      let editData = "";
      editData = props.editData;
      if (editData.id) {
        data.dialogTitleName = "编辑模拟量任务";
        data.form.settingTerm = editData.settingTerm;
        data.form.settingOnoff = editData.settingOnoff;
        data.form.settingThreshold = editData.settingThreshold;
        // data.form.settingId = editData.sensorId;
        editData.relayList.forEach(item => {
          let obj = {};
          obj.settingRelayID = item.settingRelayID;
          obj.settingRelayName = item.settingRelayName;
          data.form.relayList.push(obj);
        });

        data.sensorData.sensorsValue = editData.relayId;

        data.sensorData.largeareaName = editData.pareaName;
        data.sensorData.areaName = editData.areaName;
        data.sensorData.statitionsName = editData.stationName;
        data.sensorData.sensorsName = editData.sensorsName;
        console.log(editData);
      }
    };
    // 获取继电器多选列表
    const getsensorMsg = () => {
      let senId = {};
      senId.sensorId = data.sensorData.sensorsValue;
      console.log(senId);
      sengetrelay(senId).then(res => {
        console.log(res);
        let checkarr = [];
        let checkobj = {};
        checkarr = res.data.data;
        checkarr.forEach(item => {
          checkobj.name = item.name;
          checkobj.value = item.id;
          checkobj.ischeck = false;
          data.checkList.push(checkobj);
        });
      });
    };
    const changeCheckList = () => {
      data.form.relayList = [];
      data.checkList.forEach(item => {
        console.log(item);
        let obj = {};
        if (item.ischeck) {
          obj.settingRelayID = item.value;
          obj.settingRelayName = item.name;
          data.form.relayList.push(obj);
        }
      });
      console.log(data.form.relayList);
    };
    return {
      formRules,
      data,
      close,
      openDialog,
      submit,
      closeDialog,
      getsensorMsg,
      changeCheckList
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
.sb_status {
  // border: 1px solid blue;
  display: flex;
  align-items: center;
}
</style>
