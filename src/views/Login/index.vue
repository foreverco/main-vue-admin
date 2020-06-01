<template>
  <div id="login">
    <p class="loginTitle">
      <img src="../../assets/loginlogo.png" />
      国草园智慧农业监控系统
    </p>
    <div class="login-card">
      <!-- <img src="../../assets/logo.png" alt="" /> -->
      <div class="login-wrap">用户管理后台系统</div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="24">
            <div class="label-wrap sb_name">
              <label for="" class="iconlabel">
                <!-- <svg-icon iconClass="user" className="user"></svg-icon> -->
                <i class="el-icon-user-solid"></i>
                账户
              </label>
              <div class="warp-content">
                <el-form-item label="" prop="username">
                  <el-input
                    type="text"
                    v-model="ruleForm.username"
                    autocomplete="off"
                    @input="putPassword"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="label-wrap sb_name">
              <label for="" class="iconlabel">
                <i class="el-icon-s-goods"></i>
                密码
              </label>
              <div class="warp-content">
                <el-form-item label="" prop="password">
                  <el-input
                    type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                    maxlength="40"
                    minlength="6"
                    @input="putPassword"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- <el-form-item label="" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item> -->
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button
                size="medium"
                type="success"
                style="width:100%"
                :disabled="loginButtonStatus"
                @click="submitForm('ruleForm')"
                >登录</el-button
              >
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import { Login } from "@/api/login.js";
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
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
    // const username = computed(() => root.$store.state.app.username);
    /* 生命周期 */
    /* 自定义函数 */
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          let loginParams = {
            username: ruleForm.username,
            password: ruleForm.password
            // password: md5(ruleForm.password)
          };
          // let parapmsLogin = JSON.parse(JSON.stringify(loginParams));
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
<style lang="scss">
#login {
  .el-input__inner {
    border: 0;
    border-radius: 0px;
    border-bottom: 1px solid black;
    background: transparent;
  }
}
</style>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.el-row {
  margin: 0;
}
.label-wrap {
  &.sb_name {
    @include babelDom(left, 65, 35);
  }
}
#login {
  height: 100vh;
  background: url("../../assets/loginbg.png") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .loginTitle {
    position: absolute;
    top: 0;
    left: 3%;
    // width: 669px;
    // height: 49px;
    font-size: 2.5vw;
    letter-spacing: 6px;
    // font-family: BigruixianBoldkGBV1.0;
    font-weight: bold;
    // border: 1px solid red;
    height: 3.5vw;
    color: #fff;
    display: flex;
    align-items: center;
    img {
      height: 100%;
      margin-right: 10px;
    }
  }
  .login-card {
    width: 20vw;
    background: rgba(255, 255, 255, 0.9);
    padding: 20px 50px;
    border-radius: 10px;
    // border: 1px solid red;
    // .login-card img {
    //   width: 40%;
    // }
    .login-wrap {
      // width: 33px;
      margin: 20px auto;
      font-size: 20px;
      letter-spacing: 5px;
      color: black;
      font-weight: bold;
    }
    .iconlabel {
      // outline: 1px solid red;
      display: flex;
      align-items: center;
      margin-top: 7px;
      color: #888;
      .el-icon-user-solid {
        margin-right: 5px;
        // fill: currentColor;
        color: #333;
        font-size: 16px;
        margin-top: -2px;
      }
      .el-icon-s-goods {
        margin-right: 5px;
        color: #333;
        font-size: 16px;
        margin-top: -2px;
      }
    }
    .el-input__inner {
      border: 1px solid red !important;
      background: blue;
    }
    .el-button--success {
      border-radius: 50px !important;
    }
  }
}
</style>
