<template>
  <div class="dialog">
    <el-dialog
      title="添加种植区域"
      :visible.sync="dialog_stock_flag"
      @close="close()"
      center
      v-dialogDrag
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="区域名称" prop="name" required>
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域编号" prop="no">
              <el-input v-model="ruleForm.no"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form prop="regionId" class="regionId">
            <SensorPicker
              :sensorPickerLevel="['largeArea']"
              v-on:update:sensorData="sensorData = $event"
            ></SensorPicker>
            <!-- {{ sensorData.largeAreaValue }} -->
          </el-form>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="种植品种" prop="varietes" wid>
              <el-input v-model="ruleForm.varietes"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="种植区域" prop="plantArea">
              <el-input v-model="ruleForm.plantArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="种植时间">
            <el-col :span="11">
              <el-form-item prop="plantTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.plantTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2"></el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人 " prop="principalPerson" required>
              <el-input v-model="ruleForm.principalPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="ruleForm.contactNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            type="primary"
            @click="submit('ruleForm')"
            style="float: right"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Select from "@/components/Select/index.vue";
import SensorPicker from "@/components/SensorPicker/index.vue";
import { mapState, mapActions } from "vuex";
import { addPlantArea } from "@/api/monitoring";
import { Message } from "element-ui";
import "../../../../utils/directives";
export default {
  name: "dialogStock",
  components: {
    Select,
    SensorPicker
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
  inject: ["reload"],
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
    /* 验证区域名称 */
    var validateAreaname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入区域名称"));
      } else {
        callback();
      }
    };
    /**验证负责人 */
    var validatePrincipalPerson = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入负责人"));
      } else {
        callback();
      }
    };
    /**验证联系电话 */
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系电话"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };
    return {
      dialog_stock_flag: false, //弹框
      sensorData: {},
      configOption: {
        init: []
      },
      ruleForm: {
        contactNumber: "", // 联系电话
        name: "", // 名称
        no: "", // 编号
        plantArea: "", // 种植区域
        plantTime: "", // 种植时间
        points: "", // 点位
        principalPerson: "", // 负责人
        regionId: "", // 大区域id,空值表示该条数据为大区域，非空表示大区域id
        varietes: "" // 种植品种
      },
      rules: {
        name: [
          { required: true, validator: validateAreaname, trigger: "blur" }
        ],
        principalPerson: [
          {
            required: true,
            validator: validatePrincipalPerson,
            trigger: "blur"
          }
        ],
        contactNumber: [{ validator: validatePhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["getAreaList"]),
    close() {
      this.dialog_stock_flag = false;
      this.$emit("update:flag", false);
    },
    submit(formName) {
      this.ruleForm.points = this.points;
      this.ruleForm.regionId = this.sensorData.largeAreaValue;
      let data = JSON.parse(JSON.stringify(this.ruleForm));
      console.log(data);
      this.$refs[formName].validate(valid => {
        if (valid) {
          addPlantArea(data)
            .then(res => {
              this.reload();
              this.close();
              Message.success("添加成功");
            })
            .catch(erro => {
              Message.error("添加失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.dialog {
  widows: 40%;
}
.regionId {
  margin-left: 30px;
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
