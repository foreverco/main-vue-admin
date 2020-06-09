<template>
  <div>
    <el-row>
      <el-col :span="7">
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
      <el-col :span="10" style="margin-left:1vw">
        <menu-data :menuData="clickMenu" @saveData="saveData" />
      </el-col>
      <el-col :span="6" style="margin-left:1vw">
        <menu-btn :menuData="clickMenu" @saveData="saveData" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { MenuTree, MenuData, MenuBtn } from "./components";
import { getMenuList, addMenu, delmenu, priorityMenu } from "@/api/user.js";
import { global } from "@/utils/global_V3.0";
const { confirm } = global();
export default {
  name: "Menu",
  components: {
    MenuData,
    MenuTree,
    MenuBtn
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
      console.log(data);
      delmenu(data).then(res => {
        console.log(res);
      });
    },
    //保存排序改变
    saveChangeMenu(data) {
      console.log(data);
      priorityMenu(data).then(res => {
        console.log(res);
      });
    },
    //保存菜单
    saveData(data) {
      let d = JSON.parse(JSON.stringify(data));
      if (d.id == "add") {
        d.id = null;
      }
      addMenu(d).then(res => {
        console.log(res);
        let callData = res.data;
        data.id = callData.id;
        if (!d.id) {
          this.hasAddMenu = false;
        }
      });
      // this.$axios(this.URL.baseMenu, d, this.METHOD.POST).then(res => {
      //   if (res.code == 200) {
      //     let callData = res.data;
      //     data.id = callData.id;
      //     if (!d.id) {
      //       this.hasAddMenu = false;
      //     }
      //     this.$message({
      //       message: "保存成功",
      //       type: "success"
      //     });
      //   }
      // });
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
