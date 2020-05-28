<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="title">数据修改</span>
      </div>
      <div class="text item" style="width: 100%">
        <el-form
          ref="formValid"
          label-position="left"
          size="mini"
          :rules="menuRules"
          :model="menuData"
          label-width="100px"
        >
          <el-row>
            <el-col :span="10">
              <el-form-item :label="formLabel.status" prop="status">
                <el-switch
                  v-model="menuData.status"
                  :active-value="1"
                  :inactive-value="2"
                  inactive-text="锁定"
                  active-text="正常"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item :label="formLabel.show" prop="show">
                <el-switch
                  v-model="menuData.show"
                  :active-value="1"
                  :inactive-value="2"
                  inactive-text="隐藏"
                  active-text="显示"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="formLabel.menuName" prop="menuName">
                <el-input
                  v-model="menuData.menuName"
                  clearable
                  :placeholder="formLabel.menuName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="formLabel.name" prop="name">
                <el-input
                  v-model="menuData.name"
                  clearable
                  :placeholder="formLabel.name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item :label="formLabel.path" prop="path">
                <el-input
                  v-model="menuData.path"
                  clearable
                  :placeholder="formLabel.path"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="menuData.type == 'PAGE'">
            <el-col :span="20">
              <el-form-item :label="formLabel.componentUri" prop="componentUri">
                <el-input
                  v-model="menuData.componentUri"
                  clearable
                  :placeholder="formLabel.componentUri"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="formLabel.type" prop="type">
                <el-select
                  v-model="menuData.type"
                  @change="selectChange"
                  :placeholder="formLabel.type"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item of menuType"
                    :key="item.type"
                    :label="item.name"
                    :value="item.type"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="formLabel.icon" prop="icon">
                <el-input
                  v-model="menuData.icon"
                  clearable
                  :placeholder="formLabel.icon"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="formLabel.sort" prop="sort">
                <el-input
                  v-model="menuData.sort"
                  clearable
                  disabled
                  :placeholder="formLabel.sort"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="formLabel.remark" prop="remark">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  v-model="menuData.remark"
                  :placeholder="formLabel.remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div v-show="menuData.id">
          <el-button
            style="float: right; padding: 3px 0 ; margin-right: 20px"
            @click="saveData"
            :permission="'add,edit'"
            slot="reference"
            type="text"
            >保存
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MenuData",
  props: {
    menuData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formLabel: {
        show: "导航栏显示",
        status: "状态",
        menuName: "页面标题",
        path: "路由URL",
        name: "名称标识",
        componentUri: "视图URI",
        icon: "图标",
        type: "类型",
        sort: "排序值",
        remark: "备注"
      },
      //菜单栏类型
      menuType: [],
      URL: {
        //获取菜单类型接口
        getMenuType: "/mgmt/menu/menuType"
      }
    };
  },
  computed: {
    //表单规则
    menuRules: function() {
      const validateName = (rule, value, callback) => {
        this.validateMenuIdentify(value, callback);
      };

      const validateUriStart = (rule, value, callback) => {
        if (value && /^\//.test(value)) {
          callback(new Error("URI 不能以“/”开头"));
        }
        callback();
      };

      let rule = {
        menuName: [
          {
            required: true,
            message: `${this.formLabel.menuName}不能为空`,
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: `${this.formLabel.name}不能为空`,
            trigger: "blur"
          },
          { validator: validateName, trigger: "change" }
        ],
        path: [
          {
            required: true,
            message: `${this.formLabel.path}不能为空`,
            trigger: "blur"
          }
        ]
      };
      if (this.menuData.type === "PAGE") {
        rule.componentUri = [{ validator: validateUriStart, trigger: "blur" }];
        // rule.componentUri = [{required: true, message: `${this.formLabel.componentUri}不能为空`, trigger: 'blur'}]
      }
      return rule;
    }
  },
  methods: {
    saveData() {
      this.$refs["formValid"].validate(valid => {
        if (valid) {
          this.$confirm("确认保存？", "提示", {
            confirmButtonText: "保存",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              if (this.menuData.type === "DIRECTORY") {
                this.menuData.componentUri = "";
              }
              this.$emit("saveData", this.menuData);
            })
            .catch(() => {});
        }
      });
    },
    //获取菜单栏类型
    getMenuType() {
      this.$axios(this.URL.getMenuType, {}, this.METHOD.GET).then(res => {
        if (res.code == 200) {
          this.menuType = res.data;
        }
      });
    },
    //验证名称标识是否唯一
    async validateMenuIdentify(val, callback) {
      let param = {
        identify: val
      };
      if (this.menuData.id !== "add") param.id = this.menuData.id;
      let res = await this.$axios(
        "/validate/menuIdentify",
        param,
        this.METHOD.GET
      );
      if (res.code == 200 && res.data == true) {
        callback();
      } else {
        callback(new Error(`该${this.formLabel.name}已经存在`));
      }
    },
    selectChange(val) {}
  },
  created() {
    // this.getMenuType();
  },
  updated() {
    this.$refs.formValid.clearValidate();
  }
};
</script>

<style scoped>
.menu-tree {
  min-width: 400px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.title {
  display: inline-block;
  float: left;
}

.text {
  font-size: 14px;
}

.item {
  float: left;
  margin-bottom: 18px;
}
</style>
