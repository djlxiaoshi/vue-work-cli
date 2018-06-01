<template>
  <el-dialog
      custom-class="business-details-dialog"
      title="业务详情"
      :close-on-click-modal="false"
      :before-close="close"
      :visible.sync="dialogVisible"
    >
      <div class="dialog-body">
        <el-form ref="business-details-form" :model="copyData" label-width="180px"  size="mini" :rules="rules">
            <el-form-item label="业务名称" prop="bname">
              <el-input v-model="copyData.bname" placeholder="业务名称" size="small"></el-input>
            </el-form-item>
            <el-form-item label="kafka连接ip(hive)" prop="bkafka_ip">
              <el-input v-model="copyData.bkafka_ip" placeholder="kafka连接ip(hive)" size="small"></el-input>
            </el-form-item>
            <el-form-item label="kafka连接端口(hive)" prop="bkafka_port">
              <el-input v-model="copyData.bkafka_port" placeholder="kafka连接端口(hive)" size="small"></el-input>
            </el-form-item>
            <el-form-item label="kafka连接用户名(hive)" prop="bkafka_user">
              <el-input v-model="copyData.bkafka_user" placeholder="kafka连接用户名(hive)" size="small"></el-input>
            </el-form-item>
            <el-form-item label="kafka连接密钥(hive)" prop="bkafka_pkey">
              <el-input v-model="copyData.bkafka_pkey" placeholder="kafka连接密钥(hive)" size="small" type="textarea" :autosize="{ minRows: 1, maxRows: 4}"></el-input>
            </el-form-item>
          <el-form-item label="kafka连接ip(kudu)" prop="bkafka_ip_kudu">
            <el-input v-model="copyData.bkafka_ip_kudu" placeholder="kafka连接ip(kudu)" size="small"></el-input>
          </el-form-item>
          <el-form-item label="kafka连接端口(kudu)" prop="bkafka_port_kudu">
            <el-input v-model="copyData.bkafka_port_kudu" placeholder="kafka连接端口(kudu)" size="small"></el-input>
          </el-form-item>
          <el-form-item label="kafka连接用户名(kudu)" prop="bkafka_user_kudu">
            <el-input v-model="copyData.bkafka_user_kudu" placeholder="kafka连接用户名(kudu)" size="small"></el-input>
          </el-form-item>
          <el-form-item label="kafka连接密钥(kudu)" prop="bkafka_pkey_kudu">
            <el-input v-model="copyData.bkafka_pkey_kudu" placeholder="kafka连接密钥(kudu)" size="small" type="textarea" :autosize="{ minRows: 1, maxRows: 4}"></el-input>
          </el-form-item>
            <el-form-item label="hive数据库名" prop="bhive_db_name">
              <el-input v-model="copyData.bhive_db_name" placeholder="hive数据库名" size="small"></el-input>
            </el-form-item>
            <el-form-item label="hive连接ip" prop="bhive_ip">
              <el-input v-model="copyData.bhive_ip" placeholder="hive连接ip" size="small"></el-input>
            </el-form-item>
            <el-form-item label="hive连接端口" prop="bhive_port">
              <el-input v-model="copyData.bhive_port" placeholder="hive连接端口" size="small"></el-input>
            </el-form-item>
            <el-form-item label="hive用户名" prop="bhive_user">
              <el-input v-model="copyData.bhive_user" placeholder="hive用户名" size="small"></el-input>
            </el-form-item>
            <el-form-item label="hive登录密码" prop="bhive_password">
              <el-input v-model="copyData.bhive_password" placeholder="hive登录密码" size="small"></el-input>
            </el-form-item>
            <el-form-item label="impala数据库名" prop="bimpala_db_name">
              <el-input v-model="copyData.bimpala_db_name" placeholder="impala数据库名" size="small"></el-input>
            </el-form-item>
            <el-form-item label="impala连接ip" prop="bimpala_ip">
              <el-input v-model="copyData.bimpala_ip" placeholder="impala连接ip" size="small"></el-input>
            </el-form-item>
            <el-form-item label="impala端口" prop="bimpala_port">
              <el-input v-model="copyData.bimpala_port" placeholder="impala端口" size="small"></el-input>
            </el-form-item>
            <el-form-item label="zookeeper集群地址" prop="bzk_host">
              <el-input v-model="copyData.bzk_host" placeholder="zookeeper集群地址" size="small"></el-input>
            </el-form-item>
            <el-form-item label="zookeeper路径" prop="bzk_path">
              <el-input v-model="copyData.bzk_path" placeholder="zookeeper路径" size="small"></el-input>
            </el-form-item>
            <el-form-item label="hive表flume链接地址" prop="bflume_endpoint">
              <el-input v-model="copyData.bflume_endpoint" placeholder="hive表flume链接地址" size="small"></el-input>
            </el-form-item>
            <el-form-item label="kudo表kafaka connect链接地址" prop="bkafka_connector_endpoint">
              <el-input v-model="copyData.bkafka_connector_endpoint" placeholder="kudo表kafaka connect链接地址" size="small"></el-input>
            </el-form-item>
            <el-form-item label="kudo master host" prop="bkudu_master_host">
              <el-input v-model="copyData.bkudu_master_host" placeholder="kudo master host" size="small"></el-input>
            </el-form-item>
            <el-form-item label="业务管理员信息" prop="bmanager_workids">
              <div id="etl-person-selector"></div>
            </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">保 存</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { isInteger, isIp, isVariable, createScript } from 'utils';
