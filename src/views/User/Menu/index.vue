<template>
  <div>
    <el-row>
      <el-col :span="10">
        <!-- <el-card> -->
        <MenuTree
          :menus="menus"
          :hasAddMenu="hasAddMenu"
          @reset="getMenuTree"
          @delete-menu-node="deleteMenuNode"
          @change-add-status="changeAddStatus"
          @save-change-menu="saveChangeMenu"
          @click-menu-change="clickMenuChange"
        ></MenuTree>
        <!-- </el-card> -->
      </el-col>
      <el-col :offset="1" :span="12">
        <menu-data :menuData="clickMenu" @saveData="saveData" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { MenuTree, MenuData } from "./components";
import { getMenuList } from "@/api/user.js";
export default {
  name: "Menu",
  components: {
    MenuData,
    MenuTree
  },
  data() {
    return {
      URL: {
        baseMenu: "/mgmt/menu"
      },
      menus: [],

      //记录是否有新增未保存的菜单
      hasAddMenu: false,
      //当前选中的栏目
      clickMenu: {}
    };
  },
  methods: {
    clickMenuChange(data) {
      console.log(data);
      this.clickMenu = data;
    },
    changeAddStatus(status) {
      this.hasAddMenu = status;
    },
    //删除菜单
    deleteMenuNode(data) {
      this.$axios(this.URL.baseMenu, data, this.METHOD.DELETE).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }
      });
    },
    //保存排序改变
    saveChangeMenu(data) {
      this.$axios(this.URL.baseMenu + "/batch", data, this.METHOD.POST).then(
        res => {
          if (res.code == 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        }
      );
    },
    //保存菜单
    saveData(data) {
      let d = JSON.parse(JSON.stringify(data));
      if (d.id == "add") {
        d.id = null;
      }
      this.$axios(this.URL.baseMenu, d, this.METHOD.POST).then(res => {
        if (res.code == 200) {
          let callData = res.data;
          data.id = callData.id;
          if (!d.id) {
            this.hasAddMenu = false;
          }
          this.$message({
            message: "保存成功",
            type: "success"
          });
        }
      });
    },
    //获取菜单树
    getMenuTree() {
      console.log(23);
      getMenuList().then(res => {
        console.log(res);
        this.menus = [
          {
            id: "root",
            menuName: "根",
            children: res.data.data
          }
        ];
        console.log(this.menus);
      });
      // this.$axios(this.URL.baseMenu, { status: 0 }, this.METHOD.GET).then(
      //   res => {
      //     if (res.code == 200) {
      //       this.menus = [
      //         {
      //           id: "root",
      //           metaTitle: "根",
      //           children: res.data
      //         }
      //       ];
      //       console.log(this.menus);
      //     }
      //   }
      // );
    }
  },
  created() {
    this.getMenuTree();
  }
};
</script>
<style lang="scss"></style>
