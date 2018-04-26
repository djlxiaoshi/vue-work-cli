<template v-once>
  <div class="auth-apply-page" >
    <el-card class="box-card">
      <ul class="-etl-list-group">
        <li class="list-item">
          <span class="title">当前角色</span>
          <div class="value">业务人员</div>
        </li>
        <li class="list-item">
          <span class="title">当前业务</span>
          <div class="value">数据支付部</div>
        </li>
        <li class="list-item">
          <span class="title">申请角色</span>
          <div class="value">
            <el-radio-group v-model="role" size="mini">
              <el-radio-button label="1" border  >管理员</el-radio-button>
              <el-radio-button label="2" border >业务人员</el-radio-button>
              <el-radio-button label="3" border >普通用户</el-radio-button>
            </el-radio-group>
          </div>
        </li>
        <li class="list-item">
          <span class="title">申请业务</span>
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
        <li class="list-item">
          <span class="title"></span>
          <div class="value">
            <el-button  class="title" type="primary" size="small" plain>主要按钮</el-button>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Apply',
  data () {
    return {
      role: '',
      studio: '',
      options: [
        {value: '选项1', label: '双皮奶1'},
        {value: '选项2', label: '双皮奶2'},
        {value: '选项3', label: '双皮奶3'}
      ],
      number: 0
    };
  },
  props: [],
  components: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
 .auth-apply-page {
    .-etl-list-group {
      .list-item {
        margin: 25px auto;
      }
    }
   .btn-wrap {
     text-align: left;
   }
 }
</style>
