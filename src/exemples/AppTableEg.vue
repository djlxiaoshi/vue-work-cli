<template>
  <AppTable
    title="数据库表配置"
    :tableRows="20"
    :tableColumns="tableColumns"
    :tableData="tableData"
    :hasEdit="true"
    @onEdit="edit"
  >
  </AppTable>
</template>

<script>

export default {
  name: 'AppTableEg',
  data () {
    return {
      tableColumns: [
        { label: '表类型', field: 'type' },
        { label: '库名', field: 'database_name' },
        { label: '数据表', field: 'table_name' },
        { label: '表名', field: 'table_label' },
        { label: '描述', field: 'description' },
        { label: '权限等级', field: 'weight' },
        { label: '是否可见', field: 'visible', formatter: (value, row) => value === 0 ? '否' : '是' },
        { label: '操作', field: 'operate', width: 300 }
      ],
      tableData: [
        { type: '流水表', database_name: '1', table_name: 'd', table_label: 'D', description: '', weight: '0', visible: 0 },
        { type: '流水表', database_name: '2', table_name: 'j', table_label: 'J', description: '', weight: '1', visible: 1 },
        { type: '流水表', database_name: '3', table_name: 'l', table_label: 'L', description: '', weight: '2', visible: 0 }
      ]
    };
  },
  props: [],
  methods: {
    edit (row) {
      console.log(row);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
