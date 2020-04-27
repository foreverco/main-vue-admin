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
            @input="putPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-s-goods"
            v-model="ruleForm.password"
            autocomplete="off"
            maxlength="40"
            minlength="6"
            @input="putPassword"
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
            :disabled="loginButtonStatus"
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
import md5 from "js-md5";
import { Login } from "@/api/login.js";
import { reactive, ref, onMounted } from "@vue/composition-api";
import { stripscript } from "@/utils/validate";
export default {
  name: "login",
  // setup(props, context) {
  setup(props, { refs, root }) {
    // console.log(context);
    /* 
    root: (...) == this
    parent: (...)  ==this.$parent
    refs: (...)  ==this.$refs
    attrs: (...)  ==this.$attrs
    listeners: (...)  ==this.$listeners
    isServer: (...)  ==this.$isServer
    ssrContext: (...)  ==this.$ssrContext
    emit: (...)  ==this.$emit
    */
    /* 验证用户名 */
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    /* 验证密码 */
    let validatePass = (rule, value, callback) => {
      console.log(stripscript(value));
      /* 过滤后的数据 */
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    /* 这里放置data数据,生命周期，自定义函数 */
    // const menutab = reactive([{ name: "aaa" }, { name: "bbb" }]);
    // console.log(menutab);
    // const model = ref("login");
    // console.log(model.value);
    // 登录按钮禁用状态
    const loginButtonStatus = ref(true);
    /* 表单绑定数据 */
    const ruleForm = reactive({
      username: "",
      password: ""
    });
    /* 表单验证 */
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }]
    });
    /* 生命周期 */
    /* 自定义函数 */
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          let loginParams = {
            username: ruleForm.username,
            password: md5(ruleForm.password)
          };
          /* 登陆 */
          root.$store
            .dispatch("app/login", loginParams)
            .then(res => {
              console.log(res);
              root.$message({
                message: res.data.message,
                type: "success"
              });
              root.$router.push({
                name: "Home"
              });
              test();
            })
            .catch(err => {
              console.log(err);
            });
          // Login(loginParams)
          //   .then(res => {
          //     root.$message({
          //       message: res.data.message,
          //       type: "success"
          //     });
          //     root.$router.push({
          //       name: "Home"
          //     });
          //     test();
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    // const resetForm = formName => {
    //   this.$refs[formName].resetFields();
    // };
    // 更新按钮状态
    const putPassword = () => {
      if (ruleForm.username && ruleForm.password) {
        loginButtonStatus.value = false;
      }
    };

    const test = () => {
      console.log("test");
    };
    /* 生命周期 ******************************************************************* */
    onMounted(() => {
      console.log(123);
    });
    return {
      /* 变量 */
      loginButtonStatus,
      ruleForm,
      rules,
      /* 方法 */
      submitForm,
      // resetForm,
      putPassword,
      test
    };
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
