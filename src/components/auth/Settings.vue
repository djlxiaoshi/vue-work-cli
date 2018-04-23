<template>
  <div class="auth-settings-page">
    <AppTable
      title="权限设置"
      :tableRows="3"
      :border="true"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :hasEdit="true"
      @onEdit="edit($event)"
    ></AppTable>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="dialog-body">
        <ul class="-etl-list-group">
          <li class="list-item">
            <span class="title">角色</span>
            <div class="value">
              <el-radio-group v-model="role" size="mini">
                <el-radio-button label="1" border  >管理员</el-radio-button>
                <el-radio-button label="2" border >业务人员</el-radio-button>
                <el-radio-button label="3" border >普通用户</el-radio-button>
              </el-radio-group>
            </div>
          </li>
          <li class="list-item">
            <span class="title">已有业务</span>
            <div class="value">
              <el-select v-model="studio" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import AppTable from '@/components/shared/app-table/AppTable.vue';
export default {
  name: 'Settings',
  data () {
    return {
      tableColumns: [
        { label: '用户名', field: 'username' },
        { label: '角色', field: 'role' },
        { label: '已有业务', field: 'business' },
        { label: '操作', field: 'operate', width: 300 }
      ],
      tableData: [
        { username: '王小虎', role: '管理员', business: '数据支付部' },
        { username: '王小虎1', role: '业务管理', business: '数据支付部' },
        { username: '王小虎2', role: '普通用户', business: '数据支付部' },
        { username: '王小虎3', role: '管理员', business: '数据支付部' }
      ],
      dialogVisible: false,
      currentRow: {},
      role: '',
      studio: '',
      options: [
        {value: '选项1', label: '双皮奶1'},
        {value: '选项2', label: '双皮奶2'},
        {value: '选项3', label: '双皮奶3'}
      ]
    };
  },
  props: [],
  components: {
    AppTable
  },
  methods: {
    edit (row) {
      this.currentRow = row;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
  .auth-settings-page {

  }
</style>
