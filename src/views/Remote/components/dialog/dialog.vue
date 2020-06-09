<template>
  <div>
    <el-dialog
      :title="data.dialogTitleName"
      :visible.sync="data.dialog_stock_flag"
      @close="closeDialog"
      @opened="openDialog"
    >
      <el-form :model="data.form" ref="addquesForm" :rules="formRules">
        <el-row>
          <el-col :span="11">
            <el-form-item label="发送人" prop="updateUser">
              <el-input
                v-model="data.form.updateUser"
                placeholder="发送人"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="标题" prop="title">
              <el-input
                v-model="data.form.title"
                placeholder="标题"
                autocomplete="off"
                style="width:60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="问题类型">
              <SelectVue
                :config="data.configSelect"
                :selectData.sync="data.form.messageType"
                style="width:60%"
              ></SelectVue>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="问题状态">
              <el-switch
                v-model="data.form.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="是"
                inactive-text="否"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="问题图片">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="data.form.picUrl"
                  :src="data.form.picUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="mini" @click="submit('addquesForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch } from "@vue/composition-api";
import { addQues } from "@/api/remote";
import { validatePhone } from "@/utils/validate";
import SelectVue from "@/components/Select/index";
export default {
  name: "remoteDialog",
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
      updateUser: [
        { required: true, message: "请输入提问人姓名", trigger: "blur" }
      ],
      title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      // contactNumber: [
      //   { required: true, validator: validatecontactNumber, trigger: "blur" }
      // ]
      // statitions: [
      //   { required: true, message: "请输入区域采集站信息", trigger: "change" }
      // ]
    };
    /* data数据 */
    const data = reactive({
      // 弹框标题
      dialogTitleName: "新增问题",
      // 弹框状态
      dialog_stock_flag: false,
      // 初始化数据
      formEditData: {},
      configSelect: {
        init: [
          {
            value: "1",
            label: "虫情1"
          },
          {
            value: "2",
            label: "虫情2"
          },
          {
            value: "3",
            label: "虫情3"
          }
        ]
      },
      // 下拉框选中值
      selectData: "",
      uploadKey: {
        key: ""
      },
      form: {
        updateUser: "",
        title: "",
        messageType: "",
        status: 1,
        picUrl: ""
      }
    });
    watch(
      () => props.flag,
      (newVale, oldvalue) => (data.dialog_stock_flag = newVale)
    );
    const submit = formName => {
      console.log(formName);
      refs[formName].validate(valid => {
        if (valid) {
          let requestParams = JSON.parse(JSON.stringify(data.form));
          console.log(requestParams);
          addQues(requestParams).then(res => {
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
    const resetForm = () => {
      refs.addquesForm.resetFields();
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
      let editData = props.editData;
      console.log(data.form);
      // 初始值处理
      console.log(editData);
    };
    /* 图片上传 */
    const handleAvatarSuccess = (res, file) => {
      console.log(res);
      data.form.picUrl = URL.createObjectURL(file.raw);
      // data.form.picUrl = `${root.$store.getters["common/qiniuUrl"]}`;
      console.log(root.$store.getters["common/qiniuUrl"]);
    };
    const beforeAvatarUpload = file => {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传头像图片大小不能超过 2MB!");
      }
      console.log(file);
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      data.uploadKey.key = key;
      return isJPG && isLt2M;
    };
    return {
      formRules,
      data,
      /* methods */
      submit,
      handleAvatarSuccess,
      beforeAvatarUpload,
      close,
      openDialog,
      closeDialog
    };
  }
};
</script>
<style lang="scss">
.el-row {
  margin: 10px 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
