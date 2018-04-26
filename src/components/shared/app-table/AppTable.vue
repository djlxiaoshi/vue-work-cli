<template>
  <div class="app-table">
    <div class="toolbar">
      <span class="title">{{ title }}</span>
      <el-input placeholder="请输入内容" v-model="searchText" size="mini" class="search"></el-input>
      <slot name="custom-toolbar"></slot>
    </div>
    <el-table
      v-loading="loading"
      :data="currentPageData"
      :sortable="true"
      :border="border"
      :height="height"
      :header-cell-style="{
        'background': '#EBEEF5',
        'padding': '5px 0'
      }">
      <el-table-column
        v-for="columns in tableColumns"
        :key="columns['field']"
        :fixed="columns['fixed']"
        :prop="columns['field']"
        :label="columns['label']"
        :width="columns['width']"
        :sortable="columns['field'] !== 'operate'"
        :sort-by="sortBy"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <div v-if="columns['field'] === 'operate'">
            <el-button type="info" plain size="mini" @click="details(scope.row)" v-if="hasDetails">详情</el-button>
            <el-button type="warning" plain size="mini" @click="edit(scope.row)" v-if="hasEdit">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="del(scope.row)" v-if="hasDelete">删除</el-button>
            <slot name="operate" :row="scope.row"></slot>
          </div>
          <div v-else>
            <template v-if="columns['slotName']">
              <slot :name="columns['slotName']" :row="scope.row"></slot>
            </template>
            <template v-else-if="columns['formatter']">
              {{ columns['formatter'](scope.row) }}
            </template>
            <template v-else>
              {{ scope.row[columns['field']] }}
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <footer class="footer">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="tableRows"
        :total="computedTableData.length"
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
      currentPageData: [],
      computedTableData: this.tableData || [],
      total: this.tableData.length,
      searchText: '',
      noSearchFields: ['operate'] // 不参与查询的字段
    };
  },
  props: {
    tableColumns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number
    },
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    tableRows: {
      type: Number,
      default: 10
    },
    formatterHandler: {
      type: Function
    },
    sortBy: {
      type: String | Array | Function
    },
    hasDetails: {
      type: Boolean,
      default: false
    },
    hasEdit: {
      type: Boolean,
      default: false
    },
    hasDelete: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.setCurrentPageTableData(this.tableData, 0, this.tableRows);
  },
  methods: {
    pageChange (page) {
      const data = this.computedTableData;
      const start = (page - 1) * this.tableRows;
      const end = page * this.tableRows;
      this.setCurrentPageTableData(data, start, end);
      this.$emit('onPageChange', page);
    },
    setCurrentPageTableData (tableData, start, end) {
      this.currentPageData = tableData.slice(start, end);
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
  },
  watch: {
    searchText (value) {
      if (value.trim() === '') {
        this.computedTableData = this.tableData;
      } else {
        this.computedTableData = this.tableData.filter(row => {
          return this.tableColumns.some(column => {
            if (!this.noSearchFields.includes(column['field'])) {
              if (!row[column['field']]) return false;
              return !!~row[column['field']].indexOf(value);
            }
            return false;
          });
        });
      }
      const data = this.computedTableData;
      this.setCurrentPageTableData(data, 0, this.tableRows);
    },
    tableData (data) {
      this.setCurrentPageTableData(data, 0, this.tableRows);
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-table {
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    font-size: 12px;
    .el-table {
      font-size: 12px;
    }
    .toolbar {
      display: flex;
      align-items: center;
      height: 35px;
      border: 1px solid #EBEEF5;
      padding: 0 10px;
      .title {
        margin-right: 10px;
        min-width: 100px;
        text-align: left;
      }
      >.-toolbar-right{
        margin-left: auto;
      }
      .custom-toolbar-wrap {
        margin: 0 10px;
      }
      .search{
        max-width: 200px;
        height: 28px;
        margin: 0 10px 0 auto;
        /deep/ .el-input__inner {
          border-color: #DCDFE6;
          &:focus {
            border-color: #DCDFE6;
          }
        }
      }
    }
    /deep/ .el-table td{
      padding: 7px 0;
      color: rgba(0, 0, 0, 0.65);
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      border-left: 1px solid #EBEEF5;
      border-right: 1px solid #EBEEF5;
    }
  }
</style>
