<template>
  <div>
    <el-form>
      <SensorPicker
        :sensorPickerLevel="['largeArea']"
        :sensorData="sensorData"
        v-on:update:sensorData="sensorData = $event"
      ></SensorPicker>
      <!-- {{ sensorData.largeAreaValue }} -->
    </el-form>
    <Table :config="data.tableConfig" ref="mapTable">
      <el-button
        type="success"
        slot="operation"
        slot-scope="props"
        @click="test(props.data)"
      >
        查看
      </el-button>
    </Table>
  </div>
</template>

<script>
import Table from "../../../../components/Table/index.vue";
import SensorPicker from "../../../../components/SensorPicker/index";
import { watch, reactive, onMounted } from "@vue/composition-api";
import { mapActions } from "vuex";
export default {
  name: "mapShowList",
  components: {
    Table,
    SensorPicker
  },
  data() {
    return {
      sensorData: {},
      data: {
        tableConfig: {
          // 多选框
          selection: false,
          // 翻页记录
          recordCheckbox: true,
          // 请求接口参数
          requestData: {
            url: "getMapList", // 替换地图接口
            method: "get",
            data: {
              page: 1,
              pageSize: 5,
              areaId: {}
              // areaId: "0da2362f242edca3945fbdecb7254f91"
            }
          },
          // 表头
          tHead: [
            {
              label: "采集时间",
              field: "datetime"
            },
            {
              label: "分区",
              field: "small_area_name"
            },
            {
              label: "空气温度",
              field: "temperature"
            },
            // {
            //   label: "空气湿度",
            //   field: "varietes"
            // },
            {
              label: "土壤温度",
              field: "plantArea"
            },
            {
              label: "土壤湿度",
              field: "principalPerson"
            },
            {
              label: "土壤PH值",
              field: "ph"
            },
            // {
            //   label: "土壤氮磷钾"
            // },
            // {
            //   label: "土壤EC值"
            // },
            // {
            //   label: "大气压强"
            // },
            // {
            //   label: "光照强度"
            // },
            // {
            //   label: "CO2浓度"
            // },
            // {
            //   label: "PM2.5"
            // },
            {
              label: "风速",
              field: "air_speed"
            },
            // {
            //   label: "风向"
            // },
            // {
            //   label: "降水量"
            // },
            {
              label: "历史记录",
              columnType: "slot",
              slotname: "operation"
            }
          ],
          pagination: {
            show: true
          },
          paginationLayout: {
            layout: "prev, pager, next, jumper,total, sizes"
          }
        }
      }
    };
  },
  watch: {
    "sensorData.largeAreaValue": {
      handler: function(val) {
        // console.log(val);
        this.$refs.mapTable.paramsLoadData({ areaId: val });
      },
      deep: true
    }
  }
};
</script>

<style></style>
