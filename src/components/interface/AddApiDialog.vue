<template>
  <el-dialog
    custom-class="interface-add-api-dialog"
    :title="mode === 'add' ? '新增接口' : '编辑'"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <div class="dialog-body">
      <ul class="-etl-list-group">
        <li class="list-item">
          <span class="title">接口名称</span>
          <span class="value">
            <el-input v-model="data.api" placeholder="请输入接口名称" size="small"></el-input>
          </span>
        </li>
        <li class="list-item">
          <span class="title">接口中文注释</span>
          <span class="value">
            <el-input v-model="data.api_desc" placeholder="请输入接口中文注释" size="small"></el-input>
          </span>
        </li>
        <li class="list-item">
          <span class="title">原始数据表</span>
          <span class="value">
            <el-input v-model="data.api" placeholder="请输入原始表名称" size="small" disabled></el-input>
          </span>
        </li>
        <li class="list-item">
          <span class="title">原始数据表说明</span>
          <span class="value">
            <el-input v-model="data.api_table_desc" placeholder="请输入原始表说明" size="small"></el-input>
          </span>
        </li>
        <li class="list-item">
          <span class="title">api数据类型</span>
          <span class="value">
            <el-radio-group v-model="data.api_data_type" size="mini">
              <el-radio-button label="csv">hive</el-radio-button>
              <el-radio-button label="avro">kudo</el-radio-button>
            </el-radio-group>
          </span>
        </li>
        <li class="list-item">
          <span class="title">api接口数据量</span>
          <span class="value">
            <el-radio-group v-model="data.api_flume_template" size="mini">
              <el-radio-button label="small"></el-radio-button>
              <el-radio-button label="medium"></el-radio-button>
              <el-radio-button label="big"></el-radio-button>
            </el-radio-group>
          </span>
        </li>
        <template v-if="mode === 'edit'">
          <li class="list-item">
            <span class="title">状态</span>
            <span class="value">{{data.status_name}}</span>
          </li>
          <li class="list-item">
            <span class="title">创建者</span>
            <span class="value">{{data.creater_user_info}}</span>
          </li>
          <li class="list-item">
            <span class="title">最后修改者</span>
            <span class="value">{{data.updater_user_info}}</span>
          </li>
          <li class="list-item">
            <span class="title">上次修改时间</span>
            <span class="value">{{data.updated_time}}</span>
          </li>
        </template>
      </ul>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">保 存</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddApi',
  data () {
    return {
      dialogVisible: false
    };
  },
  props: [
    'visible',
    'data',
    'mode'
  ],
  methods: {

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
      const result = this.paramsValidate(params);
      if (typeof result === 'string') {
        this.$notice.warning({
          title: 'Warning',
          message: result
        });
      } else if (typeof result === 'boolean' && result) {
        this.sendRequest(params);
      }
    },
    paramsValidate (params) {
      const api = params.api && params.api.trim();
      const apiDesc = params.api_desc && params.api_desc.trim();
      const apiTable = params.api_table && params.api_table.trim();
      const apiTableDesc = params.api_table_desc && params.api_table_desc.trim();
      const apiDataType = params.api_data_type;
      const apiDataSize = params.api_flume_template;
      if (!api) {
        return '接口名称不能为空';
      } else {
        const regexp = /^[a-zA-Z]/;
        if (!regexp.test(api)) {
          return '接口名称需以英文字母开头';
        }
      }
      if (!apiDesc) return '接口中文注释不能为空';
      if (!apiTable) return '原始数据表不能为空';
      if (!apiTableDesc) return '原始数据表描述不能为空';
      if (!apiDataType) return '请选择API数据类型';
      if (!apiDataSize) return '请选择API数据量';
      return true;
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
