<template>
  <div class="page-auth-check">
    <AppTable
      title="权限审批"
      :tableRows="20"
      :border="true"
      :tableColumns="tableColumns"
      :tableData="pendingList"
    >
      <template slot="operate" slot-scope="scope">
        <el-button type="success" @click="operate(1, scope.row)" class="etl-btn mini" icon="el-icon-check" title="通过"></el-button>
        <el-button type="danger" @click="operate(0, scope.row)" class="etl-btn mini" icon="el-icon-close" title="拒绝"></el-button>
      </template>
    </AppTable>
    <el-dialog
      title="审核理由"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="remark">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reject()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const PASS_FLAG = 1;
export default {
  name: 'Check',
  data () {
    return {
      remark: '',
      dialogVisible: false,
      currentRow: {},
      currentOp: '',
      tableColumns: [
        { label: '业务id', field: 'bid' },
        { label: '业务名称', field: 'bname' },
        { label: '申请人', field: 'user_info' },
        { label: '申请原因', field: 'reason' },
        { label: '申请时间', field: 'create_time' },
        { label: '审核时间', field: 'audit_time' },
        { label: '当前审核员', field: 'current_audit_user_info' },
        { label: '最终审核员', field: 'audit_user_info' },
        { label: '审核说明', field: 'audit_remark' },
        { label: '审核状态', field: 'status_name' },
        { label: '操作', field: 'operate', width: 100 }
      ],
      pendingList: []
    };
  },
  props: [],
  components: {
  },
  mounted () {
    this.getPendingList();
  },
  methods: {
    getPendingList () {
      this.$http.get('auth/my/audit/list/').then(data => {
        this.pendingList = data.data;
      });
    },
    operate (flag, row) {
      this.currentOp = flag;
      this.currentRow = row;
      if (this.currentOp === PASS_FLAG) {
        this.pass();
      } else {
        this.dialogVisible = true;
      }
    },
    pass () {
      const params = {
        apply_id: this.currentRow.id,
        operate: this.currentOp,
        remark: this.remark
      };
      this.$confirm('确定通过该条记录吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendRequest(params);
      }).catch(() => {});
    },
    reject () {
      const params = {
        apply_id: this.currentRow.bid,
        operate: this.currentOp,
        remark: this.remark
      };
      const validateMsg = this.paramsValidate(params);
      if (typeof validateMsg === 'string') {
        this.$notice.warning({
          title: 'Warning',
          message: validateMsg
        });
        return false;
      } else if (typeof validateMsg === 'boolean' && validateMsg) {
        this.sendRequest(params);
      }
    },
    sendRequest (params) {
      this.$http.post('auth/my/audit/op/', params).then(res => {
        this.dialogVisible = false;
        this.getPendingList();
      });
    },
    paramsValidate (params) {
      const remark = params.remark.trim();
      if (!remark) return '拒绝理由不能为空';
      return true;
    }
  },
  destroyed () {
  }
};
</script>

<style lang="scss" scoped>

</style>
