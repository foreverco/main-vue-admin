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
              :relaysPickerLevel="['largeArea', 'areas', 'controls']"
              :relaysData.sync="data.relaysData"
              :dialogShow="data.dialog_stock_flag"
            ></RelaysPicker>
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
            <el-form-item label="发送格式: " prop="sendFormat">
              <el-input
                v-model="data.form.sendFormat"
                autocomplete="off"
                style="width:60%"
              ></el-input>
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
            <el-form-item label="设备状态: " class="sb_switchStatus">
              <el-switch
                style="display: block;"
                v-model="data.form.switchStatus"
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
import RelaysPicker from "@/components/RelaysPicker";
import {
  addrelays,
  placeSelect,
  reqcollectSelect,
  reqsbtypeSelect
} from "../../../../api/configCenter";
import { validatePhone } from "@/utils/validate";
export default {
  name: "dialogStock",
  components: {
    SelectVue,
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
      sendFormat: [
        { required: true, message: "请输入发送格式", trigger: "blur" }
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
      dialogTitleName: "新增继电器",
      // 弹框状态
      dialog_stock_flag: false,
      // 传感器数据
      relaysData: {},
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
        controlId: "",
        type: "",
        sendFormat: "",
        name: "",
        no: "",
        originalId: "",
        principalPerson: "",
        contactNumber: "",
        switchStatus: "1"
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
          // if (!requestParams.areaId) {
          requestParams.areaId = data.relaysData.areasValue;
          // }
          // if (!requestParams.controlId) {
          requestParams.controlId = data.relaysData.controlsValue;
          // }
          console.log(requestParams);
          addrelays(requestParams).then(res => {
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
      data.dialogTitleName = "新增继电器";
      data.form = {};
      data.relaysData.largeAreaValue = "";
      data.relaysData.areasValue = "";
      data.relaysData.controlsValue = "";

      data.relaysData.largeareaName = "";
      data.relaysData.areaName = "";
      data.relaysData.controlsName = "";
      // data.form.type = data.sbTypeSelect.init[0].value;
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
      if (editData.id) {
        console.log(data.relaysData);
        data.dialogTitleName = "编辑继电器";
        data.form = editData;
        data.relaysData.largeAreaValue = editData.regionId;
        data.relaysData.areasValue = editData.areaId;
        data.relaysData.controlsValue = editData.collectStationId;

        data.relaysData.largeareaName = editData.largeName;
        data.relaysData.areaName = editData.areaName;
        data.relaysData.controlsName = editData.controlName;
      }
      // data.form.areaId = props.editData.areaId;
      // data.form.collectStationId = props.editData.collectStationId;
      data.form.type = props.editData.type;
      // data.form.areaId = "";
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
