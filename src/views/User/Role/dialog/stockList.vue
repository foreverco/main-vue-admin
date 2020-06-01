<template>
  <div>
    <el-dialog
      :title="data.dialogTitleName"
      :visible.sync="data.dialog_stock_flag"
      @close="closeDialog"
      @opened="openDialog"
    >
      <el-tabs v-model="data.activeName" @tab-click="handleClick">
        <el-tab-pane label="角色信息" name="first">
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
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="dialog-footer">
            <el-button
              type="success"
              size="mini"
              @click="submit('addSensorForm')"
              >确 定</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="分配权限" name="second" :disabled="!data.isnewadd">
          <el-form>
            <el-row>
              <el-col :span="24">
                <el-form-item label="功能菜单: " prop="Rolemenu">
                  <el-table
                    :data="data.tableData"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    :indent="30"
                    height="300"
                    border
                    :tree-props="{
                      children: 'children',
                      hasChildren: 'hasChildren'
                    }"
                  >
                    <el-table-column prop="menuName" label="菜单" sortable>
                    </el-table-column>
                    <el-table-column prop="name" label="操作" sortable>
                      <template slot-scope="scope">
                        <el-checkbox v-model="data.checked">查看</el-checkbox>
                        <el-checkbox v-model="data.checked1">编辑</el-checkbox>
                        <span v-if="false">{{ scope.row }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
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
import { addRole, getauthoritymenu } from "@/api/user";

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
      activeName: "first",
      isnewadd: "",
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
      },

      /* 权限相关 */
      tableData: [],
      checked: true,
      checked1: true,
      authForm: {
        expireTime: ""
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
      data.activeName = "first";
      for (let key in data.sensorData) {
        data.sensorData[key] = "";
      }
    };
    const closeDialog = () => {
      close();
    };
    const handleClick = () => {
      console.log(data.activeName);
      if (data.activeName === "second") {
        getauthmenu();
      }
    };
    // 打开弹窗
    const openDialog = () => {
      // 初始值处理
      console.log(props.editData);
      data.isnewadd = props.editData.id;
      let editData = props.editData;
      console.log(editData);
      if (editData.id) {
        data.dialogTitleName = "编辑角色信息";
        data.form = editData;
        // 获取菜单权限
      }
    };
    const getauthmenu = () => {
      console.log(444);
      getauthoritymenu().then(res => {
        console.log(res);
        data.tableData = res.data.data;
      });
    };
    return {
      formRules,
      data,
      /* methods */
      close,
      openDialog,
      submit,
      handleClick,
      closeDialog,
      // 获取菜单权限列表
      getauthmenu
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
