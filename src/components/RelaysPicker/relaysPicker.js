import {
  reqareas,
  reqControls,
  reqRelays,
  reqlargeArea
} from "../../api/common";
import { reactive, toRefs } from "@vue/composition-api";
export function relaysPicker() {
  const data = reactive({
    largeArea: [],
    // 区域列表
    areas: [],
    // 采集站列表
    controls: [],
    // 传感器
    relays: [],
    // 选中大区域
    largeAreaValue: "",
    // 选中区域
    areasValue: "",
    // 选中采集站
    controlsValue: "",
    // 选中传感器
    relaysValue: ""
  });

  const resultData = reactive({
    areasValue: "",
    // 选中采集站
    controlsValue: "",
    // 选中传感器
    relaysValue: ""
  });

  const getlargeArea = () => {
    console.log(123);
    reqlargeArea().then(res => {
      console.log(res.data.data);
      data.largeArea = res.data.data;
    });
  };

  // 选择大区域获取采集站
  let largeAreaValue = "";
  const handlelargeArea = val => {
    largeAreaValue = val;
    resetValue({ type: "largeArea" });
    reqareas({ regionId: val }).then(res => {
      console.log(res);
      data.areas = res.data.data;
    });
  };

  // 选择区域获取控制站
  let areaVal = "";
  const handleAreas = val => {
    areaVal = val;
    resetValue({ type: "areas" });
    reqControls({ areaId: val }).then(res => {
      console.log(res);
      data.controls = res.data.data;
    });
  };
  // 选择控制站获取继电器
  const handleControls = val => {
    resetValue({ type: "controls" });
    reqRelays({ areaId: areaVal, controlId: val }).then(res => {
      console.log(res);
      data.relays = res.data.data;
    });
  };
  const handleRelays = () => {
    resetValue({ type: "" });
  };
  /* 重置选项 */
  const resetValue = params => {
    const typeObj = {
      largeArea: ["areasValue", "controlsValue", "relaysValue"],
      areas: ["controlsValue", "relaysValue"],
      controls: ["relaysValue"]
    };
    const arrObj = typeObj[params.type];
    if (arrObj) {
      arrObj.forEach(element => {
        data[element] = "";
      });
    }
    // 数据集合
    result();
  };
  /* 返回数据集合 */
  const result = () => {
    for (let key in resultData) {
      resultData[key] = data[key];
    }
    console.log(resultData);
  };
  return {
    // ...toRefs(data), //把对象类型转换为基础数据类型，可进行解构响应
    data,
    resultData,
    getlargeArea,
    handlelargeArea,
    handleAreas,
    handleControls,
    handleRelays
  };
}
