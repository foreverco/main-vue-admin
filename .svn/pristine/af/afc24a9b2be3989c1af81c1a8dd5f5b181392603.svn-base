import { MessageBox, Message } from "element-ui";
export default {
  install(Vue, options) {
    Vue.prototype.confirm = params => {
      console.log("global");
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
    };
  }
};
