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
            <el-form-item label="角色名称" prop="roleName">
              <el-input
                v-model="data.form.roleName"
                placeholder="角色名称"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="角色编码" prop="roleCode">
              <el-input
                v-model="data.form.roleCode"
                placeholder="角色编码"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="角色描述" prop="roleDesc">
              <el-input
                v-model="data.form.roleDesc"
                placeholder="角色描述"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="11" :offset="1">
            <el-form-item label="预警值" prop="alarmValue">
              <el-input
                v-model="data.form.alarmValue"
                placeholder="预警值"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="角色状态">
              <el-switch
                v-model="data.form.status"
                active-color="#3abf94"
                inactive-color="#cccccc"
                active-text="开启"
                inactive-text="关闭"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
              <!-- {{ data.form.status }} -->
            </el-form-item>
          </el-col>
        </el-row>
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
import { addRole } from "@/api/user";

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
      roleName: [{ required: true, message: "请输入角色名", trigger: "blur" }],
      roleCode: [
        { required: true, message: "请输入角色编码", trigger: "blur" }
      ],
      roleDesc: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "新增角色信息",
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
      roleName: "",
      sbno: "",
      // 表单数据
      form: {
        roleName: "",
        roleCode: "",
        roleDesc: "",
        // 告警短信
        status: 1
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
          addRole(requestParams).then(res => {
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
      data.form = {};
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
      console.log(editData);
      if (editData.id) {
        data.dialogTitleName = "编辑角色信息";
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
