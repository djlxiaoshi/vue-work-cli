<template>
  <div class="app-table">
    <div class="toolbar">
      <span class="title">{{ title }}</span>
    </div>
    <el-table
      v-loading="loading"
      :data="showTableData"
      style="width: 100%"
      :border="border"
      :height="height">
      <el-table-column
        v-for="columns in tableColumns"
        :key="columns['field']"
        :fixed="columns['fixed']"
        :prop="columns['field']"
        :label="columns['label']"
        :width="columns['width']">
        <template slot-scope="scope">
          <div v-if="columns['field'] === 'operate'">
            <el-button type="info" plain size="mini" @click="details(scope.row)">详情</el-button>
            <el-button type="warning" plain size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="del(scope.row)">删除</el-button>
            <slot name="operate" :row="scope.row"></slot>
          </div>
          <div v-else>
            <template v-if="columns['filter']">
            </template>
            <template v-else>
              {{ scope.row[columns['field']] }}
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <footer class="footer" v-if="tableData.length > tableRows">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="tableRows"
        :total="tableData.length"
        @current-change="pageChange($event)"
      >
      </el-pagination>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AppTable',
  data () {
    return {
      showTableData: this.tableData
    };
  },
  props: ['tableColumns', 'tableData', 'height', 'border', 'loading', 'title', 'tableRows'],
  mounted () {
    this.setCurrentPageTableData(0, this.tableRows);
  },
  methods: {
    pageChange (page) {
      const start = (page - 1) * this.tableRows;
      const end = page * this.tableRows;
      this.setCurrentPageTableData(start, end);
    },
    setCurrentPageTableData (start, end) {
      this.showTableData = this.tableData.slice(start, end);
    },
    details (row) {
      this.$emit('onDetails', row);
    },
    edit (row) {
      this.$emit('onEdit', row);
    },
    del (row) {
      this.$emit('onDelete', row);
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-table {
    position: relative;
    box-shadow: rgba(0,0,0,.2) 0 2px 2px 0;
    .toolbar {
      display: flex;
      align-items: center;
      height: 35px;
      border: 1px solid #EBEEF5;
      .title {
        padding-left: 10px;
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
    }
  }
</style>
