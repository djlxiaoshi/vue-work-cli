<template>
  <el-dialog
      custom-class="business-details-dialog"
      title="业务详情"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <div class="dialog-body">
        <ul class="-etl-list-group">
          <li class="list-item">
            <span class="title">业务名称</span>
            <span class="value">
            <el-input v-model="copyData.bname" placeholder="业务名称" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">业务英文名称</span>
            <span class="value">
            <el-input v-model="copyData.bename" placeholder="业务英文名称" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">kafka连接ip</span>
            <span class="value">
            <el-input v-model="copyData.bkafka_ip" placeholder="kafka连接ip" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">kafka连接端口</span>
            <span class="value">
            <el-input v-model="copyData.bkafka_port" placeholder="kafka连接端口" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">kafka连接用户名</span>
            <span class="value">
            <el-input v-model="copyData.bkafka_user" placeholder="kafka连接用户名" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">kafka连接密钥</span>
            <span class="value">
            <el-input v-model="copyData.bkafka_pkey" placeholder="kafka连接密钥" size="small" type="textarea" :autosize="{ minRows: 1, maxRows: 4}"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">kafka 业务 topic</span>
            <span class="value">
            <el-input v-model="copyData.bkafka_topic" placeholder="kafka 业务 topic" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">hive连接ip</span>
            <span class="value">
            <el-input v-model="copyData.bhive_ip" placeholder="hive连接ip" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">hive连接端口</span>
            <span class="value">
            <el-input v-model="copyData.bhive_port" placeholder="hive连接端口" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">hive用户名</span>
            <span class="value">
            <el-input v-model="copyData.bhive_user" placeholder="hive用户名" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">hive登录密码</span>
            <span class="value">
            <el-input v-model="copyData.bhive_password" placeholder="hive登录密码" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">hive库名称</span>
            <span class="value">
            <el-input v-model="copyData.bhive_db_name" placeholder="hive库名称" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">impala连接ip</span>
            <span class="value">
            <el-input v-model="copyData.bimpala_ip" placeholder="impala连接ip" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">impala端口</span>
            <span class="value">
            <el-input v-model="copyData.bimpala_port" placeholder="impala端口" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">impala用户</span>
            <span class="value">
            <el-input v-model="copyData.bimpala_user" placeholder="impala用户" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">impala密码</span>
            <span class="value">
            <el-input v-model="copyData.bimpala_password" placeholder="impala密码" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">impala库名称</span>
            <span class="value">
            <el-input v-model="copyData.bimpala_db_name" placeholder="impala库名称" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">zookeeper集群地址</span>
            <span class="value">
            <el-input v-model="copyData.bzk_host" placeholder="zookeeper集群地址" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">zookeeper路径</span>
            <span class="value">
            <el-input v-model="copyData.bzk_path" placeholder="zookeeper路径" size="small" disabled></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">hive表flume链接地址</span>
            <span class="value">
            <el-input v-model="copyData.bflume_endpoint" placeholder="hive表flume链接地址" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">kudo表kafaka connect链接地址</span>
            <span class="value">
            <el-input v-model="copyData.bkafka_connector_endpoint" placeholder="kudo表kafaka connect链接地址" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">kudo master host</span>
            <span class="value">
            <el-input v-model="copyData.bkudo_master_host" placeholder="kudo master host" size="small"></el-input>
          </span>
          </li>
          <li class="list-item">
            <span class="title">业务管理员信息</span>
            <span class="value">
                <div id="etl-person-selector"></div>
          </span>
          </li>
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
  name: 'BusinessDetailsDialog',
  data () {
    return {
      copyData: {},
      dialogVisible: false
    };
  },
  props: ['data', 'mode'],
  mounted () {
  },
  methods: {
    initSelector (defaultSelect = []) {
      /* eslint-disable no-undef */
      $('#etl-person-selector').uCheck('etl-person-selector', defaultSelect, {
        callback: (selectList) => {
          this.copyData['bmanager'] = selectList.join(',');
          this.copyData['bmanager_info'] = selectList.join(',');
        }
      });
    },
    open () {
      this.dialogVisible = true;
    },
    close () {
      this.dialogVisible = false;
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
      this.sendRequest();
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
  .business-details-dialog {
    .dialog-body {
      max-height: 500px;
      overflow: auto;
      .-etl-list-group {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .list-item {
          flex: 0 0 48%;
          margin: 10px 0;
          .title {
            flex: 0 0 150px;
          }
        }
      }
    }
  }
</style>
