<template>
  <AppTable
    title="我的申请"
    :tableRows="20"
    :border="true"
    :tableColumns="tableColumns"
    :tableData="myApplyList"
  >
    <template slot="audit_info" slot-scope="scope">
      {{ scope.row.status == 2 ? scope.row['audit_user_info'] : scope.row['current_audit_user_info']}}
    </template>
  </AppTable>
</template>

<script>
export default {
  name: 'MyApplication',
  data () {
    return {
      tableColumns: [
        { label: '业务id', field: 'bid' },
        { label: '业务名称', field: 'bname' },
        { label: '申请人', field: 'user_info' },
        { label: '审核员', slotName: 'audit_info' },
        { label: '申请原因', field: 'reason' },
        { label: '申请时间', field: 'create_time' },
        { label: '审核时间', field: 'audit_time' },
        { label: '审核说明', field: 'audit_remark' },
        { label: '审核状态', field: 'status_name' }
      ],
      myApplyList: []
    };
  },
  props: [],
  mounted () {
    this.getApplyList();
  },
  methods: {
    getApplyList () {
      this.$http.get('auth/my/apply/').then(data => {
        this.myApplyList = data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
