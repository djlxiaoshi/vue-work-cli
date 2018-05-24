<template>
  <el-dialog
    custom-class="interface-add-config-dialog"
    title="接口配置"
    :visible.sync="dialogVisible"
    width="70%"
  >
    <div class="dialog-body">
      <div class="tool-bar">
        <el-button type="primary" style="margin-left: auto;" size="mini" @click="addParams()">新增参数</el-button>
      </div>
      <div class="table-container">
        <table>
          <thead>
          <tr>
            <th v-for="columns in tableColumns" :key="columns['field']" :style="{minWidth: columns['width'] + 'px'}">{{columns['label']}}</th>
          </tr>
          </thead>
          <tbody class="disabled-drag">
            <tr v-for="row in data" :key="row['id']" style="border-bottom: 1px solid #e5e5e5; height: 40px;">
              <td v-for="columns in tableColumns" :key="columns['field']">
                <template v-if="columns['field']=== 'field_is_primary_key' ">
                  {{ row['field_is_primary_key'] == 0 ? '否' : '是'}}
                </template>
                <template v-else-if="columns['field']=== 'field_isnull' ">
                  {{ row['field_isnull'] == 0 ? '否' : '是'}}
                </template>
                <template v-else>
                  {{ row[columns['field']] }}
                </template>
              </td>
            </tr>
          </tbody>
          <tbody class="container dragable">
              <tr v-for="(row, index) in newParamsData" :key="index" :class="{'data-error': row['_error']}">
                <template v-for="columns in tableColumns">
                  <td  :key="columns['field']" v-if="columns['field'] === 'field_name'">
                    <el-input v-model="row[columns['field']]" placeholder="字段名称" size="mini"></el-input>
                  </td>
                  <td  :key="columns['field']" v-if="columns['field'] === 'field_default_value'">
                    <el-input v-model="row[columns['field']]" placeholder="字段默认值" size="mini"></el-input>
                  </td>
                  <td  :key="columns['field']" v-if="columns['field'] === 'field_type'">
                    <el-select v-model="row[columns['field']]" placeholder="请选择类型" size="mini">
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td  :key="columns['field']" v-if="columns['field'] === 'field_api_type'">
                    <el-select v-model="row[columns['field']]" placeholder="请选择类型" size="mini">
                      <el-option
                        v-for="item in apiTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td :key="columns['field']" v-if="columns['field'] === 'field_desc'">
                    <el-input v-model="row[columns['field']]" placeholder="字段说明" size="mini"></el-input>
                  </td>
                  <td  :key="columns['field']" v-if="columns['field'] === 'field_isnull'">
                    <el-radio-group v-model="row[columns['field']]" size="mini">
                      <el-radio-button :label="1">是</el-radio-button>
                      <el-radio-button :label="0">否</el-radio-button>
                    </el-radio-group>
                  </td>
                  <td  :key="columns['field']" v-if="columns['field'] === 'field_is_primary_key'">
                    <el-radio-group v-model="row[columns['field']]" size="mini">
                      <el-radio-button :label="1">是</el-radio-button>
                      <el-radio-button :label="0">否</el-radio-button>
                    </el-radio-group>
                  </td>
                  <td  :key="columns['field']" v-if="columns['field'] === 'field_is_default'">
                    <el-radio-group v-model="row[columns['field']]" size="mini">
                      <el-radio-button :label="1">是</el-radio-button>
                      <el-radio-button :label="0">否</el-radio-button>
                    </el-radio-group>
                  </td>
                </template>
                  <td>
                    <template>
                      <el-button type="default" class="etl-btn mini" @click="sort(row, 'down')" icon="el-icon-arrow-down" title="下移"></el-button>
                      <el-button type="default" class="etl-btn mini" @click="sort(row, 'up')" icon="el-icon-arrow-up" title="上移"></el-button>
                      <el-button type="danger" class="etl-btn mini" @click="deleteParams(index)" icon="el-icon-delete" title="删除"></el-button>
                    </template>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">保 存</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { getTableDataSize } from 'gettabledatasize';
