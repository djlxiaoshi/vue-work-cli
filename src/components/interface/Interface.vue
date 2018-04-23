<template>
  <div class="interface-query">
    <AppTable
      :title="'dsfgbdfr'"
      :tableRows="3"
      :border="true"
      :tableColumns="tableColumns"
      :tableData="tableData"
    ></AppTable>
  </div>
</template>

<script>
import AppTable from '@/components/shared/app-table/AppTable.vue';
export default {
  name: 'Interface',
  data () {
    return {
      tableColumns: [
        { label: '名字', field: 'name' },
        { label: '年龄', field: 'age' },
        { label: '操作', field: 'operate', width: 300 }
      ],
      tableData: [
        { name: '王小虎', age: 25 },
        { name: '王小虎1', age: 26 },
        { name: '王小虎2', age: 27 },
        { name: '王小虎3', age: 28 },
        { name: '王小虎4', age: 29 },
        { name: '王小虎5', age: 30 }
      ]
    };
  },
  props: [],
  components: {
    AppTable
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
