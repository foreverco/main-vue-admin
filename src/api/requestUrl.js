const requestUrl = {
  getGoodsList: "/mgmt/role",
  // 获取传感器列表
  getSensorList: "/device/sensor/sensorPage",
  // 获取设备预警列表
  getWarningConfigList: "/alert/alertSetting",
  // 获取采集站列表
  getcollectStatitions: "/device/collectionStation/collectStatitions",
  // 获取控制站列表
  getControlsList: "/device/controlStation/controlStations",
  // 获取继电器列表
  getRelaysList: "/device/relay/relayPage",
  // 获取农机农具列表
  getStockList: "/device/machinery/machineryPage",
  // 获取农机农具台账列表
  getUsageRecord: "/device/machineryUsageRecord/usageRecordPage",

  // 获取计划任务列表
  getPlancontrolList: "/setting/control/controlList",
  // 获取模拟量列表
  getRelayscontrolList: "/setting/simulate",

  // 角色表格
  getRoleList: "/auth/role",
  // 用户列表
  getUserList: "/auth/user"
};
export { requestUrl };
