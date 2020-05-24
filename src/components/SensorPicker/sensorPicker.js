import { reqareas, reqStatitions, reqSensors } from "../../api/common";
import { reactive, toRefs } from "@vue/composition-api";
export function sensorPicker() {
  const data = reactive({
    // 区域列表
    areas: [],
    // 采集站列表
    statitions: [],
    // 传感器
    sensors: [],
    // 选中区域
    areasValue: "",
    // 选中采集站
    statitionsValue: "",
    // 选中传感器
    sensorsValue: ""
  });

  const resultData = reactive({
    areasValue: "",
    // 选中采集站
    statitionsValue: "",
    // 选中传感器
    sensorsValue: ""
  });

  // 获取区域
  const getareas = () => {
    reqareas().then(res => {
      console.log(res.data.data);
      data.areas = res.data.data;
    });
  };
  // 获取采集站
  // const getStatitions = () => {
  //   reqStatitions().then(res => {
  //     console.log(res);
  //     data.statitions = res.data.data;
  //   });
  // };
  // // 获取传感器
  // const getSensors = () => {
  //   reqSensors().then(res => {
  //     console.log(res);
  //     data.sensors = res.data.data;
  //   });
  // };

  // 选择区域获取采集站
  let areaVal = "";
  const handleAreas = val => {
    areaVal = val;
    resetValue({ type: "areas" });
    reqStatitions({ areaId: val }).then(res => {
      console.log(res);
      data.statitions = res.data.data;
    });
  };
  // 选择采集站获取传感器
  const handleStatitions = val => {
    resetValue({ type: "statitions" });
    reqSensors({ areaId: areaVal, collectStatitionId: val }).then(res => {
      console.log(res);
      data.sensors = res.data.data;
    });
  };
  const handleSensors = () => {
    resetValue({ type: "" });
  };
  /* 重置选项 */
  const resetValue = params => {
    const typeObj = {
      areas: ["statitionsValue", "sensorsValue"],
      statitions: ["sensorsValue"]
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
    getareas,
    handleAreas,
    handleStatitions,
    handleSensors
  };
}