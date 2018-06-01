<template>
  <div class="auth-settings-page">
    <AppTable
      title="用户列表"
      :tableRows="20"
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
export default {
  name: 'UserList',
  data () {
    return {
      tableColumns: [
        { label: '用户工号', field: 'workid' },
        { label: '用户名', field: 'user_cname' },
        { label: '用户英文名', field: 'user_name' },
        { label: '角色名称', field: 'role_name' }
      ],
      tableData: [],
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
  },
  mounted () {
    this.getAdminList();
  },
  methods: {
    edit (row) {
      this.currentRow = row;
      this.dialogVisible = true;
    },
    getAdminList () {
      this.$http.get('user/admin/list/').then(data => {
        this.tableData = data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .auth-settings-page {

  }
</style>
