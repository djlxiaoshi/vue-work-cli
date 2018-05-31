<template>
  <div class="interface-query">
    <AppTable
      :loading="loading"
      :title="'接口查询'"
      :tableRows="20"
      :tableColumns="tableColumns"
      :tableData="APIList"
      :options="options"
      @optionsReady="optionsReady"
      @optionsSelectedChange="change"
    >
      <template slot="custom-toolbar">
        <el-button type="primary" size="mini" @click="openAddDialog()" class="custom-toolbar-wrap">新增自定义接口</el-button>
      </template>
      <template slot="operate" slot-scope="scope">
        <el-button type="warning" @click="apiEdit(scope.row)" class="etl-btn mini" icon="el-icon-edit" title="编辑" :disabled="scope.row.status !== 1"></el-button>
        <el-button type="default" @click="openConfigDialog(scope.row)" class="etl-btn mini" icon="el-icon-setting" title="配置" :disabled="scope.row.status === 0"></el-button>
        <el-button type="success" @click="toggle(scope.row, true)" class="etl-btn mini" icon="el-icon-check" title="启用" v-if="scope.row.status === 0 || scope.row.status === 1"></el-button>
        <el-button type="danger" @click="toggle(scope.row, false)" class="etl-btn mini" icon="el-icon-close" title="禁用" v-if="scope.row.status === 2"></el-button>
      </template>
    </AppTable>

    <AddConfigDialog ref="configDialog" :id="currentRow['id']" :status="currentRow['status']"></AddConfigDialog>
    <AddApiDialog ref="addApiDialog" :data="apiData" :mode="addApiDialogMode" @confirm="getAPIList(bid)"></AddApiDialog>
  </div>
</template>

<script>
import AddApiDialog from './AddApiDialog';
import AddConfigDialog from './AddConfigDialog.vue';
export default {
  name: 'Interface',
  data () {
    return {
      loading: false,
      interface_name: '',
      interface_label: '',
      primary_table: '',
      data_type: '',
      primary_database: '',
      primary_database_label: '',
      options: [
        {
          type: 'dropdown',
          labelName: 'bname',
          valueName: 'id',
          query: {
            url: 'business/list/',
            params: {type: 'my'}
          },
          sync: true
        }
      ],
      myBusinessList: [],
      tableColumns: [
        { label: '业务名称', field: 'bname' },
        { label: '接口名称', field: 'api' },
        { label: '接口中文注释', field: 'api_desc' },
        { label: '接口创建人信息', field: 'creater_user_info' },
        { label: '数据库表', field: 'api_table' },
        { label: '数据库表注释', field: 'api_table_desc' },
        { label: 'api数据类型', field: 'api_data_type' },
        { label: 'api接口数据量', field: 'api_flume_template' },
        { label: '状态名称', field: 'status_name' },
        { label: '最后更新人', field: 'updater_user_info' },
        { label: '操作', field: 'operate', width: 150, fixed: 'right' }
      ],
      APIList: [],
      bid: '',
      apiData: {
        bid: '',
        api: '',
        api_desc: '',
        api_table: '',
        api_table_desc: '',
        api_data_type: '',
        api_flume_template: ''
      },
      currentRow: {},
      addApiDialogMode: 'add'
    };
  },
  props: [],
  components: {
    AddApiDialog,
    AddConfigDialog
  },
  async mounted () {

  },
  methods: {
    getAPIList (bid) {
      this.loading = true;
      this.$http.get('api/list/', {bid: bid}).then(data => {
        this.loading = false;
        this.APIList = data.data;
      });
    },
    optionsReady (options) {
      this.bid = options[0].selected || options[0].list[0].value;
      this.apiData.bid = this.bid;
      this.getAPIList(this.bid);
    },
    openAddDialog () {
      this.apiData = {};
      Object.keys(this.apiData).forEach(key => {
        this.apiData[key] = '';
      });
      this.addApiDialogMode = 'add';
      this.apiData.bid = this.bid;
      this.$refs.addApiDialog.open();
    },
    openConfigDialog (row) {
      this.currentRow = row;
      this.$refs.configDialog.open();
    },
    change ({value, index, option, options}) {
      if (index === 0) {
        this.getAPIList(value);
        this.bid = value;
      }
    },
    apiEdit (row) {
      this.currentRow = row;
      this.apiData = JSON.parse(JSON.stringify(row));
      this.addApiDialogMode = 'edit';
      this.$refs.addApiDialog.open();
    },
    async toggle (row, flag) {
      const status = (row.status === 0 || row.status === 1) ? 2 : 0;
      this.currentRow = row;
      if (flag) {
        const result = await this.getApiConfigFields(row.id);
        if (!result.data.api_fields.length) {
          this.$notice.error({
            title: 'Error',
            message: '参数配置不能为空'
          });
          return;
        }
      }
      this.$confirm(`确定${flag ? '开启' : '禁用'}吗?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('api/switch/status/', {
          api_id: row.id,
          status: status
        }).then(res => {
          row.status = status;
        });
      }).catch(() => {});
    },
    getApiConfigFields (id) {
      return this.$http.get('api/detail/', {api_id: id});
    }
  }
};
</script>

<style lang="scss" scoped>
  /deep/ .add-dialog {
    .list-item {
      justify-content: center;
      .title {
        flex: 0 0 150px;
        margin-right: 50px
      }
      .value {
        flex: 0 0 215px;
      }
    }
  }
  /deep/ .config-dialog {
    .dialog-body {
      .-etl-list-group {
        border: 1px solid $appBorderColor;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        display: flex;
        flex-flow: wrap;
        margin-bottom: 20px;
        .list-item {
          flex: 40%;
          margin: 10px 20px;
          .title{
          }
          .value {
          }
        }
      }
    }
  }
</style>
