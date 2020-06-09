import {
  reqAreaList,
  reqDeveiceAreaList,
  reqAreaDetail
} from "../../api/monitoring.js";
import {
  RECEIVE_AREALIST,
  RECEIVE_DEVEICEAREALIST,
  RECEIVE_AREADETAILLIST
} from "./mutations-type.js";
const state = {
  areaList: [], // 区域列表
  deveiceAreaList: [],
  areaDetailList: {} // 种植区域详情
};
const getters = {};
const mutations = {
  [RECEIVE_AREALIST](state, areaList) {
    state.areaList = areaList;
  },
  [RECEIVE_DEVEICEAREALIST](state, deveiceAreaList) {
    state.deveiceAreaList = deveiceAreaList;
  },
  [RECEIVE_AREADETAILLIST](state, areaDetailList) {
    state.areaDetailList = areaDetailList;
  }
};
const actions = {
  // 获取区域列表
  getAreaList({ state, commit }) {
    return new Promise((resolve, reject) => {
      reqAreaList()
        .then(res => {
          const areaList = JSON.parse(JSON.stringify(res.data.data));
          console.log(areaList);
          commit(RECEIVE_AREALIST, areaList);
          resolve(areaList);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 监测中心获取列表信息
  getMonitoringAreaList({ state, commit, data }) {
    return new Promise((resolve, reject) => {
      reqDeveiceAreaList(data)
        .then(res => {
          const deveiceAreaList = JSON.parse(JSON.stringify(res.data.data));
          console.log(deveiceAreaList);
          commit(RECEIVE_DEVEICEAREALIST, deveiceAreaList);
          resolve(deveiceAreaList);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取详情
  getAreaDetail({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      reqAreaDetail(data)
        .then(res => {
          const areaDetailList = JSON.parse(JSON.stringify(res.data.data));
          console.log(areaDetailList);
          commit(RECEIVE_AREADETAILLIST, areaDetailList);
          resolve(areaDetailList);
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
