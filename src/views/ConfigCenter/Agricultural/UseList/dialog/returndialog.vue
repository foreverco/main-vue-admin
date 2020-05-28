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
            <el-form-item label="农具名称: ">
              <el-input
                v-model="editData.name"
                :disabled="true"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="农具编号: ">
              <el-input
                v-model="editData.no"
                :disabled="true"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="归还人: " prop="returnee">
              <el-input
                v-model="data.form.returnee"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="归还时间: " :offset="1" prop="returnTime">
              <el-date-picker
                v-model="data.form.returnTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width:60%"
              >
              </el-date-picker>
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
import { remand } from "@/api/configCenter";
import { validatePhone } from "@/utils/validate";
export default {
  name: "dialogStock",
  components: {
    // SelectVue
  },
  props: {
    borrowflag: {
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
      returnTime: [
        { required: true, message: "请输入领用时间", trigger: "blur" }
      ],
      returnee: [{ required: true, message: "请输入领用人", trigger: "blur" }]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "归还农机农具",
      // 弹框状态
      dialog_stock_flag: false,
      // 表单数据
      form: {
        returnee: "",
        returnTime: "",
        id: ""
      }
    });
    watch(
      () => props.borrowflag,
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
          remand(requestParams).then(res => {
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
      emit("update:borrowflag", false);
      data.form = {};
    };
    const closeDialog = () => {
      close();
    };
    // 打开弹窗
    const openDialog = () => {
      // 初始值处理
      let editData = props.editData;
      console.log(editData);
      console.log(editData.id);
      data.form.id = editData.id;
      // if (editData.id) {
      //   data.form = editData;
      //   data.selectData = data.form.status;
      // }
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
</style>
