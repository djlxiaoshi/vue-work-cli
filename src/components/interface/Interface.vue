<template>
  <div class="interface-query">
    <AppTable
      :title="'接口查询'"
      :tableRows="3"
      :tableColumns="tableColumns"
      :tableData="tableData"
    >
      <template slot="custom-toolbar">
        <el-button type="primary" size="mini" @click="openConfigDialog()">新增自定义接口</el-button>
      </template>
    </AppTable>

    <el-dialog
      custom-class="add-dialog"
      title="新增自定义接口"
      :visible.sync="addDialogVisible"
      width="40%"
      >
        <ul class="-etl-list-group">
          <li class="list-item">
            <span class="title">原始数据库</span>
            <span class="value">
              <el-select v-model="primary_database" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li class="list-item">
            <span class="title">接口名称</span>
            <span class="value">
              <el-input placeholder="请输入接口名称" v-model="interface_name" size="small"></el-input>
            </span>
          </li>
          <li class="list-item">
            <span class="title">接口中文注释</span>
            <span class="value">
              <el-input placeholder="请输入中文注释" v-model="interface_label" size="small"></el-input>
            </span>
          </li>
          <li class="list-item">
            <span class="title">原始数据表</span>
            <span class="value">
              <el-input placeholder="请输入原始数据表" v-model="primary_table" size="small"></el-input>
            </span>
          </li>
          <li class="list-item">
            <span class="title">原始数据表中文解释</span>
            <span class="value">
              <el-input placeholder="请输入原始数据表中文解释" v-model="primary_database_label" size="small"></el-input>
            </span>
          </li>
          <li class="list-item">
            <span class="title">数据保存类型</span>
            <span class="value">
              <el-select v-model="data_type" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
        </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      custom-class="config-dialog"
      title="接口配置"
      :visible.sync="configDialogVisible"
      width="50%"
    >
      <div class="dialog-body">
        <ul class="-etl-list-group">
          <li class="list-item">
            <span class="title">接口类型</span>
            <span class="value">type</span>
          </li>
          <li class="list-item">
            <span class="title">状态</span>
            <span class="value">禁用</span>
          </li>
          <li class="list-item">
            <span class="title">创建</span>
            <span class="value">sdgvsd</span>
          </li>
          <li class="list-item">
            <span class="title">最后修改者</span>
            <span class="value">sdgbs</span>
          </li>
          <li class="list-item">
            <span class="title">上次修改时间</span>
            <span class="value">3245让45435</span>
          </li>
        </ul>
        <div class="config-table">
          <AppTable
            :title="'参数配置'"
            :tableRows="3"
            :tableColumns="configDialogTableColumns"
            :tableData="configDialogTableData"
          >
            <template slot="custom-toolbar">
              <el-button type="primary" size="mini">新增参数</el-button>
            </template>
          </AppTable>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="configDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="configDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Interface',
  data () {
    return {
      addDialogVisible: false,
      configDialogVisible: false,
      interface_name: '',
      interface_label: '',
      primary_table: '',
      data_type: '',
      primary_database: '',
      primary_database_label: '',
      options: [
        {value: '选项1', label: '双皮奶1'},
        {value: '选项2', label: '双皮奶2'},
        {value: '选项3', label: '双皮奶3'}
      ],
      tableColumns: [
        { label: '业务部门', field: 'department' },
        { label: '原始数据库', field: 'database' },
        { label: '接口名称', field: 'interface_name' },
        { label: '接口中文注释', field: 'interface_label' },
        { label: '原始数据表', field: 'primary_table' },
        { label: '原始数据表中文解释', field: 'primary_database_label', width: 300 },
        { label: '状态', field: 'status' },
        { label: '操作', field: 'operate' }
      ],
      tableData: [
        { department: '数据支付部', database: 'database1', interface_name: 'interface_1', interface_label: '接口一', primary_table: 'df', primary_database_label: 'ds' },
        { department: '数据支付部2', database: 'database1', interface_name: 'interface_1', interface_label: '接口一', primary_table: 'df', primary_database_label: 'ds' },
        { department: '数据支付部3', database: 'database1', interface_name: 'interface_1', interface_label: '接口一', primary_table: 'df', primary_database_label: 'ds' },
        { department: '数据支付部4', database: 'database1', interface_name: 'interface_1', interface_label: '接口一', primary_table: 'df', primary_database_label: 'ds' }
      ],
      configDialogTableColumns: [
        { label: '业务ID', field: 'id' },
        { label: '参数类型', field: 'type' },
        { label: '参数默认值', field: 'default' },
        { label: '中文注释', field: 'annotation' },
        { label: '是否允许为空', field: 'empty' },
        { label: '操作', field: 'operate' }
      ],
      configDialogTableData: [
        {id: 1, type: 2, default: 'dsfsd', annotation: 'i dont know', empty: 0},
        {id: 2, type: 2, default: 'dsfsd', annotation: 'i dont know', empty: 0},
        {id: 3, type: 2, default: 'dsfsd', annotation: 'i dont know', empty: 0},
        {id: 4, type: 2, default: 'dsfsd', annotation: 'i dont know', empty: 0}
      ]
    };
  },
  props: [],
  components: {
  },
  methods: {
    openAddDialog () {
      this.addDialogVisible = true;
    },
    openConfigDialog () {
      this.configDialogVisible = true;
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
        border: 1px solid #EBEEF5;
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
