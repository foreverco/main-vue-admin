<template>
  <div>
    <el-dialog
      :title="data.dialogTitleName"
      :visible.sync="data.dialog_stock_flag"
      @close="closeDialog"
      @opened="openDialog"
    >
      <el-form :model="data.form" ref="addSensorForm" :rules="formRules">
        <el-row>
          <el-col :span="11">
            <el-form-item label="姓名">
              <el-input
                v-model="data.name"
                placeholder="姓名"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="昵称">
              <el-input
                v-model="data.nickname"
                placeholder="昵称"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="邮件">
              <el-input
                v-model="data.mail"
                placeholder="邮件"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="手机号">
              <el-input
                v-model="data.mobile"
                placeholder="手机号"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="11">
            <el-form-item label="预警条件" prop="alarmTerm">
              <SelectVue
                style="width:60%"
                :config="data.termSelect"
                :selectData.sync="data.form.alarmTerm"
              ></SelectVue>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="预警值" prop="alarmValue">
              <el-input
                v-model="data.form.alarmValue"
                placeholder="预警值"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="账号" prop="account">
              <el-input
                v-model="data.form.account"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="data.form.password"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="11">
            <el-form-item label="告警短信" class="sb_status">
              <el-switch
                style="display: block;"
                v-model="data.form.alertMessage"
                active-color="#3abf94"
                inactive-color="#cccccc"
                active-text="开启"
                inactive-text="关闭"
                active-value="1"
                inactive-value="2"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="告警通知" class="sb_status">
              <el-switch
                style="display: block;"
                v-model="data.form.alertinForm"
                active-color="#3abf94"
                inactive-color="#cccccc"
                active-text="开启"
                inactive-text="关闭"
                active-value="1"
                inactive-value="2"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row> -->
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
import { validatePhone } from "@/utils/validate";
import { addsensor, placeSelect, reqcollectSelect } from "@/api/configCenter";
import { reqSensorsMsg } from "@/api/common";
import { addwarningConfig } from "@/api/warning";

export default {
  name: "dialogStock",
  components: {
    // SelectVue
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
      alarmTerm: [
        { required: true, message: "请选择预警条件", trigger: "change" }
      ],
      alarmValue: [
        { required: true, message: "请选择预警值", trigger: "change" }
      ],
      account: [{ required: true, message: "请输入账号时间", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码间隔", trigger: "blur" }]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "新增设备预警",
      // 传感器数据
      sensorData: {},
      // 弹框状态
      dialog_stock_flag: false,
      selectData: {},
      // 预警条件
      termSelect: {
        init: [
          { value: "1", label: "大于" },
          { value: "2", label: "小于" },
          { value: "3", label: "等于" }
        ]
      },
      name: "",
      nickname: "",
      // 表单数据
      form: {
        // 姓名
        name: "",
        // 昵称
        nickname: "",
        // 账号
        account: "",
        //密码
        password: "",
        // 邮件
        mail: "",
        //手机号
        mobile: ""
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
          requestParams.settingId = data.sensorData.sensorsValue;
          // console.log(requestParams);
          addwarningConfig(requestParams).then(res => {
            root.$message({
              message: res.data.msg,
              type: "success"
            });
            close();
            emit("refresTaleData");
          });
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
      data.form.SENSORID = "";
      for (let key in data.sensorData) {
        data.sensorData[key] = "";
      }
    };
    const closeDialog = () => {
      close();
    };
    // 打开弹窗
    const openDialog = () => {
      // 初始值处理
      console.log(props.editData);
      let editData = props.editData;
      if (editData.SENSORID) {
        data.dialogTitleName = "编辑设备预警";
        data.form = editData;
      }
    };
    return {
      formRules,
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
<style lang="scss" scoped>
@import "@/styles/config.scss";
.el-row {
  margin: 20px 0;
}
</style>
