<template>
  <el-dialog
    custom-class="interface-add-api-dialog"
    :title="mode === 'add' ? '新增接口' : '编辑'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :before-close="close"
    width="50%"
  >
    <div class="dialog-body">
      <el-form ref="interface-add-form" :model="data" label-width="150px"  size="small" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="接口名称" prop="api">
              <el-input v-model="data.api" placeholder="接口名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接口中文注释" prop="api_desc">
              <el-input v-model="data.api_desc" placeholder="接口中文注释"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="原始数据表" prop="api">
              <el-input v-model="data.api" placeholder="原始表名称"  disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原始数据表说明" prop="api_table_desc">
              <el-input v-model="data.api_table_desc" placeholder="原始表说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="api数据类型" prop="api_data_type">
              <el-radio-group v-model="data.api_data_type">
                <el-radio-button label="csv">hive</el-radio-button>
                <el-radio-button label="avro">kudo</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="api接口数据量" prop="api_flume_template">
              <el-radio-group v-model="data.api_flume_template">
                <el-radio-button label="small"></el-radio-button>
                <el-radio-button label="medium"></el-radio-button>
                <el-radio-button label="big"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="mode === 'edit'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="状态">
                <span class="value">{{data.status_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建者">
                <span class="value">{{data.creater_user_info}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="最后修改者">
                <span class="value">{{data.updater_user_info}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上次修改时间">
                <span class="value">{{data.updated_time}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submitForm('interface-add-form')">保 存</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddApi',
  data () {
    const isCharacter = (rule, value, callback) => {
      if (!/[a-zA-Z]/g.test(value)) {
        return callback(new Error('仅支持英文字母'));
      }
    };
    return {
      dialogVisible: false,
      rules: {
        api: [
          { required: true, message: '请输入正确接口名称（仅支持英文字母）', trigger: 'blur', validator: isCharacter }
        ],
        api_desc: [
          { required: true, message: '请输入接口中文注释', trigger: 'blur' }
        ],
        api_table_desc: [
          { required: true, message: '请输入原始数据表说明', trigger: 'blur' }
        ],
        api_data_type: [
          { required: true, message: '请选择api数据类型', trigger: 'change' }
        ],
        api_flume_template: [
          { required: true, message: '请选择api接口数据量', trigger: 'change' }
        ]
      }
    };
  },
  props: [
    'visible',
    'data',
    'mode'
  ],
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save();
        } else {
          return false;
        }
      });
    },
    save () {
      const params = {
        api: this.data.api,
        api_desc: this.data.api_desc,
        api_table: this.data.api, // 与API接口名称保持一致
        api_table_desc: this.data.api_table_desc,
        api_data_type: this.data.api_data_type,
        api_flume_template: this.data.api_flume_template
      };
      if (this.mode === 'add') {
        params['bid'] = this.data.bid;
      } else {
        params['api_id'] = this.data.id;
      }
      this.sendRequest(params);
    },
    sendRequest (params) {
      const url = this.mode === 'add' ? 'api/add/' : 'api/update/';
      this.$http.post(url, params).then(data => {
        this.$emit('confirm');
        this.close();
      });
    },
    open () {
      this.dialogVisible = true;
    },
    close () {
      this.dialogVisible = false;
      this.resetForm('interface-add-form');
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
  .interface-add-api-dialog {
    .-etl-list-group {
      display: flex;
      flex-wrap: wrap;
      .list-item {
        flex: 0 0 45%;
      }
      .title {
        flex: 0 0 100px;
      }
      .value {
      }
    }
  }
</style>
