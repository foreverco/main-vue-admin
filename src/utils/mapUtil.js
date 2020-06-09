/**
 * 解析区域点位
 * @param {Object}
 * @return {String}
 */
export function analyticPoint(points) {
  let zuobiao = [];
  points.forEach(zb => {
    zuobiao.push({
      longitude: zb[0],
      latitude: zb[1]
    });
  });
  return JSON.stringify(zuobiao);
}
/**
 * 反向解析点位
 * @param {String} points
 * @return {Array}
 */
export function reverseResolutionPoint(points) {
  if (points) {
    let result = JSON.parse(points);
    // console.log(result);
    let _points = result.map(item => {
      let zb = [parseFloat(item.longitude), parseFloat(item.latitude)];
      return zb;
    });
    return _points;
  } else {
    return -1;
  }
}

/**
 * 解析配置项
 * @param {Object}
 * @param {type} 0 表示区域统计  1表示设备类别
 * @return {Array}
 */
export function getChartOption(obj, type) {
  let Attr = []; //配置项
  if (type == 0) {
    Object.keys(obj).forEach((key, index) => {
      // console.log(key, index, obj[key]);
      let optionTemp = {}; // 单个配置项
      if (key === "a01007") {
        optionTemp.title = "风速";
        optionTemp.x = obj[key][0];
        optionTemp.data = obj[key][1];
        Attr[index] = optionTemp;
      } else if (key === "w01001") {
        optionTemp.title = "PH值";
        optionTemp.x = obj[key][0];
        optionTemp.data = obj[key][1];
        Attr[index] = optionTemp;
      } else if (key === "a01001") {
        optionTemp.title = "空气温度";
        optionTemp.x = obj[key][0];
        optionTemp.data = obj[key][1];
        Attr[index] = optionTemp;
      }
    });
  } else if (type == 1) {
    Object.keys(obj).forEach((key, index) => {
      // console.log(key, index, obj[key]);
      let optionTemp = {}; // 单个配置项
      optionTemp.x = obj[key][0];
      optionTemp.data = obj[key][1];
      let title = obj[key][3] + "";
      optionTemp.title = title;
      Attr[index] = optionTemp;
    });
  }
  return Attr;
}
/**
 * 设备类型图标
 * @param {Array}} item
 * @return {String} iconClass
 */
export function getIcon(item) {
  let iconClass = "";
  if (item.label == "空气温度") {
    iconClass = "iconkongqiwendu";
  } else if (item.label == "风速") {
    iconClass = "iconfengsu1";
  } else if (item.label == "ph") {
    iconClass = "iconturanghuanjing";
  }
  return iconClass;
}
