<template>
  <div class="business-manage">
    <AppTable
      title="业务列表"
      :loading="loading"
      :tableRows="20"
      :border="true"
      :tableColumns="tableColumns"
      :tableData="tableData"
    >
      <template slot="custom-toolbar">
        <el-button type="primary" size="mini" @click="addBusiness()" class="custom-toolbar-wrap">新增业务</el-button>
      </template>
      <template slot="operate" slot-scope="scope">
        <el-button type="primary" @click="openDetailsDialog(scope.row)" class="etl-btn mini" icon="el-icon-info" title="详情"></el-button>
        <el-button type="danger" @click="delBusiness(scope.row)" class="etl-btn mini" icon="el-icon-delete" title="删除"></el-button>
      </template>
    </AppTable>

    <BusinessDetailsDialog :data="currentRow" ref="detailsDialog" :mode="mode" @confirm="confirm()"></BusinessDetailsDialog>
  </div>
</template>

<script>
import BusinessDetailsDialog from './BusinessDetailsDialog';
export default {
  name: 'business-list',
  data () {
    return {
      tableColumns: [
        { label: '业务名称', field: 'bname' },
        { label: 'kafka连接ip', field: 'bkafka_ip' },
        { label: 'kafka连接端口', field: 'bkafka_port' },
        { label: 'kafka连接用户名', field: 'bkafka_user' },
        { label: 'kafka连接密码', field: 'bkafka_password' },
        { label: 'hive连接ip', field: 'bhive_ip' },
        { label: 'hive连接端口', field: 'bhive_port' },
        { label: 'hive用户名', field: 'bhive_user' },
        { label: 'hive登录密码', field: 'bhive_password' },
        { label: 'hive库名称', field: 'bhive_db_name' },
        { label: 'impala连接ip', field: 'bimpala_ip' },
        { label: 'impala端口', field: 'bimpala_port' },
        { label: 'impala 用户', field: 'bimpala_user' },
        { label: 'impala 密码', field: 'bimpala_password' },
        { label: 'impala 库名称', field: 'bimpala_db_name' },
        { label: 'zookeeper集群地址', field: 'bzk_host' },
        { label: 'zookeeper路径', field: 'bzk_path' },
        { label: 'hive表flume链接地址', field: 'bflume_endpoint' },
        { label: 'kudo表kafaka connect链接地址', field: 'bkudo_endpoint' },
        { label: '业务管理员信息', field: 'bmanager_info' },
        { label: '业务状态', field: 'bstatus' },
        { label: '操作', field: 'operate', width: 100, fixed: 'right' }
      ],
      tableData: [],
      currentRow: {},
      mode: 'add',
      loading: false
    };
  },
  props: [],
  components: {
    BusinessDetailsDialog
  },
  mounted () {
    this.getBusinessList();
  },
  methods: {
    getBusinessList () {
      this.loading = true;
      this.$http.get('business/admin/list/').then(data => {
        this.tableData = data.data;
        this.loading = false;
      });
    },
    openDetailsDialog (row) {
      this.currentRow = row;
      this.mode = 'edit';
      this.$refs.detailsDialog.open();
    },
    addBusiness () {
      this.currentRow = {};
      this.mode = 'add';
      this.$refs.detailsDialog.open();
    },
    del (params) {
      return this.$http.post('business/delete/', params);
    },
    delBusiness (row) {
      this.currentRow = row;
      this.$confirm('是否删除该业务?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del({bid: row.id}).then(res => {
          this.getBusinessList();
        });
      }).catch(() => {});
    },
    confirm () {
      this.getBusinessList();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
