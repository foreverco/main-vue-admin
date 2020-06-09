<template>
  <div>
    <el-dialog
      title="添加种植区域"
      :visible.sync="dialog_stock_flag"
      @close="close"
      center
    >
      <el-form :model="form">
        <el-row>
          <el-col :span="11">
            <div class="label-wrap sb_name">
              <label for="">区域名称: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.name"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="label-wrap sb_name">
              <label for="">编号: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.no"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div class="label-wrap sb_name">
              <label for="">所属区域 </label>
              <div class="warp-content">
                <Select
                  :config="configOption"
                  :isDisable="configOption.init.length > 0 ? false : true"
                />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <div class="label-wrap sb_name">
              <label for="">种植品种: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.varietes"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div class="label-wrap sb_name">
              <label for="">种植区域: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.plantArea"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="label-wrap sb_name">
              <label for="">种植时间: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.plantTime"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div class="label-wrap sb_name">
              <label for="">负责人: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.principalPerson"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="label-wrap sb_name">
              <label for="">联系电话: </label>
              <div class="warp-content">
                <el-input
                  v-model="form.contactNumber"
                  autocomplete="off"
                  style="width:100%"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="success" size="mini" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Select from "@/components/Select/index.vue";
import { mapState, mapActions } from "vuex";
import { addPlantArea } from "../../../../../api/monitoring.js";
import { Message } from "element-ui";
export default {
  name: "dialogStock",
  components: {
    Select
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    points: {
      type: String
    }
  },
  mounted() {
    // console.log(this.flag);
  },
  watch: {
    flag: {
      handler(val) {
        this.dialog_stock_flag = val;
      },
      deep: true
    }
  },
  data() {
    return {
      dialog_stock_flag: false, //弹框
      configOption: {
        init: []
      },
      form: {
        contactNumber: "", // 联系电话
        name: "", // 名称
        no: "", // 编号
        plantArea: "", // 种植区域
        plantTime: "", // 种植时间
        points: "", // 点位
        principalPerson: "", // 负责人
        region_id: "", // 大区域id,空值表示该条数据为大区域，非空表示大区域id
        varietes: "" // 种植品种
      }
    };
  },
  methods: {
    ...mapActions(["getAreaList"]),
    close() {
      this.dialog_stock_flag = false;
      this.$emit("update:flag", false);
    },
    submit() {
      this.form.points = this.points;
      let data = JSON.parse(JSON.stringify(this.form));
      console.log(data);
      addPlantArea(data)
        .then(res => {
          Message.success("添加成功");
          this.getAreaList();
        })
        .catch(erro => {
          Message.error("添加失败");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";

.el-row {
  margin: 20px 0;
}

.label-wrap {
  &.sb_name {
    @include babelDom(left, 70, 40);
  }

  &.sb_usestatus {
    @include babelDom(left, 70, 20);
  }
}
</style>
