import { reqWeather, reqWeatherMsg, reqWarning } from "../../api/home.js";
import { reqDeviceType } from "../../api/monitoring.js";
import {
  RECEIVE_WEATHER,
  RECEIVE_WEATHERMSG,
  RECEIVE_DEVEICETYPE,
  RECEIVE_WARNING
} from "./mutations-type.js";
const state = {
  weather: {}, // 实况天气
  weather_msg: {}, // 七日天气
  deviceType: [], //设备类型下拉框
  warningList: [] // 告警列表
};
const getters = {};
const mutations = {
  [RECEIVE_WEATHER](state, weather) {
    state.weather = weather;
  },
  [RECEIVE_WEATHERMSG](state, weather_msg) {
    state.weather_msg = weather_msg;
  },
  [RECEIVE_DEVEICETYPE](state, deveice_type_attr) {
    state.device_type = deveice_type_attr;
  },
  [RECEIVE_WARNING](state, warninglist) {
    state.warninglist = warninglist;
  }
};
const actions = {
  // 获取实况天气
  getWeather({ commit }) {
    return new Promise((resolve, reject) => {
      reqWeather()
        .then(res => {
          const weather = res.data;
          commit(RECEIVE_WEATHER, weather);
          resolve(weather);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取七日天气
  getWeatherMsg({ commit }) {
    return new Promise((resolve, reject) => {
      reqWeatherMsg()
        .then(res => {
          const weather_msg = res.data.data[0];
          // console.log(weather_msg);
          commit(RECEIVE_WEATHERMSG, weather_msg);
          resolve(weather_msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取设备下拉框
  getDeveiceTypeSelect({ commit }) {
    return new Promise((resolve, reject) => {
      reqDeviceType()
        .then(res => {
          const device_type = res.data.data;
          const deveice_type_attr = [];
          device_type.forEach(item => {
            let init = {};
            init.value = item.value;
            init.label = item.name;
            deveice_type_attr.push(init);
          });
          console.log(deveice_type_attr);
          commit(RECEIVE_DEVEICETYPE, deveice_type_attr);
          resolve(deveice_type_attr);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 告警信息
  getWarningList({ commit }) {
    return new Promise((resolve, reject) => {
      reqWarning()
        .then(res => {
          const warninglist = res.data.data;
          // console.log(warninglist);
          commit(RECEIVE_WARNING, warninglist);
          resolve(warninglist);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
