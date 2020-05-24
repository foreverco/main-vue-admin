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
            <SensorPicker
              :sensorPickerLevel="['areas', 'statitions']"
              :sensorData.sync="data.sensorData"
            ></SensorPicker>
            <!-- {{ data.sensorData }} -->
          </el-form-item>
          <!-- <el-col :span="11">
            <el-form-item label="区域: ">
              <SelectVue
                :config="data.areaIdSelect"
                style="width:60%"
                :selectData.sync="data.form.areaId"
              ></SelectVue>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="采集站: ">
              <SelectVue
                :config="data.collectStationIdSelect"
                :selectData.sync="data.form.collectStationId"
                style="width:60%"
              ></SelectVue>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="安装日期: " prop="installTime">
              <el-date-picker
                v-model="data.form.installTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width:60%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="设备类型: ">
              <SelectVue
                style="width:60%"
                :config="data.sbTypeSelect"
                :selectData.sync="data.form.type"
              ></SelectVue>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="设备名称: " prop="name">
              <el-input
                v-model="data.form.name"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="设备编号: " prop="no">
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
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="设备点位: " class="sb_map">
              <el-button size="small" type="success">打开地图</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="设备状态: " class="sb_status">
              <el-switch
                style="display: block;"
                v-model="data.form.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="是"
                inactive-text="否"
              >
              </el-switch>
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
import SensorPicker from "@/components/SensorPicker";
import {
  addsensor,
  placeSelect,
  reqcollectSelect,
  reqsbtypeSelect
} from "../../../../api/configCenter";
import { validatePhone } from "@/utils/validate";
export default {
  name: "dialogStock",
  components: {
    SelectVue,
    SensorPicker
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
      // statitions: [
      //   { required: true, message: "请输入区域采集站信息", trigger: "change" }
      // ]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "新增传感器",
      // 弹框状态
      dialog_stock_flag: false,
      // 传感器数据
      sensorData: {},
      /* 区域下拉 */
      // areaIdSelect: {
      //   init: ["one", "two", "three"]
      // },
      selectData: {},
      // 采集站下拉
      // collectStationIdSelect: {
      //   init: [
      //     { value: "caiji1", label: "采集站一" },
      //     { value: "caiji2", label: "采集站二" },
      //     { value: "caiji3", label: "采集站三" }
      //   ]
      // },
      // 设备类型
      sbTypeSelect: {
        init: [
          { value: "caiji1", label: "温度" },
          { value: "caiji2", label: "湿度" },
          { value: "caiji3", label: "虫情" }
        ]
      },
      // 表单数据
      form: {
        areaId: "",
        collectStationId: "",
        type: "",
        installTime: "",
        name: "",
        no: "",
        originalId: "",
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
          requestParams.areaId = data.sensorData.areasValue;
          requestParams.collectStationId = data.sensorData.statitionsValue;
          console.log();
          console.log(requestParams);
          addsensor(requestParams).then(res => {
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
      // data.form.type = data.sbTypeSelect.init[0].value;
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
        data.dialogTitleName = "编辑传感器";
        data.form = editData;
      }
      // data.form.areaId = props.editData.areaId;
      // data.form.collectStationId = props.editData.collectStationId;
      data.form.type = props.editData.type;
    };
    // 获取区域列表
    // const getplaceSel = () => {
    //   placeSelect().then(res => {
    //     // data.areaIdSelect.init.value =
    //     data.areaIdSelect.init = [];
    //     res.data.data.map(item => {
    //       let obj = {};
    //       obj.value = item.id;
    //       obj.label = item.name;
    //       data.areaIdSelect.init.push(obj);
    //     });
    //     data.form.areaId = data.areaIdSelect.init[0].value;
    //   });
    // };
    // // 获取采集站列表
    // const collectSelect = () => {
    //   reqcollectSelect().then(res => {
    //     // data.areaIdSelect.init.value =
    //     data.collectStationIdSelect.init = [];
    //     res.data.data.map(item => {
    //       let obj = {};
    //       obj.value = item.id;
    //       obj.label = item.name;
    //       data.collectStationIdSelect.init.push(obj);
    //     });
    //     data.form.collectStationId = data.collectStationIdSelect.init[0].value;
    //   });
    // };
    // 获取设备类型列表
    const sbtypeSelect = () => {
      reqsbtypeSelect().then(res => {
        data.sbTypeSelect.init = [];
        res.data.data.map(item => {
          let obj = {};
          obj.value = item.id;
          obj.label = item.name;
          data.sbTypeSelect.init.push(obj);
        });
        data.form.type = data.sbTypeSelect.init[0].value;
      });
    };
    // getplaceSel();
    // collectSelect();
    sbtypeSelect();
    return {
      formRules,
      data,
      /* methods */
      close,
      openDialog,
      submit,
      closeDialog,
      // getplaceSel,
      // collectSelect,
      sbtypeSelect
    };
  }
};
</script>
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
