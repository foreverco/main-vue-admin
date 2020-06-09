<template>
  <div class="deveice_list_msg">
    <p>设备实时监测数据</p>
    <div class="table">
      <!--表头-->
      <div class="t_row">
        <li>
          <span>表头</span>
          <span>内容</span>
        </li>
        <li>表头1</li>
        <li>表头2</li>
        <li>表头3</li>
        <li>表头4</li>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  components: {},
  setup({ root }) {
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
            label: "采集时间"
          },
          {
            label: "分区"
          },
          {
            label: "空气温度"
          },
          {
            label: "空气湿度"
          },
          {
            label: "土壤温度"
          },
          {
            label: "土壤湿度"
          },
          {
            label: "土壤PH值"
          },
          {
            label: "土壤氮磷钾"
          },
          {
            label: "土壤EC值"
          },
          {
            label: "大气压强"
          },
          {
            label: "光照强度"
          },
          {
            label: "CO2浓度"
          },
          {
            label: "PM2.5"
          },
          {
            label: "风速"
          },
          {
            label: "风向"
          },
          {
            label: "降水量"
          },
          {
            label: "历史记录",
            columnType: "slot",
            slotname: "operation"
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
    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/reset.scss";
.deveice_list_msg {
  position: absolute;
  z-index: 10;
  left: 50px;
  // background-color: red;
}
.table {
  display: flex;
}
.t_head {
  background-color: pink;
}
.t_context {
  background-color: blue;
}
</style>
