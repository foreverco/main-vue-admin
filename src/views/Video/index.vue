<template>
  <div>
    <div id="videoBox">
      <Map id="map1" ref="map" :modify="data.modify" />
      <div class="listBox">
        <VideoTree
          @videomsg="videomsg"
          :treeData.sync="data.treeData"
        ></VideoTree>
      </div>
      <div class="playBox">
        <div class="videotitle">在线直播</div>
        <div class="btnBox">
          <span style="margin:0 5px;">布局排版</span>
          <div class="svgBox">
            <svg-icon iconClass="menu" className="menu"></svg-icon>
            <svg-icon iconClass="menu" className="menu"></svg-icon>
            <svg-icon iconClass="menu" className="menu"></svg-icon>
          </div>
          <div class="bigBox">
            <svg-icon iconClass="menu" className="menu"></svg-icon>
          </div>
        </div>
        <ul class="videoList">
          <li>
            <Video></Video>
          </li>
          <li><Video></Video></li>
          <li><Video></Video></li>
          <li><Video></Video></li>
          <li><Video></Video></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getVideoList } from "../../api/video";
import { reactive, onMounted, watch } from "@vue/composition-api";
import VideoTree from "./components/VideoTree";
import Map from "@/components/mapView/MapInfo";
import Video from "@/components/common/video";
export default {
  name: "viedeo",
  components: {
    VideoTree,
    Map,
    Video
  },
  setup(props, { root }) {
    const data = reactive({
      treeData: [],
      modify: ""
    });
    const videomsg = () => {
      getVideoList().then(res => {
        data.treeData = [];
        console.log(res);
        res.data.data.forEach(item => {
          let obj = {};
          let children = [];
          obj.label = item.areaName;
          obj.id = item.info[0].areaId;
          item.info.forEach(j => {
            let ob = {};
            ob = j;
            ob.label = j.name;
            ob.icon = j.videoType === "1" ? "qiangji" : "qiuji";
            children.push(ob);
          });
          obj.children = children;
          root.$set(data.treeData, data.treeData.length, obj);
        });
        console.log("data.treeData");
        console.log(data.treeData);
      });
    };
    watch(
      () => data.treeData,
      (nerVal, oldVal) => {
        console.log(13333333333323);
      }
    );
    // const clickVal = (arr, clicked) => {
    //   if (arr.length == 0) return;
    //   arr.forEach(ar => {
    //     // console.log(ar);
    //     toggleSelection(ar, clicked);
    //     if (ar.children) clickVal(ar.children);
    //   });
    // };
    onMounted(() => {
      videomsg();
    });
    return {
      data,
      videomsg
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";
#videoBox {
  position: relative;
  .listBox {
    position: absolute;
    top: 2vh;
    left: 2vh;
    height: 80vh;
    width: 16vw;
    background: #ffffff90;
    border-radius: 5px;
  }
  .playBox {
    position: absolute;
    top: 2vh;
    right: 2vh;
    height: 80vh;
    width: 16vw;
    background: #ffffff90;
    border-radius: 5px;
    padding: 0 1vw;
    .videotitle {
      height: 6vh;
      line-height: 6vh;
      font-size: 16px;
      font-weight: bold;
    }
    .btnBox {
      // border: 1px solid red;
      height: 4vh;
      line-height: 4vh;
      display: flex;
      align-items: center;
      // justify-content: space-around;
      position: relative;
      font-size: 12px;
      .svgBox {
        // border: 1px solid red;
        display: flex;
        align-items: center;
        svg {
          margin: 0 3px;
        }
        // margin-left: 0.5vw;
      }
      .bigBox {
        display: flex;
        align-items: center;
        // border: 1px solid red;
        position: absolute;
        right: 5%;
      }
    }
    .videoList {
      // border: 1px solid red;
      padding: 0;
      margin: 0;
      overflow: auto;
      height: 68vh;
      li {
        list-style: none;
        // border: 1px solid red;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
