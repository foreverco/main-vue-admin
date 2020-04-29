<template>
  <div id="header-wrap">
    <div class="pull-left logoBox">
      <!-- <svg-icon iconClass="menu" className="menu"></svg-icon> -->
      <!-- <div class="header-icon pull-left" @click="colspseState">
        <svg-icon iconClass="menu" className="menu"></svg-icon>
      </div> -->
      <img src="@/assets/logo.png" alt="" />
      <p>国草园智慧农业监控平台</p>
    </div>
    <div class="pull-right header-icon">
      <div class="header-icon pull-left">
        <svg-icon iconClass="reset" className="reset"></svg-icon>
      </div>
      <div class="user-info pull-left">
        <img src="@/assets/tx.jpg" alt="" />
        <span>{{ username }}</span>
      </div>
      <div class="header-icon pull-left">
        <el-badge :value="12" class="item">
          <svg-icon
            iconClass="warrning"
            className="warrning"
            style="font-size:25px"
          ></svg-icon>
        </el-badge>
      </div>
      <div class="header-icon pull-left">
        <el-dropdown trigger="click" style="margin-top:6px;">
          <span class="el-dropdown-link">
            <i
              class="el-icon-caret-top el-icon--right"
              style="font-size:20px;margin-top:13px;"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              评论
              <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              回复
              <el-badge class="mark" :value="3" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="header-icon pull-left">
        |
      </div>
      <div class="header-icon pull-left loginOut" @click="loginOut">
        <span>退出</span>
        <svg-icon
          iconClass="out"
          className="out"
          style="margin-left: 10px;"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    const username = computed(() => root.$store.state.app.username);
    // const colspseState = () => {
    //   root.$store.commit("app/SET_ISCOLLAPSE");
    //   // root.$store.dispatch("colspseState", { name: "aaa" });
    // };
    // 登出
    const loginOut = () => {
      root
        .$confirm("确认退出系统?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          root.$store.dispatch("app/loginOut").then(() => {
            root.$message.success("退出当前账号");
            root.$router.push({
              name: "Login"
            });
          });
        })
        .catch(() => {
          root.$message({
            type: "info",
            message: "取消退出"
          });
        });
    };
    return {
      // colspseState,
      username,
      loginOut
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/main.scss";
#header-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 65px;
  background: #fff;
  width: 100%;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  // display: flex;
  // align-items: center;
  // justify-content: space-evenly;
  line-height: 65px;
  .loginOut:hover {
    cursor: pointer;
    span {
      color: $maincolor;
    }
    .svg-icon {
      fill: currentColor;
      color: $maincolor;
    }
  }
}
.logoBox {
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding: 0 32px;
  img {
    height: 50%;
    margin-right: 10px;
  }
  p {
    font-size: 20px;
    letter-spacing: 5px;
    font-weight: bold;
  }
}

.header-icon {
  padding: 0 10px;
  display: flex;
  align-items: center;
  svg {
    font-size: 14px;
    cursor: pointer;
  }
  span {
    // color: red;
    font-size: 13px;
  }
}
.user-info {
  height: 65px;
  display: flex;
  align-items: center;
  img {
    height: 40%;
    border-radius: 100%;
    margin: 0 5px;
  }
}
</style>
