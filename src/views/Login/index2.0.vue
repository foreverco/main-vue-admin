<template>
  <div id="login">
    <div class="login-card">
      <img src="../../assets/logo.png" alt="" />
      <div class="login-wrap">国草园后台管理系统</div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="username">
          <el-input
            type="text"
            prefix-icon="el-icon-s-custom"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            type="text"
            prefix-icon="el-icon-s-goods"
            v-model="ruleForm.password"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            style="width:100%"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { stripscript } from "@/utils/validate";
export default {
  name: "login",
  data() {
    /* 验证用户名 */
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    /* 验证密码 */
    var validatePass = (rule, value, callback) => {
      console.log(stripscript(value));
      /* 过滤后的数据 */
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        age: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #344a5f;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 500px;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 50px;
  border-radius: 10px;
  // border: 1px solid red;
}
.login-card img {
  width: 40%;
}
.login-wrap {
  // width: 33px;
  margin: 20px auto;
  font-size: 20px;
  letter-spacing: 5px;
  color: #fff;
}
</style>
