<template>
  <div>
    <el-dialog
      :title="data.dialogTitleName"
      :visible.sync="data.dialog_stock_flag"
      @close="closeDialog"
      @opened="openDialog"
    >
      <el-transfer
        filterable
        :filter-method="data.filterMethod"
        filter-placeholder="请输入搜索内容"
        v-model="data.value"
        :data="data.apidata"
      >
      </el-transfer>
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
import { getallApi } from "@/api/user";
import { validatePhone } from "@/utils/validate";
export default {
  name: "apidialogStock",
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
    const formRules = {};
    const generateData = _ => {
      const data = [];
      // const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
      data.apiArr.forEach(item => {
        data.push({
          label: item.prefix + item.path,
          key: item.apiCode
          // pinyin: pinyin[index]
        });
      });
      return data;
    };
    /* data数据 */
    const data = reactive({
      apidata: [],
      apiArr: [],
      // data1: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      // 弹框标题
      dialogTitleName: "",
      // 弹框状态
      dialog_stock_flag: false,
      // 初始化数据
      formEditData: {}
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
      console.log(data.value);
      // refs[formName].validate(valid => {
      //   if (valid) {
      //     let requestParams = JSON.parse(JSON.stringify(data.form));
      //     requestParams.menuId = data.formEditData.id;
      //     console.log(requestParams);
      //     // addaction(requestParams).then(res => {
      //     //   root.$message({
      //     //     message: res.data.msg,
      //     //     type: "success"
      //     //   });
      //     //   close();
      //     //   emit("refresTaleData");
      //     // });
      //   } else {
      //     root.$message({
      //       message: "请填写必填项",
      //       type: "error"
      //     });
      //     return false;
      //   }
      // });
    };
    const close = () => {
      data.dialog_stock_flag = false;
      data.apidata = [];
      // resetForm();
      emit("update:flag", false);
    };
    const closeDialog = () => {
      close();
    };
    const getallApiFun = () => {
      getallApi().then(res => {
        console.log(res);
        data.apiArr = res.data.data;
        data.apiArr.forEach(item => {
          data.apidata.push({
            label: item.prefix + item.path,
            key: item.authorityId
          });
        });
      });
    };
    // 打开弹窗
    const openDialog = () => {
      getallApiFun();
      // 初始值处理
      let editData = props.editData;
      console.log(editData);
      // data.formEditData = props.editData;
      data.dialogTitleName = "接口授权 - ";
    };
    return {
      formRules,
      generateData,
      data,
      /* methods */
      close,
      openDialog,
      submit,
      closeDialog,
      getallApiFun
    };
  }
};
</script>
<style lang="scss">
.el-dialog {
  width: 60% !important;
  .el-transfer-panel {
    width: 300px;
    .el-transfer-panel__list {
      height: 400px;
    }
    .el-transfer-panel__body {
      height: 450px;
    }
  }
  .el-transfer-panel__item .el-checkbox__input {
    position: absolute;
    top: 8px;
    left: 5%;
  }
  .el-transfer-panel__item.el-checkbox .el-checkbox__label {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    box-sizing: border-box;
    padding-left: 24px;
    line-height: 30px;
    /* position: absolute; */
    /* left: 10%; */
    text-align: left;
  }
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
.sb_switchStatus {
  // border: 1px solid blue;
  display: flex;
  align-items: center;
}
</style>
