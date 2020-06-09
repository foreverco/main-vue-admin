import service from "../utils/request";
/* 区域下拉列表 */
export function getVideoList() {
  return service.request({
    method: "get",
    url: "/media/video/videos"
  });
}

/* 添加或修改视频设备 */
export function addVideoList(params) {
  return service.request({
    method: "post",
    url: "/media/video/video",
    params: params
  });
}
