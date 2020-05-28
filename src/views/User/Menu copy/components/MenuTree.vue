<template>
  <el-card :body-style="cardStyle">
    <div slot="header" class="clearfix">
      <span class="title">菜单栏</span>
      <el-button
        style="float: right; padding: 3px 0 ; margin-left: 20px"
        type="text"
        :permission="'sort'"
        @click="saveMenuChange"
        >保存排序
      </el-button>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="resetMenu"
        >重置
      </el-button>
    </div>
    <div class="text item">
      <el-tree
        :data="menus"
        class="menu-tree"
        node-key="id"
        default-expand-all
        :props="props"
        :check-on-click-node="true"
        @node-click="menuClick"
        :expand-on-click-node="false"
        :draggable="!hasAddMenu"
        :allow-drop="allowMenuDrop"
        :allow-drag="allowMenuDrag"
        @node-drop="handleMenuDrop"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :style="{ color: data.status === 2 ? 'red' : '#606266' }">{{
            data.metaTitle
          }}</span>
          <span>
            <el-button
              v-if="data.type != 'PAGE'"
              :permission="'add'"
              type="text"
              size="mini"
              @click="() => appendMenu(data)"
            >
              增加
            </el-button>

            <el-button
              v-if="
                data.id != 'root' &&
                  (!data.children || data.children.length == 0)
              "
              :permission="'delete'"
              type="text"
              size="mini"
              @click="() => removeMenu(node, data)"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "MenuTree",
  props: {
    menus: {
      type: Array,
      //   default: [],
      required: true
    },
    //记录是否有新增未保存的菜单
    hasAddMenu: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      cardStyle: {
        padding: "20px",
        minWidth: "355px",
        maxHeight: "400px",
        overflow: "auto"
      },
      props: {
        label: "metaTitle",
        children: "children"
      }
    };
  },
  methods: {
    //重置菜单
    resetMenu() {
      this.$confirm("是否重置？", "提示", {
        confirmButtonText: "重置",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("reset");
        })
        .catch(error => {});
    },
    //保存菜单改变
    saveMenuChange() {
      if (this.hasAddMenu) {
        this.$notify.error({
          title: "错误",
          message: "有新增菜单未保存"
        });
        return;
      }
      this.$confirm("确认保存变动？", "提示", {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("save-change-menu", this.menus[0].children);
        })
        .catch(error => {});
    },
    //选中栏目
    menuClick(data, node) {
      if (data.id != "root") this.$emit("click-menu-change", data);
    },
    //新增菜单按钮
    appendMenu(data) {
      if (this.hasAddMenu) {
        this.$notify.error({
          title: "错误",
          message: "请先操作未保存的栏目"
        });
        return;
      }
      this.$emit("change-add-status", true);
      const newChild = {
        id: "add",
        status: 1,
        hidden: 1,
        type: "PAGE",
        metaTitle: "新增栏目**",
        parentId: data.id == "root" ? "ROOT" : data.id,
        children: []
      };

      if (!data.children) {
        this.$set(data, "children", []);
      }

      data.children.push(newChild);
      this.resetSort(data.children);
      this.menuClick(newChild);
    },
    //删除节点
    removeMenu(node, data) {
      this.$confirm("确认删除该节点？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (data.id === "add") {
            this.$emit("change-add-status", false);
          } else {
            this.$emit("delete-menu-node", [node.data.id]);
          }
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.resetSort(children);
        })
        .catch(() => {});
    },
    //判定是否可放入当前位置
    allowMenuDrop(draggingNode, dropNode, type) {
      if (dropNode.data.id == "root") {
        if (type == "prev" || type == "next") {
          return false;
        }
      }

      if (dropNode.data.type == "PAGE" && type == "inner") {
        return false;
      }

      return true;
    },
    //判定目标是否可移动
    allowMenuDrag(node) {
      return node.data.id != "root";
    },
    handleMenuDrop(node, targetNode, location) {
      //如果移动到目标前面或后面
      if (location == "before" || location == "after") {
        const parent = targetNode.parent;
        const children = parent.data.children;
        if (children) {
          this.resetSort(children);
        }
        node.data.parentId =
          parent.data.id === "root" ? "ROOT" : parent.data.id;
      }
      //如果移动到目标里面
      else if (location == "inner") {
        this.resetSort(targetNode.data.children);
        node.data.parentId = targetNode.data.id;
      }
    },
    //重置排序值
    resetSort(children) {
      if (children) {
        children.forEach((item, index) => (item.sort = index + 1));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-tree {
  min-width: 350px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.title {
  display: inline-block;
  float: left;
}

.text {
  font-size: 14px;
}

.item {
  float: left;
  margin-bottom: 18px;
}
</style>
