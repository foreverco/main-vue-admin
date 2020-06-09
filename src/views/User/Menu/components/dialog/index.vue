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
          <el-col :span="23">
            <el-form-item label="菜单名称: ">
              <el-input
                v-model="data.formEditData.menuName"
                :disabled="true"
                autocomplete="off"
                style="width:80%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item label="功能标识: " prop="actionCode">
              <el-input
                v-model="data.form.actionCode"
                autocomplete="off"
                style="width:80%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item label="功能名称: " prop="actionName">
              <el-input
                v-model="data.form.actionName"
                autocomplete="off"
                style="width:80%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="状态">
              <el-switch
                v-model="data.form.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item label="描述: " prop="actionDesc">
              <el-input
                v-model="data.form.actionDesc"
                autocomplete="off"
                type="textarea"
                style="width:80%"
              ></el-input>
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
import { addaction } from "@/api/user";
import { validatePhone } from "@/utils/validate";
export default {
  name: "dialogStock",
  components: {},
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
      actionCode: [
        { required: true, message: "请输入功能标识", trigger: "blur" }
      ],
      actionName: [
        { required: true, message: "请输入功能名称", trigger: "blur" }
      ],
      actionDesc: [
        { required: true, message: "请输入功能描述", trigger: "blur" }
      ]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "",
      // 弹框状态
      dialog_stock_flag: false,
      // 表单数据
      // 初始化数据
      formEditData: {},
      form: {
        actionCode: "",
        actionName: "",
        actionDesc: "",
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
          requestParams.menuId = data.formEditData.id;
          console.log(requestParams);
          addaction(requestParams).then(res => {
            root.$message({
              message: res.data.msg,
              type: "success"
            });
            close();
            emit("refresTaleData");
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
      emit("update:flag", false);
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
      data.formEditData = props.editData;
      data.dialogTitleName = "添加功能 - " + editData.menuName;
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
