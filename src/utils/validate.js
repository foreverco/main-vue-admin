import { MessageBox, Message } from "element-ui";
/**
 * 过滤特殊字符  */
export function stripscript(s) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——|{}【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !reg.test(value) ? true : false;
}

/* 测试弹框确认 */
export function confirm(params) {
  MessageBox.confirm(params.content, params.tip || "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: params.type || "warning",
    center: true
  })
    .then(() => {
      params.fn && params.fn(params.id);
      Message.success("删除成功");
    })
    .catch(() => {
      Message.info("已取消删除");
    });
}
