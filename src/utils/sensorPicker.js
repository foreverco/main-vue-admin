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

  // 获取区域
  const getareas = () => {
    resetValue({ type: "areas" });
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
  const handleAreas = val => {
    resetValue({ type: "statitions" });
    reqStatitions().then(res => {
      console.log(res);
      data.statitions = res.data.data;
    });
  };
  // 选择采集站获取传感器
  const handleStatitions = () => {
    reqSensors().then(res => {
      console.log(res);
      data.sensors = res.data.data;
    });
  };
  /* 重置选项 */
  const resetValue = params => {
    const typeObj = {
      areas: ["statitionsValue", "sensorsValue"],
      statitions: ["sensorsValue"]
    };
    const arrObj = typeObj[params.type];
    arrObj.forEach(element => {
      data[element] = "";
    });
  };
  return {
    ...toRefs(data), //把对象类型转换为基础数据类型，可进行解构响应
    getareas,
    handleAreas,
    handleStatitions
  };
}
