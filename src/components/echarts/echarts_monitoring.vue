<template>
  <div class="layout_chart">
    <p>{{ this.option.title }}</p>
    <div id="myChart" ref="chart"></div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    option(option) {
      this.drawLine(option);
    }
  },
  methods: {
    // 初始化
    init() {
      let myChart = this.$echarts.init(this.$refs.chart);
      this.myChart = myChart;
      this.drawLine();
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    drawLine() {
      // 绘制图表
      this.myChart.setOption({
        grid: {
          top: "15%",
          right: "10%",
          left: "15%"
        },
        xAxis: [
          {
            type: "category",
            // data: ["现在", "12点", "1点", "2点", "3点", "4点", "5点"],
            data: this.option.x,
            show: true,
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          }
        ],
        yAxis: [
          {
            // data: ["现在", "12点", "1点", "2点", "3点", "4点", "5点"],
            show: true
          }
        ],
        series: [
          {
            // data: [13, 26, 27, 35, 21, 21, 25],
            data: this.option.data,
            type: "line",
            smooth: true,
            name: "折线图",
            symbol: "circle",
            symbolSize: 8,
            label: {
              normal: {
                offset: [0, 0],
                show: true,
                formatter: "{c}",
                color: "#000"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/reset.scss";
.layout_chart {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
}
.layout_chart > p {
  // border: 1px solid blue;
  margin-top: 20px;
}
#myChart {
  width: 100%;
  height: 85%;
}
</style>
