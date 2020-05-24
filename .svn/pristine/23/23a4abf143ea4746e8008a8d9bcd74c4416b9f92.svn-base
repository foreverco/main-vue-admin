import { MessageBox, Message } from "element-ui";
import { ref } from "@vue/composition-api";
export function global() {
  const str = ref("4444444");
  const confirm = params => {
    MessageBox.confirm(params.content, params.tip || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: params.type || "warning",
      center: true
    })
      .then(() => {
        str.value = "删除成功删除成功删除成功删除成功";
        params.fn && params.fn(params.id);
        Message.success("删除成功");
      })
      .catch(() => {
        Message.info("已取消删除");
      });
  };

  return {
    str,
    confirm
  };
}