export default {
  name: 'BusinessDetailsDialog',
  data () {
    const _isInteger = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('必填'));
      } else if (!isInteger(value)) {
        return callback(new Error('请输入整数'));
      } else {
        callback();
      }
    };

    const _isIp = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('必填'));
      } else if (!isIp(value)) {
        return callback(new Error('请输入正确ip'));
      } else {
        callback();
      }
    };

    const _isVariable = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('必填'));
      } else if (!isVariable(value)) {
        return callback(new Error('数据库名只能包含字母数字和下划线且不能以数字开头!'));
      } else {
        callback();
      }
    };

    return {
      copyData: {},
      dialogVisible: false,
      rules: {
        bname: [
          { required: true, message: '请输入业务名称', trigger: 'blur' }
        ],
        bkafka_ip: [
          { required: true, trigger: 'blur', validator: _isIp }
        ],
        bkafka_port: [
          { required: true, trigger: 'blur', validator: _isInteger }
        ],
        bkafka_user: [
          { required: true, message: '请输入kafka连接用户名(hive)', trigger: 'blur' }
        ],
        bkafka_pkey: [
          { required: true, message: '请输入kafka连接密钥(hive)', trigger: 'blur' }
        ],
        bkafka_ip_kudu: [
          { required: true, trigger: 'blur', validator: _isIp }
        ],
        bkafka_port_kudu: [
          { required: true, trigger: 'blur', validator: _isInteger }
        ],
        bkafka_user_kudu: [
          { required: true, message: '请输入kafka连接用户名(kudu)', trigger: 'blur' }
        ],
        bkafka_pkey_kudu: [
          { required: true, message: '请输入kafka连接密钥(kudu)', trigger: 'blur' }
        ],
        bhive_db_name: [
          { required: true, trigger: 'blur', validator: _isVariable }
        ],
        bhive_ip: [
          { required: true, trigger: 'blur', validator: _isIp }
        ],
        bhive_port: [
          { required: true, trigger: 'blur', validator: _isInteger }
        ],
        bhive_user: [
          { required: true, message: '请输入hive用户名', trigger: 'blur' }
        ],
        bhive_password: [
          { required: true, message: '请输入hive登录密码', trigger: 'blur' }
        ],
        bimpala_db_name: [
          { required: true, trigger: 'blur', validator: _isVariable }
        ],
        bimpala_ip: [
          { required: true, trigger: 'blur', validator: _isIp }
        ],
        bimpala_port: [
          { required: true, trigger: 'blur', validator: _isInteger }
        ],
        bzk_host: [
          { required: true, message: '请输入zookeeper集群地址', trigger: 'blur' }
        ],
        bzk_path: [
          { required: true, message: '请输入zookeeper路径', trigger: 'blur' }
        ],
        bflume_endpoint: [
          { required: true, message: '请输入hive表flume链接地址', trigger: 'blur' }
        ],
        bkafka_connector_endpoint: [
          { required: true, message: '请输入kudo表kafaka connect链接地址', trigger: 'blur' }
        ],
        bkudu_master_host: [
          { required: true, message: '请输入kudo master host', trigger: 'blur' }
        ],
        bmanager_workids: [
          { required: true, message: '业务管理员不能为空', trigger: 'change' }
        ]
      }
    };
  },
  props: ['data', 'mode'],
  components: {
  },
  mounted () {
  },
  methods: {
    initSelector (defaultSelect = []) {
      /* eslint-disable no-undef */
      $('#etl-person-selector').uCheck('etl-person-selector', defaultSelect, {
        size: 8,
        callback: (selectList) => {
          this.copyData['bmanager'] = selectList.join(',');
          this.copyData['bmanager_info'] = selectList.join(',');
          this.copyData['bmanager_workids'] = selectList.join(',');
        }
      });
    },
    open () {
      createScript('http://tool.oa.com/api/?id=uCheck2', () => {
        this.dialogVisible = true;
      });
    },
    close () {
      this.dialogVisible = false;
      this.resetForm('business-details-form');
    },
    paramsValidate () {},
    sendRequest () {
      const url = this.mode === 'add' ? 'business/add/' : 'business/update/';
      if (this.mode === 'edit') {
        this.copyData.bid = this.copyData.id;
        delete this.copyData.id;
      }
      this.$http.post(url, this.copyData).then(res => {
        this.close();
        this.$emit('confirm');
      });
    },
    save () {
      this.$refs['business-details-form'].validate((valid) => {
        if (valid) {
          this.sendRequest();
        } else {
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    dialogVisible (visible) {
      if (visible) {
        this.copyData = JSON.parse(JSON.stringify(this.data));
        this.$nextTick(() => {
          const defaultSelected = this.copyData['bmanager_workids'] ? this.copyData['bmanager_workids'].split(',') : [];
          this.initSelector(defaultSelected);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  /deep/ .business-details-dialog {
    min-width: 600px;
    width: 60%;
    .el-dialog__body {
      max-height: 400px;
      overflow: auto;
    }
    .dialog-body {
      min-width: 800px;
      .el-form {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .el-form-item {
          flex: 48%;
          text-align: left;
        }
      }
    }
  }
</style>
