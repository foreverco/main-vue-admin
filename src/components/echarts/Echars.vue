<template>
  <div class="layout_chart">
    <div id="myChart" ref="chart"></div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          grid: {
            top: "15%",
            right: "10%",
            left: "10%"
          },
          xAxis: [
            {
              type: "category",
              data: ["现在", "12点", "1点", "2点", "3点", "4点", "5点"],
              show: false
            }
          ],
          yAxis: [
            {
              show: false
            }
          ],
          series: [
            {
              data: [13, 26, 27, 35, 21, 21, 25],
              type: "line",
              smooth: true,
              name: "折线图",
              symbol: "circle",
              symbolSize: 8,
              label: {
                normal: {
                  offset: [0, 25],
                  show: true,
                  formatter: "{b}\n\n{c}°",
                  color: "#fff"
                }
              }
            }
          ]
        };
      }
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.$echarts.init(this.$refs.chart);
    this.myChart = myChart;
    this.drawLine(this.option);
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  watch: {
    option(option) {
      this.drawLine(option);
    }
  },
  methods: {
    drawLine(option) {
      // 绘制图表
      this.myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.layout_chart {
  width: 100%;
  height: 100%;
  // background-color: #0000ff;
}
#myChart {
  width: 100%;
  height: 100%;
}
</style>
