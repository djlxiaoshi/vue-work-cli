<template>
  <AppTable
    title="我的申请"
    :tableRows="3"
    :border="true"
    :tableColumns="tableColumns"
    :tableData="myApplyList"
  ></AppTable>
</template>

<script>
import Http from '@/assets/js/utils/http';
export default {
  name: 'MyApplication',
  data () {
    return {
      tableColumns: [
        { label: '业务id', field: 'bid' },
        { label: '业务名称', field: 'bname' },
        { label: '当前审核用户', field: 'business' },
        { label: '最终审核用户信息', field: 'audit_user_info' },
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
      Http.get('auth/my/apply/').then(data => {
        this.myApplyList = data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
