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
          <el-form-item prop="statitions">
            <RelaysPicker
              :relaysPickerLevel="['largeArea', 'areas']"
              :relaysData.sync="data.relaysData"
              :dialogShow="data.dialog_stock_flag"
            ></RelaysPicker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="控制站名: " prop="name">
              <el-input
                v-model="data.form.name"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="编号: " prop="no">
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
          <el-col :span="11">
            <el-form-item label="厂家编号: " prop="originalId">
              <el-input
                v-model="data.form.originalId"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="11" :offset="1">
            <el-form-item label="传输方式: " prop="transferMethod">
              <el-input
                v-model="data.form.transferMethod"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="设备点位: " class="sb_map">
              <el-button size="small" type="success">打开地图</el-button>
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
import RelaysPicker from "../../../../components/RelaysPicker";
import {
  addControls,
  placeSelect,
  reqcollectSelect,
  reqsbtypeSelect
} from "../../../../api/configCenter";
import { validatePhone } from "@/utils/validate";
export default {
  name: "dialogStock",
  components: {
    // SelectVue,
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
      installTime: [
        { required: true, message: "请输入安装日期", trigger: "blur" }
      ],
      name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
      no: [{ required: true, message: "请输入设备编号", trigger: "blur" }],
      principalPerson: [
        { required: true, message: "请输入责任人", trigger: "blur" }
      ],
      contactNumber: [
        { required: true, validator: validatecontactNumber, trigger: "blur" }
      ],
      originalId: [
        { required: true, message: "请输入厂家编号", trigger: "blur" }
      ]
      // transferMethod: [
      //   { required: true, message: "请输入数据传输方式", trigger: "blur" }
      // ]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "新增采集站",
      // 弹框状态
      dialog_stock_flag: false,
      // 传感器数据
      relaysData: {},
      selectData: {},
      // 表单数据
      form: {
        areaId: "",
        type: "",
        name: "",
        no: "",
        originalId: "",
        principalPerson: "",
        contactNumber: "",
        point: ""
        // transferMethod: ""
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
          if (!requestParams.areaId) {
            requestParams.areaId = data.sensorData.areasValue;
          }
          // requestParams.collectStationId = data.sensorData.statitionsValue;
          console.log(requestParams);
          addControls(requestParams).then(res => {
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
      data.dialogTitleName = "新增传感器";
      data.form = {};
      data.relaysData.largeAreaValue = "";
      data.relaysData.areasValue = "";

      data.relaysData.largeareaName = "";
      data.relaysData.areaName = "";
    };
    const closeDialog = () => {
      close();
    };
    // 打开弹窗
    const openDialog = () => {
      console.log(data.form);
      // 初始值处理
      console.log(props.editData);
      let editData = props.editData;
      if (editData.id) {
        data.dialogTitleName = "编辑采集站";
        data.form = editData;
        data.relaysData.largeAreaValue = editData.regionId;
        data.relaysData.areasValue = editData.areaId;

        data.relaysData.largeareaName = editData.largeName;
        data.relaysData.areaName = editData.areaName;
      }
      // data.form.areaId = props.editData.areaId;
      // data.form.collectStationId = props.editData.collectStationId;
      data.form.type = props.editData.type;
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
  text-align: left;
  button {
    margin-left: 12px;
  }
  // }
}
.sb_status {
  display: flex;
  align-items: center;
}
</style>
