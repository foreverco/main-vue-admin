<template>
  <div id="nav-wrap">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu
          :index="index + ''"
          v-if="!item.hidden"
          :key="index"
          class="fatherNav"
        >
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <svg-icon
              :iconClass="item.meta.icon"
              :className="item.meta.icon"
            ></svg-icon>
            <span slot="title">{{ item.meta.title }}</span>
          </template>
          <!-- 子菜单 -->
          <template v-for="(subitem, index) in item.children">
            <el-menu-item
              v-if="!subitem.children"
              :key="index"
              :index="subitem.path"
            >
              <svg-icon
                :iconClass="subitem.meta.icon"
                :className="subitem.meta.icon"
              ></svg-icon>
              {{ subitem.meta.title }}
            </el-menu-item>
          </template>
          <!-- 子菜单有三级 -->
          <template v-for="(subitem, index) in item.children">
            <el-submenu
              v-if="subitem.children"
              :key="index"
              class="threeNav"
              index="hhh"
            >
              <span slot="title">
                <svg-icon
                  :iconClass="subitem.meta.icon"
                  :className="subitem.meta.icon"
                ></svg-icon
                >{{ subitem.meta.title }}</span
              >
              <el-menu-item
                :index="miniItem.path"
                v-for="(miniItem, index) in subitem.children"
                :key="index"
              >
                <!-- <svg-icon
                  :iconClass="subitem.meta.icon"
                  :className="subitem.meta.icon"
                ></svg-icon
                > -->
                {{ miniItem.meta.title }}</el-menu-item
              >
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    // console.log(root.$router.options.routes);
    /* data数据 */
    // const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);
    /* computed 监听 */
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
    /* methods方法 */

    return {
      isCollapse,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/main.scss";
#nav-wrap {
  position: fixed;
  top: 65px;
  left: 0;
  width: $navMenuWidth;
  height: calc(100vh - 65px);
  overflow-y: auto;
  background: #262b40;
  @include webkit(transition, all 0.3s ease 0s);
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
  min-height: 400px;
}
.el-submenu {
  text-align: -webkit-auto !important;
  .threeNav {
    .el-submenu__title {
      span {
        font-size: 13px;
        margin-left: 8px;
      }
    }
    .el-menu {
      .el-menu-item {
        margin-left: 8px !important;
      }
    }
  }
}
#nav-wrap {
  svg {
    fill: currentColor;
    color: #fff;
    margin-right: 10px;
  }
}

.open {
  #nav-wrap {
    width: $navMenuWidth;
  }
}
.close {
  #nav-wrap {
    width: $navMenuWidthmini;
  }
}
</style>
