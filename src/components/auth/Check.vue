<template>
  <AppTable
    title="权限审批"
    :tableRows="3"
    :border="true"
    :tableColumns="tableColumns"
    :tableData="tableData"
  ></AppTable>
</template>

<script>
export default {
  name: 'Check',
  data () {
    return {
      tableColumns: [
        { label: '申请人', field: 'applicant' },
        { label: '申请角色', field: 'role' },
        { label: '业务申请', field: 'business' },
        { label: '申请时间', field: 'time' },
        { label: '操作', field: 'operate', width: 300 }
      ],
      tableData: [
        { applicant: '王小虎', role: '管理员', business: '数据支付部', time: '2018-04-23' },
        { applicant: '王小虎1', role: '业务管理', business: '数据支付部', time: '2018-04-23' },
        { applicant: '王小虎2', role: '普通用户', business: '数据支付部', time: '2018-04-23' },
        { applicant: '王小虎3', role: '管理员', business: '数据支付部', time: '2018-04-23' }
      ]
    };
  },
  props: [],
  components: {
  },
  methods: {},
  mounted () {
  },
  destroyed () {
  }
};
</script>

<style lang="scss" scoped>

</style>
