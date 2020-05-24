<template>
  <ul class="layout_card">
    <li
      class="equi_card"
      v-for="(item, index) in equipmentCase"
      :key="index"
      :class="ChangeBgImg(item.type)"
    >
      <p>{{ item.type }}</p>
      <div class="context">
        <div class="left">
          <i class="iconfont" :class="ChangeIcon(item.type)"></i>
          <el-progress type="circle" :percentage="25" class="equi_chart">
          </el-progress>
        </div>
        <div class="right">
          <p>总设备：{{ item.count }}</p>
          <p>在线：{{ item.count }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  setup(props) {
    let equipmentCase = reactive([
      {
        type: "监控设备",
        count: 156,
        online: 146
      },
      {
        type: "土壤监测设备",
        count: 156,
        online: 146
      },
      {
        type: "空气监测设备",
        count: 156,
        online: 146
      },
      {
        type: "虫情监测设备",
        count: 156,
        online: 146
      },
      {
        type: "植物监测设备",
        count: 156,
        online: 146
      }
    ]);
    const ChangeBgImg = type => {
      if (type === "监控设备") {
        return "jiankong";
      } else if (type === "土壤监测设备") {
        return "turang";
      } else if (type === "空气监测设备") {
        return "kongqi";
      } else {
        return "chongqing";
      }
    };
    const ChangeIcon = type => {
      if (type === "监控设备") {
        return "iconjiankong";
      } else if (type === "土壤监测设备") {
        return "iconturanghuanjing";
      } else if (type === "空气监测设备") {
        return "iconkongqi";
      } else if (type === "虫情监测设备") {
        return "iconchongqingjiance-jian";
      } else if (type === "植物监测设备") {
        return "iconzhiwu";
      }
    };
    return {
      equipmentCase,
      ChangeBgImg,
      ChangeIcon
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/reset.scss";
.layout_card {
  // border: 1px solid green;
  display: flex;
  justify-content: space-between;
}

.equi_card {
  // border: 1px solid red;
  width: 11.875vw;
}

.equi_card > p {
  text-align: left;
  margin-top: 0.45vw;
  margin-left: 0.8vw;
  color: #fff;
  font-size: 1.25rem;
}

.context {
  // border: 1px solid red;
  display: flex;
  margin-top: 5%;
  font-weight: 400;
}

.left {
  margin-left: 0.9vw;
  margin-bottom: 1.7vh;
  // border: 1px solid red;
  position: relative;
}
.left > i {
  font-size: 1vh;
  position: absolute;
  top: 25%;
  width: 100%;
  color: #fff;
  z-index: 1;
}
.left ::v-deep .el-progress__text {
  // border: 1px solid red;
  margin-top: 12px;
  font-size: 0.6vw !important;
  color: #fff;
}
.left ::v-deep .el-progress-circle {
  // border: 1px solid red;
  width: 3.3vw !important;
  height: 6.3vh !important;
}
.right {
  margin-left: 1.75vw;
  margin-top: 1vh;
  text-align: center;
}
.right > p:first-child {
  font-size: 0.75vw;
  color: rgba(255, 255, 255, 1);
}
.right > p:last-child {
  font-size: 0.95vw;
  color: rgba(230, 183, 87, 1);
  margin-top: 5px;
}
.jiankong {
  background: url(../../../assets/mainpage/监控.png) no-repeat;
  background-size: 100% 100%;
}

.turang {
  background: url(../../../assets/mainpage/土壤监测.png) no-repeat;
  background-size: 100% 100%;
}

.kongqi {
  background: url(../../../assets/mainpage/空气监测.png) no-repeat;
  background-size: 100% 100%;
}

.chongqing {
  background: url(../../../assets/mainpage/虫情监测.png) no-repeat;
  background-size: 100% 100%;
}
</style>
