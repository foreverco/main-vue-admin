<template>
  <!--配置种植区域页面-->
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
// import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults } from "ol/control";
import Control from "ol/control/Control";
import Source from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import { Draw, Modify, Snap, Select } from "ol/interaction";
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
import { Style, Icon, Text, Fill, Stroke, Circle } from "ol/style";
import DialogStock from "./dialog/addDrawAlert2.0.vue";
import {
  analyticPoint,
  reverseResolutionPoint
} from "../../../../utils/mapUtil.js";
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
    this.createButton();
    this.areaDrawLayer();
    this.areaShowLayer();
    this.featureClick();
  },
  data() {
    return {
      map: null,
      shapeType: "None",
      dialog_stock: false, // 添加弹框
      init: [], // 下拉框初始化
      // 区域绘制实例
      drawInstance: {
        source: "",
        layer: "",
        draw: "",
        snap: ""
      },
      // 展示图层实例
      areaInstance: {
        source: "",
        layer: ""
      },
      points: ""
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
    // 初始化展示图层
    areaShowLayer() {
      this.areaInstance.source = new Source({ wrapX: false });
      this.areaInstance.layer = new Vector({
        visible: true,
        name: "areaShowLayer",
        source: this.areaInstance.source
      });
      this.showPlantArea();
      this.map.addLayer(this.areaInstance.layer);
    },
    // 初始化绘制图层
    areaDrawLayer() {
      this.drawInstance.source = new Source({ wrapX: false });
      this.drawInstance.layer = new Vector({
        visible: true,
        name: "areaDrawLayer",
        source: this.drawInstance.source
      });
      this.map.addLayer(this.drawInstance.layer);
    },
    begin_draw() {
      this.shapeType = "Polygon";
    },
    //回显区域
    showPlantArea() {
      this.getAreaList().then(res => {
        // console.log(res);
        res.forEach(res => {
          // console.log(res);
          let _points = [reverseResolutionPoint(res.points)];
          this.createArea(res.id, _points, res.name);
        });
        // console.log(this.areaInstance.source.getFeatures());
      });
    },
    // 创建区域
    createArea(area_id, _points, name) {
      var polygonFeature = new Feature({
        geometry: new Polygon(_points)
      });
      polygonFeature.id_ = area_id;
      polygonFeature.setStyle(
        new Style({
          stroke: new Stroke({
            color: "red",
            lineDash: [4],
            width: 3
          }),
          fill: new Fill({
            color: "rgba(255, 0,0 , 0.1)"
          }),
          text: new Text({
            text: name,
            fill: new Fill({
              color: "#fff"
            })
          })
        })
      );
      this.areaInstance.source.addFeature(polygonFeature);
    },
    //区域创建画笔
    createRouteDraw(shapeType) {
      // debugger;
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
          this.points = analyticPoint(points[0]);
          console.log(this.points);
          // var wgs = transform(points, "EPSG:3857", "EPSG:4326");
          // var out = format(points[0][0], "{x},{y}", 2);
          // console.log(out);
        });
      }
    },
    featureClick() {
      let selectSingleClick = new Select();
      this.map.addInteraction(selectSingleClick);
      selectSingleClick.on("select", function(e) {
        var features = e.target.getFeatures().getArray();
        if (features.length > 0) {
          // console.log(features[0].values_);
          console.log(features[0].id_);
        }
      });
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