export default {
  name: 'AddConfigDialog',
  data () {
    return {
      dialogVisible: false,
      tableColumns: [
        { label: '字段名称', field: 'field_name', width: 100 },
        { label: '字段默认值', field: 'field_default_value', width: 100 },
        { label: '表字段类型', field: 'field_type', width: 120 },
        { label: '主键', field: 'field_is_primary_key', width: 100 },
        { label: '接口字段类型', field: 'field_api_type', width: 120 },
        { label: '字段说明', field: 'field_desc', width: 120 },
        { label: '是否为空', field: 'field_isnull', width: 100 },
        { label: '操作', field: 'operate', width: 120 }
      ],
      data: [],
      newParamsData: [],
      typeOptions: [
        {label: 'int', value: 'int'},
        {label: 'bigint', value: 'bigint'},
        {label: 'float', value: 'float'},
        {label: 'string', value: 'string'},
        {label: 'datetime', value: 'datetime'}
      ],
      apiTypeOptions: [
        {label: 'int', value: 'int'},
        {label: 'bigint', value: 'bigint'},
        {label: 'float', value: 'float'},
        {label: 'string', value: 'string'},
        {label: 'datetime', value: 'datetime'}
      ]
    };
  },
  props: ['id', 'status'],
  components: {
  },
  created () {
    getTableDataSize(this.tableColumns, this.data);
  },
  mounted () {
  },
  methods: {
    getApiConfigFields (id) {
      this.$http.get('api/detail/', {api_id: id}).then(data => {
        const allData = data.data.api_fields || [];
        const disabled = [];
        const abled = [];
        allData.forEach((item) => {
          if (this.isStartMode) {
            disabled.push(item);
          } else {
            if (item['field_is_default'] === 1) {
              disabled.push(item);
            } else {
              abled.push(item);
            }
          }
        });
        this.data = disabled;
        this.newParamsData = abled;
      });
    },
    open () {
      this.dialogVisible = true;
    },
    close () {
      this.dialogVisible = false;
    },
    sort (current, dir) {
      const index = this.newParamsData.indexOf(current);
      if (dir === 'up') {
        if (index - 1 < 0) return;
        current = this.newParamsData.splice(index, 1);
        this.newParamsData.splice(index - 1, 0, ...current);
      } else if (dir === 'down') {
        if (index + 1 >= this.newParamsData.length) return;
        current = this.newParamsData.splice(index, 1);
        this.newParamsData.splice(index + 1, 0, ...current);
      }
    },
    save () {
      const validateResult = this.paramsValidate();
      if (typeof validateResult === 'string') {
        this.$notice.warning({
          title: 'Warning',
          message: validateResult
        });
      } else if (typeof validateResult === 'boolean' && validateResult) {
        // 设置排序字段的值
        this.setSortFields();
        if (!this.validateSort()) {
          this.$notice.warning({
            title: 'Warning',
            message: '主键配置要在非主键配置之前'
          });
          return;
        }
        this.sendRequest({
          api_id: this.id,
          api_fields: this.data.concat(this.newParamsData)
        });
      }
    },
    getMaxSortIndex () {
      return this.data.reduce((rs, item) => {
        if (item['field_sort'] > rs) rs = item['field_sort'];
        return rs;
      }, 1);
    },
    setSortFields () {
      const maxIndex = this.getMaxSortIndex();
      this.newParamsData.forEach((item, index) => {
        item['field_sort'] = index + maxIndex + 1;
      });
    },
    validateSort () {
      let notKeySortMin = Infinity;
      // 校验顺序
      return this.newParamsData.every((item) => {
        if (item['field_is_primary_key'] === 0) {
          if (item['field_sort'] < notKeySortMin) {
            notKeySortMin = item['field_sort'];
          }
          return true;
        } else if (item['field_is_primary_key'] === 1) {
          return item['field_sort'] < notKeySortMin;
        }
      });
    },
    paramsValidate () {
      for (const row of this.newParamsData) {
        const fieldName = row['field_name'].trim();
        const defaultValue = row['field_default_value'].trim();
        const fieldDesc = row['field_desc'].trim();
        if (fieldName) {
          if (/[^a-zA-Z]/g.test(fieldName)) {
            this.$set(row, '_error', true);
            return '字段名称仅支持英文字母';
          }
        } else {
          this.$set(row, '_error', true);
          return `字段名称不能为空`;
        }
        if (defaultValue) {
          if (/[^a-zA-Z0-9.]/g.test(defaultValue)) {
            this.$set(row, '_error', true);
            return '默认值仅支持字母数字和\'.\'';
          }
        } else {
          this.$set(row, '_error', true);
          return `默认值不能为空`;
        }
        if (!fieldDesc) {
          this.$set(row, '_error', true);
          return `字段说明不能为空`;
        }
      }
      return true;
    },
    sendRequest (params) {
      this.$http.post('api/fields/update/', params).then(res => {
        this.getApiConfigFields(this.id);
        // 清空缓存
        this.newParamsData = [];
      });
    },
    getDefaultRow () {
      return {
        id: '',
        field_name: '',
        field_default_value: '',
        field_type: 'string',
        field_desc: '',
        field_isnull: 1,
        field_is_default: 0,
        field_api_type: 'string',
        field_is_primary_key: 0
      };
    },
    addParams () {
      const newRow = this.getDefaultRow();
      this.newParamsData.push(newRow);
    },
    deleteParams (index) {
      this.newParamsData.splice(index, 1);
    }
  },
  computed: {
    isStartMode () {
      return this.status === 2;
    }
  },
  watch: {
    dialogVisible (visible) {
      if (visible) {
        this.getApiConfigFields(this.id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .interface-add-config-dialog {
    .dialog-body {
      width: 100%;
      overflow-x: auto;
      .tool-bar {
        display: flex;
        margin-bottom: 20px;
      }

      .table-container {
        max-height: 300px;
        overflow: auto;
        table {
          width: 100%;
          tr{
            border-bottom: 1px solid #EBEEF5;
            height: 40px;
          }
          .dragable {
            .data-error {
              background: #E6A23C;
            }
            tr{
              td{
                padding: 2px 5px;
              }
              td.drag-icon {
                cursor: move;
              }
            }
          }
          .disabled-drag {
          }
        }
      }
    }
    table {
    }
  }
</style>
