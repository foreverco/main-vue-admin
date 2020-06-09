<template>
  <div>
    <div id="map_button" @click="begin_draw" title="手绘区域">
      <i class="iconfont iconditu"></i>
    </div>
    <div id="map" ref="rootmap"></div>
    <!--新增弹框-->
    <DialogStock
      :flag.sync="dialog_stock"
      :points="points"
      :selectList="init"
    ></DialogStock>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults } from "ol/control";
import Control from "ol/control/Control";
import Source from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import { Draw, Modify, Snap } from "ol/interaction";
import DialogStock from "./components/dialog/addDrawAlert.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    DialogStock
  },
  props: {
    // 操作类型,添加/删除
    modify: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["areaList"])
  },
  mounted() {
    this.createMap();
    this.areaDrawLayer();
    this.getAreaList();
    this.createButton();
    console.log(this.areaList);
    // this.test();
  },
  data() {
    return {
      map: null,
      shapeType: "None",
      dialog_stock: false, // 添加弹框
      init: [], // 下拉框初始化
      // 区域绘制图层实例
      drawInstance: {
        source: "",
        layer: "",
        draw: "",
        snap: ""
      },
      points: [] // 区域点位信息
    };
  },
  watch: {
    shapeType(val) {
      this.createRouteDraw(val);
    }
  },
  methods: {
    ...mapActions(["getAreaList"]),
    // 地图初始化
    createMap() {
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          projection: "EPSG:4326", //使用这个坐标系
          center: [114.064839, 22.548857], //深圳
          zoom: 12
        }),
        controls: defaults({
          zoom: false,
          attribution: false
        })
      });
    },
    // 初始化绘制区域图层
    areaDrawLayer() {
      //实例化数据源
      this.drawInstance.source = new Source({
        wrapX: false
      });
      //实例化图层
      this.drawInstance.layer = new Vector({
        source: this.drawInstance.source
      });
      // this.showRouteGeometry()
      this.map.addLayer(this.drawInstance.layer);
      console.log(this.drawInstance);
    },
    // 地图控件按钮
    createButton() {
      let map_button = document.getElementById("map_button");
      let ButtonControl = new Control({
        //定义一个控件
        element: map_button
      });
      //然后添加到地图上
      this.map.addControl(ButtonControl);
    },
    begin_draw() {
      this.shapeType = "Polygon";
    },
    //区域创建画笔
    createRouteDraw(shapeType) {
      let value = shapeType;
      let draw, snap;

      if (shapeType === "None") {
        this.map.removeInteraction(this.drawInstance.draw);
        this.map.removeInteraction(this.drawInstance.snap);
      }

      if (shapeType !== "None") {
        draw = new Draw({
          source: this.drawInstance.source,
          type: value
        });
        snap = new Snap({
          source: this.drawInstance.source
        });
        this.drawInstance.draw = draw;
        this.drawInstance.snap = snap;

        this.map.addInteraction(this.drawInstance.draw);
        this.map.addInteraction(this.drawInstance.snap);

        // 添加监听
        this.drawInstance.draw.on("drawend", event => {
          this.shapeType = "None";
          this.dialog_stock = true;
          let geometry = event.feature.getGeometry();
          let points = geometry.getCoordinates();
          // this.points = points;
          console.log(points);
          // let arr = [];
          // for (let i = 0; i < points[0].length; i++) {
          //   // let point = {};
          //   // point.lon = points[i];
          //   // arr.push(obj);
          //   console.log(points[i]);
          // }
          points.foreach(function(point) {
            console.log(point);
          });
          // console.log(arr);
          // var wgs = transform(points, "EPSG:3857", "EPSG:4326");
          // var out = format(points[0][0], "{x},{y}", 2);
          // console.log(out);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: 70vh;
  width: 100%;
}

/*隐藏ol的一些自带元素*/
.ol-attribution,
.ol-zoom {
  display: none;
}

/*按钮控件*/
#map_button {
  background-color: rgb(38, 43, 64);
  width: 25px;
  color: #fff;
}
</style>
