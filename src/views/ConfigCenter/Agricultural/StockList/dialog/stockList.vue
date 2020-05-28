<template>
  <div>
    <el-dialog
      :title="data.dialogTitleName"
      :visible.sync="data.dialog_stock_flag"
      @close="closeDialog"
      @opened="openDialog"
    >
      <el-form :model="data.form" ref="addSensorForm" :rules="formRules">
        <!-- <el-row>
          <el-form-item prop="statitions">
            <RelaysPicker
              :relaysPickerLevel="['largeArea', 'areas', 'controls']"
              :relaysData.sync="data.relaysData"
            ></RelaysPicker>
          </el-form-item>
        </el-row> -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="农具名称: " prop="name">
              <el-input
                v-model="data.form.name"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="农具编号: " prop="no">
              <el-input
                v-model="data.form.no"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="设备型号: " prop="model">
              <el-input
                v-model="data.form.model"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="所在地: " prop="location">
              <el-input
                v-model="data.form.location"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="责任人: " prop="principalPerson">
              <el-input
                v-model="data.form.principalPerson"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="联系方式: " prop="contactNumber">
              <el-input
                v-model="data.form.contactNumber"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="11">
            <el-form-item label="设备点位: " class="sb_map">
              <el-button size="small" type="success">打开地图</el-button>
            </el-form-item>
          </el-col> -->
          <el-col :span="11">
            <el-form-item label="设备状态: ">
              <SelectVue
                style="width:60%"
                :config="data.configSelect"
                :selectData.sync="data.selectData"
              ></SelectVue>
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
import {
  addStock,
  placeSelect,
  reqcollectSelect,
  reqsbtypeSelect
} from "@/api/configCenter";
import { validatePhone } from "@/utils/validate";
export default {
  name: "dialogStock",
  components: {
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
      model: [{ required: true, message: "请输入农具型号", trigger: "blur" }],
      name: [{ required: true, message: "请输入农具名称", trigger: "blur" }],
      no: [{ required: true, message: "请输入农具编号", trigger: "blur" }],
      principalPerson: [
        { required: true, message: "请输入责任人", trigger: "blur" }
      ],
      contactNumber: [
        { required: true, validator: validatecontactNumber, trigger: "blur" }
      ],
      location: [
        { required: true, message: "请输入农具所在地", trigger: "blur" }
      ]
    };
    /* data数据 */
    const data = reactive({
      configSelect: {
        init: [
          { value: "0", label: "在库" },
          { value: "1", label: "使用中" },
          { value: "2", label: "维修中" },
          { value: "3", label: "预约中" }
        ]
      },
      selectData: "",
      // 弹框标题
      dialogTitleName: "新增农机农具",
      // 弹框状态
      dialog_stock_flag: false,
      // 表单数据
      form: {
        location: "",
        model: "",
        name: "",
        no: "",
        principalPerson: "",
        contactNumber: "",
        status: "1"
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
          requestParams.status = data.selectData;
          console.log(requestParams);
          addStock(requestParams).then(res => {
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
      data.dialogTitleName = "新增农机农具";
      data.form = {};
      data.selectData = "";
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
      if (editData.id) {
        data.dialogTitleName = "编辑农机农具";
        data.form = editData;
        data.selectData = data.form.status;
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
  margin: 10px 0;
}
</style>
