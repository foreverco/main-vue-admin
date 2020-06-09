<template>
  <div class="today_weather">
    <div class="today_weather_header">
      <span>
        <i class="iconfont icondizhi"></i>
        <span>{{ weather.city }}</span>
      </span>
      <span>{{ weather.date }}</span>
      <span>{{ weather.week }}</span>
    </div>
    <div class="today_weather_panel">
      <el-progress type="dashboard" :percentage="percentage"></el-progress>
      <i
        class="iconfont"
        :class="weather.wea_img"
        style="color:#ffffff;font-size=16px;"
      ></i>
      <div class="teather_desc">
        <p>{{ weather.tem }}°</p>
        <p>{{ weather.wea }}/{{ weather.win }}</p>
      </div>
    </div>
    <div class="weather_msg">
      <WeatherMsg :weather="weather" />
    </div>
    <div class="weather_chart">
      <Echars :option="weatherOption" :chartType="weather_msg" />
    </div>
  </div>
</template>

<script>
import WeatherMsg from "./WeatherMsg.vue";
import Echars from "../../../components/echarts/Echars.vue";
import {
  ref,
  reactive,
  onMounted,
  onBeforeMount,
  computed,
  watch
} from "@vue/composition-api";
export default {
  components: {
    WeatherMsg,
    Echars
  },
  setup(props, { refs, root }) {
    const weather = computed(() => root.$store.state.home.weather);
    const weather_msg = ref("weather");
    const percentage = computed(() => root.$store.state.home.weather.tem);
    const weatherOption = reactive({
      grid: {
        top: "25%",
        right: "8%",
        left: "8%",
        bottom: "0"
      },
      xAxis: [
        {
          type: "category",
          show: false
        }
      ],
      yAxis: [
        {
          show: false
        }
      ],
      tooltip: {
        trigger: "axis",
        formatter: "{b}\n\n\n{c}°"
      },
      series: [
        {
          type: "line",
          smooth: true,
          name: "天气",
          color: "#fff",
          symbol: "circle",
          symbolSize: 6,
          itemStyle: {
            borderColor: "#F1C15F",
            borderWidth: 2,
            shadowColor: "rgba(0, 0, 0, .3)"
          },
          label: {
            normal: {
              offset: [0, 35],
              show: true,
              formatter: "{b}\n\n\n{c}°",
              color: "#fff"
            }
          }
        }
      ]
    });
    onMounted(() => {});
    return {
      weather,
      percentage,
      weather_msg,
      weatherOption
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/reset.scss";
/*今日天气*/
.today_weather {
  // width: rem(371);
  height: rem(576);
  margin-top: rem(16);
  background-color: #262b40;
  border-radius: 8px;
  background-image: url(../../../assets/mainpage/cloudbg.png);
  background-size: rem(167) rem(154);
  background-repeat: no-repeat;
  background-position: 98% 18%;
  .today_weather_header {
    // border: 1px solid red;
    color: rgb(255, 255, 255, 1);
    display: flex;
    padding: rem(44) rem(54) rem(52) rem(54);
    font-size: rem(14);
    .icondizhi {
      font-size: rem(12);
      margin-right: rem(1);
    }
    span:first-child {
      flex: 1;
      text-align: left;
    }
    span:last-child {
      flex: 1;
      text-align: right;
    }
  }
  .today_weather_panel {
    position: relative;
    height: rem(171);
    // border: 1px solid red;
    i {
      position: absolute;
      // border: 1px solid red;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -65%);
      font-size: rem(59);
    }
    .teather_desc {
      width: 100%;
      color: #fff;
      position: absolute;
      bottom: 0;
      // border: 1px solid red;
      p:first-child {
        font-size: rem(25);
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      p:last-child {
        margin-top: 1vh;
        font-size: rem(18);
        color: #e6b757;
      }
    }
  }
  .weather_msg {
    // border: 1px solid red;
    margin-left: rem(33);
    margin-right: rem(30);
    margin-top: rem(35);
  }
  .weather_chart {
    height: rem(166);
  }
}
.today_weather_panel ::v-deep .el-progress-circle {
  width: rem(150) !important;
  height: rem(129) !important;
}
.today_weather_panel ::v-deep .el-progress__text {
  display: none;
}
</style>
