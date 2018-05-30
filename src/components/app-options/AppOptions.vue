<template>
  <div class="app-options-bar" v-if="options.length">
    <div v-for="(option, index) in options" :key="index" class="option">
      <template v-if="option.type === 'dropdown'">
        <el-select
          v-model="option.selected"
          placeholder="请选择"
          size="mini"
          :loading="option.loading"
          @change="selectChange($event, index, option, options)">
          <el-option
            v-for="item in option.list"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-if="option.type === 'cascade'">
        <el-cascader
          size="mini"
          :options="option.list"
          v-model="option.selected"
          @active-item-change="cascadeItemChange($event, index, option, options)"
          @change="selectChange($event, index, option, options)">
        </el-cascader>
      </template>
      <template v-if="option.type === 'singleSelect'">
        <SingleSelect :option="option" @singleSelectChange="selectChange($event, index, option, options)"></SingleSelect>
      </template>
      <template v-if="option.type === 'multiSelect'">
        <MultiSelect :option="option" @multiSelectChange="selectChange($event, index, option, options)"></MultiSelect>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppOptions',
  data () {
    return {
    };
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.init();
  },
  methods: {
    selectChange (value, index, option, options) {
      this.$emit('optionsSelectedChange', { value, index, option, options });
    },
    setDefaultSelected (option) {
      const valueName = 'value';
      const selected = option.selected ? option.selected
        : option['defaultSelectedIndex'] ? option.list[option['defaultSelectedIndex']][valueName]
          : option.list ? option.list[0][valueName] : '';
      this.$set(option, 'selected', selected); // 加入响应式系统
    },
    formatList (list, labelName, valueName) {
      if (!list || !list.length || !Array.isArray(list)) return [];
      else {
        return list.map(item => {
          return {label: item[labelName], value: item[valueName]};
        });
      }
    },
    init () {
      const TotalSyncCount = this.getSyncCount();
      let count = 0;
      if (TotalSyncCount === 0) {
        this.$emit('optionsReady', this.options);
      }
      this.options.forEach(option => {
        if (option.query && typeof option.query === 'object') {
          const url = option.query.url;
          const params = option.query.params;
          // 清空设置的list
          this.$http.get(url, params || {}, false).then(data => {
            const formatList = this.formatList(data.data, option['labelName'] || 'label', option['valueName'] || 'value');
            this.$set(option, 'list', formatList);
            this.setDefaultSelected(option);
            if (option.sync) {
              count++;
              if (count === TotalSyncCount) {
                this.$emit('optionsReady', this.options);
              }
            }
          });
        } else {
          this.setDefaultSelected(option);
        }
      });
    },
    cascadeItemChange ({ value, index, option, options }) {
      this.$emit('cascadeItemChange', { value, index, option, options });
    },
    getSyncCount () {
      return this.options.filter(option => {
        return option.sync;
      }).length;
    }
  },
  watch: {
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-options-bar {
    display: flex;
    .option {
      margin: 0 5px;
    }
  }
</style>
