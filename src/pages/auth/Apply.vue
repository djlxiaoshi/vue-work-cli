<template v-once>
  <div class="auth-apply-page" >
    <el-card class="box-card">
      <ul class="-etl-list-group">
        <li class="list-item">
          <span class="title">当前角色</span>
          <div class="value">{{ userMsg.role_name }}</div>
        </li>
        <li class="list-item my-business">
          <span class="title">当前业务</span>
          <div class="value">
            {{ currentBusiness }}
          </div>
        </li>
        <li class="list-item">
          <span class="title">申请业务</span>
          <div class="value">
            <el-select v-model="businessId" placeholder="请选择" size="mini">
              <el-option
                v-for="item in businessList"
                :key="item.id"
                :label="item.bname"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="list-item">
          <span class="title">申请理由</span>
          <div class="value" style="flex: 0 0 193px;">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入申请理由"
              v-model="reason">
            </el-input>
          </div>
        </li>
        <li class="list-item">
          <span class="title"></span>
          <div class="value">
            <el-button  class="title" type="primary" size="small" plain @click="apply()">申请</el-button>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { roleConfig } from '@/config/config';
import { Notification } from 'element-ui';
import { mapGetters } from 'vuex';
export default {
  name: 'Apply',
  data () {
    return {
      businessId: undefined,
      reason: '',
      roleConfig: roleConfig,
      businessList: [],
      myBusinessList: [],
      number: 0
    };
  },
  props: [],
  components: {},
  mounted () {
    this.getBusinessList();
    this.getMyBusinessList();
  },
  methods: {
    getBusinessList () {
      this.$http.get('business/list/', {type: 'auth'}).then(res => {
        this.businessList = res.data;
      });
    },
    getMyBusinessList () {
      this.$http.get('business/list/', {type: 'my'}).then(data => {
        this.myBusinessList = data.data;
      });
    },
    apply () {
      // 获取参数
      const params = {
        bid: this.businessId,
        reason: this.reason
      };
      // 参数验证
      const validateResult = this.paramsValidate(params);
      if (typeof validateResult === 'string') {
        Notification.warning({
          title: 'Warning',
          message: validateResult
        });
        return false;
      } else if (typeof validateResult === 'boolean' && validateResult) {
        this.sendRequest(params);
      }
    },
    paramsValidate (params) {
      const reason = params.reason.trim();
      const bid = params.bid;
      if (bid === undefined) {
        return '请选择业务类型';
      } else if (!reason) {
        return '请填写申请理由';
      }
      return true;
    },
    sendRequest (params) {
      this.$http.post('auth/apply/', params).then(res => {
      });
    }
  },
  computed: {
    ...mapGetters([
      'userMsg'
    ]),
    currentBusiness () {
      return this.myBusinessList.length ? this.myBusinessList.map(item => item['bname']).join('、') : '无';
    }
  }
};
</script>

<style lang="scss" scoped>
 .auth-apply-page {
   .-etl-list-group {
     .list-item {
       margin: 25px auto;
       align-items: center;
     }
   }
   .btn-wrap {
     text-align: left;
   }
   .my-business {
     .value span{
       padding: 5px;
     }
   }
 }
</style>
