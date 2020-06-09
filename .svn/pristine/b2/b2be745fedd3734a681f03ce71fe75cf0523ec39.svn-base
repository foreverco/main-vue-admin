<template>
  <div class="deveice_trend">
    <ul class="deveice_button">
      <li
        v-for="(item, index) in deveice_type"
        :key="index"
        @click="checkType(item.value)"
        :class="activeClass == item.value ? 'active' : ''"
      >
        <i class="iconfont" :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </li>
    </ul>
    <Echars :option="deviceAcquisitionOption" ref="echars"></Echars>
  </div>
</template>

<script>
import { getIcon } from "../../../utils/mapUtil.js";
import { reqDeveice } from "../../../api/home.js";
import Echars from "../../../components/echarts/Echars.vue";
export default {
  components: {
    Echars
  },
  props: {
    areasValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      deveice_type: [],
      activeClass: "w01001", // 当前选择
      areasId: "321fb20d38391d25e651026e9db79de6",
      deviceAcquisitionOption: {
        legend: {
          itemWidth: 5, //图例的宽度
          itemHeight: 5, //图例的高度
          itemGap: 10,
          // orient: 'vertical',
          right: "2%",
          top: "20",
          selectedMode: false, //取消图例上的点击事件
          data: [
            {
              icon: "roundRect",
              name: "昨天"
            },
            {
              icon: "roundRect",
              name: "今天"
            }
          ]
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "0%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          boundaryGap: false, //x轴从0开始到结束显示
          // data: ["12.1", "12.2", "12.3", "12.4", "12.5", "12.6", "12.7"],
          data: ["0", "4", "8", "12", "16", "20", "24"],
          splitLine: {
            show: false
          }, //去除网格线
          splitArea: {
            show: false
          }, //保留网格区域
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0, //隔几个显示
            rotate: 30,
            showMinLabel: true,
            color: "#393C40"
          }
        },
        yAxis: {
          min: function(value) {
            return value.min - 0;
          },
          splitLine: {
            show: false
          }, //去除网格线
          splitArea: {
            show: false
          }, //保留网格区域
          axisLine: {
            show: true,
            lineStyle: {
              //轴上的线样式
              color: "#979797",
              width: 0.6 //这里是为了突出显示加上的
            }
            // symbol: ['none', 'arrow'],
            // symbolSize: [6, 12],
            // symbolOffset: [0, 8]
          },
          axisTick: {
            show: false
          }
        },
        series: [
          // For shadow
          {
            type: "line",
            showSymbol: true, //显示折线拐点
            smooth: true,
            itemStyle: {
              color: "#2390FF"
            }, //线条样式
            lineStyle: {
              color: "#2390FF"
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#cae4ff" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            name: "昨天",
            z: 10,
            // animation: true,
            data: []
          },
          {
            type: "line",
            showSymbol: true, //显示折线拐点
            smooth: true,
            itemStyle: {
              //点样式
              color: "#3143FE"
            }, //线条样式
            lineStyle: {
              //折线样式
              color: "#3143FE"
            },
            areaStyle: {
              //区域样式
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#d1d5fe" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            name: "今天",
            // animation: true,
            data: []
          }
        ]
      }
    };
  },
  watch: {
    areasValue(value) {
      this.getCharData();
    },
    activeClass(value) {
      console.log(value);
      this.getCharData();
    }
  },
  mounted() {
    this.getOption();
    console.log(this.areasId);
    this.getCharData();
  },
  methods: {
    // 初始化按钮组
    getOption() {
      this.$store.dispatch("getDeveiceTypeSelect").then(res => {
        res.forEach(item => {
          item.icon = getIcon(item);
        });
        this.deveice_type = res;
      });
    },
    checkType(value) {
      this.activeClass = value;
    },
    getCharData() {
      let factor = this.activeClass;
      let areasValue = this.areasValue || "321fb20d38391d25e651026e9db79de6";
      this.$refs.echars.myChart.showLoading();
      reqDeveice(areasValue, factor).then(res => {
        this.$refs.echars.myChart.hideLoading();
        res = res.data.data;
        console.log(res);
        this.$refs.echars.myChart.setOption({
          series: [
            {
              name: "昨天",
              // data: [120, 132, 201, 134, 90, 230, 210]
              data: [24, 0, 25, 0, 16, 20, 24]
              // data: res.yesterday[1]
            },
            {
              name: "今天",
              // data: [220, 232, 201, 234, 120, 330, 410]
              data: res.today[1]
            }
          ]
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/reset.scss";
.deveice_trend {
  width: 100%;
  height: 100%;
}
.deveice_button {
  // border: 1px solid red;
  position: absolute;
  top: 21px;
  left: 7.5vw;
  font-size: 12px;
  display: flex;
  width: 35vw;
  z-index: 10;
  color: #262b40;
}
.deveice_button li {
  // border: 1px solid green;
  flex: 1;
}
.active {
  color: #11966b;
}
</style>
