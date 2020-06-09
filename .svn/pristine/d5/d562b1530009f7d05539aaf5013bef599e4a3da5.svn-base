<template>
  <div class="deveice_list_msg" v-if="areaDetailList.daqu" id="area_table">
    <p v-on:detail:areaDetailList="areaDetailList = $event">
      <!-- {{ this.$store.state.map.areaDataList }}种植信息 -->
      {{ areaDetailList.daqu.name }}
    </p>
    <div class="table">
      <!--表头-->
      <ul class="t_row tHead">
        <li v-for="(item, index) in data.tableConfig.tHead" :key="index">
          {{ item.label }}
        </li>
      </ul>
      <ul
        class="t_row"
        v-for="(item, index) in areaDetailList.xiaoqu"
        :key="index"
      >
        <li>{{ item.name }}</li>
        <li>{{ item.varietes }}</li>
        <li>{{ item.plantArea }}</li>
        <li>{{ item.plantTime }}</li>
        <li>{{ item.principalPerson }}</li>
        <li>{{ item.contactNumber }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  components: {},
  props: {
    areaDetailList: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    const data = reactive({
      tableConfig: {
        // 多选框
        selection: false,
        // 翻页记录
        recordCheckbox: false,
        // 请求接口参数
        requestData: {},
        // 表头
        tHead: [
          {
            label: "棚区",
            field: "name"
          },
          {
            label: "种植品种",
            field: "regionId"
          },
          {
            label: "种植面积",
            field: "varietes"
          },
          {
            label: "播种时间",
            field: "plantArea"
          },
          {
            label: "负责人",
            field: "principalPerson"
          },
          {
            label: "联系电话",
            field: "contactNumber"
          }
        ],
        tableData: [
          {
            mn: "哈哈1",
            name: "9527",
            tem: "SB-125"
          },
          {
            mn: "哈哈1",
            name: "9527",
            tem: "SB-125"
          },
          {
            mn: "哈哈1",
            name: "9527",
            tem: "SB-125"
          }
        ],
        pagination: {
          show: true
        },
        paginationLayout: {
          layout: "prev, pager, next, jumper,total, sizes"
        }
      }
    });
    const getTableWidth = () => {
      let ele = document.getElementById("area_table");
      let tableWidth = window.getComputedStyle(ele).width;
      return tableWidth;
    };
    return {
      data,
      getTableWidth
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/reset.scss";
.deveice_list_msg {
  position: absolute;
  z-index: 10;
  left: 25px;
  top: 25px;
  // width: 31.5vw;
  // height: 37.7vh;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  p {
    font-size: 1.3vh;
    line-height: 4.2vh;
    font-weight: 800;
    padding-left: 1.2vw;
    color: #262b40;
    text-align: left;
  }
}
.table {
  display: flex;
  margin: 0 1.6vw 1.9vh 1.15vw;
  // border: 1px solid red;
  text-align: center;
}
.tHead {
  font-size: 1.3vh;
  width: 4.7vw;
  font-weight: 800;
  color: #262b40;
}
.t_row {
  display: flex;
  flex-direction: column;
  width: 10vw;
  font-size: 1.1vh;
  li {
    // width: 100px;
    border: 1px solid rgba(210, 210, 210, 1);
    line-height: 2.7vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
