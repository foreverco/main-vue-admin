<template>
  <div id="treeComponents">
    <div class="title">
      在线直播
    </div>
    <el-input placeholder="请输入名称" v-model="filterText"> </el-input>
    <el-tree
      class="filter-tree"
      :data="treeData"
      node-key="id"
      :props="defaultProps"
      default-expand-all
      accordion
      :filter-node-method="filterNode"
      ref="tree"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- {{ node }} -->
        <span>
          <svg-icon :iconClass="data.icon" :className="data.icon"></svg-icon
          >{{ node.label }}
        </span>
        <span v-if="false">{{ data }}</span>
        <span v-if="data.areaId">
          <!-- <svg-icon
            iconClass="editvideo"
            className="editvideo"
            @click="() => hanleEdit(data)"
          ></svg-icon> -->
          <el-button
            icon="el-icon-edit"
            type="text"
            size="mini"
            @click.stop="() => hanleEdit(data)"
          >
          </el-button>
        </span>
      </span>
    </el-tree>
    <DialogVue
      @videomsg="videomsg"
      :flag.sync="dialog_show"
      :editData.sync="editData"
    ></DialogVue>
    <VideoDialog
      :flagVideo.sync="video_dialog_show"
      :editDataVideo.sync="editDataVideo"
    ></VideoDialog>
  </div>
</template>
<script>
import DialogVue from "./dialog";
import VideoDialog from "./videoDialog";
export default {
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    DialogVue,
    VideoDialog
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
    // dialog_show(val) {
    //   console.log("this.data");
    //   console.log(this.data);
    //   console.log(val);
    //   if (!val) {
    //     this.$emit("videomsg");
    //   }
    //   // this.$emit("videomsg");
    // }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    hanleEdit(data) {
      console.log(data);
      this.dialog_show = true;
      this.editData = data;
    },
    videomsg() {
      this.$emit("videomsg");
    },
    handleNodeClick(node, data, value) {
      console.log(node);
      console.log(data);
      console.log(value);
      if (node.videoCode) {
        console.log(node.videoCode);
        this.video_dialog_show = true;
        this.editDataVideo = node;
      }
    }
  },

  data() {
    return {
      /* 弹框显示 */
      dialog_show: false,
      editData: {},
      /* 视频弹框 */
      video_dialog_show: false,
      editDataVideo: {},
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },

  created() {
    this.data = this.treeData;
    console.log(this.data);
  }
};
</script>
<style lang="scss">
#treeComponents {
  width: 90%;
  margin: 0 auto;
  .title {
    // border: 1px solid red;
    height: 6vh;
    line-height: 6vh;
    font-size: 16px;
    font-weight: bold;
  }
  .el-input {
    background: transparent;
    margin-bottom: 2vh;
    .el-input__inner {
      background: transparent;
      border: 1px solid #333;
    }
  }
  .el-tree-node__content {
    display: flex;
    align-items: center;
    height: 35px;
    cursor: pointer;
  }
  [class^="el-icon-"] {
    color: #333;
    margin-right: 6px;
  }
  svg {
    margin-right: 6px;
    font-size: 12px;
    margin-bottom: -3px;
    // border: 1px solid red;
    fill: currentColor;
    color: #333;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
#treeComponents .el-tree {
  position: relative;
  cursor: default;
  background: transparent;
  color: #606266;
}
</style>
