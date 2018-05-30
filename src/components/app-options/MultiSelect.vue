<template>
  <el-popover width="300">
    <div class="multi-select-wrap">
      <div class="header">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left: 5px">全选</el-checkbox>
        <el-input
          size="mini"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="searchText">
        </el-input>
      </div>
      <div class="body" v-if="option.list && option.list.length">
        <el-checkbox-group v-model="option.selected" @change="selectChange($event)">
          <el-checkbox
            v-for="item in option.list"
            v-if="!item['_hidden']"
            :label="item.value"
            :key="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <el-button slot="reference" size="mini">{{ title }}</el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'MultiSelect',
  data () {
    return {
      searchText: '',
      checkAll: false
    };
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          list: [],
          defaultSelectedNumber: 1
        };
      }
    },
    title: {
      type: String,
      default: '数据筛选'
    }
  },
  created () {
    this.init();
  },
  mounted () {
  },
  methods: {
    init () {
      this.defaultSelected();
      this.setCheckAll();
    },
    defaultSelected () {
      const option = this.option;
      const valueName = option.valueName || 'value';
      const list = (option.list && Array.isArray(option.list)) ? option.list : [];
      let selected = option.selected;
      if (!selected || !Array.isArray(selected)) {
        selected = [];
        if (option['defaultSelectedNumber']) {
          selected = list.reduce((rs, item, index) => {
            if (index < option['defaultSelectedNumber']) {
              rs.push(item[valueName]);
            }
            return rs;
          }, []);
        } else {
          // 如果没有配置任何与默认选中相关的配置，则设置第一项为默认选中项
          if (option.list && option.list.length) {
            selected = [this.option.list[0][valueName]];
          }
        }
      }
      this.$set(this.option, 'selected', selected);
    },
    selectChange (value) {
      this.setCheckAll();
      this.$emit('multiSelectChange', value);
    },
    handleCheckAllChange (isCheckAll) {
      let allSelected = [];
      if (isCheckAll) {
        const valueName = this.option.valueName || 'value';
        allSelected = this.option.list.map(item => item[valueName]);
      }
      this.$set(this.option, 'selected', allSelected);
      this.setCheckAll();
    },
    setCheckAll () {
      if (!this.option.selected || !this.option.list) {
        return false;
      }
      this.checkAll = this.option.selected.length === this.option.list.length;
    }
  },
  computed: {
    isIndeterminate () {
      return (this.option.selected.length > 0 && this.option.selected.length < this.option.list.length);
    }
  },
  watch: {
    searchText (text) {
      text = text.trim();
      this.option.list.forEach(item => {
        if (text === '') {
          item['_hidden'] = false;
          return;
        }
        const labelName = this.option['labelName'] || 'label';
        const label = (item[labelName] + '').trim();
        item['_hidden'] = !~label.indexOf(text);
      });
    },
    option () {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
  .multi-select-wrap {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 5px;
      .el-input {
        width: 200px;
      }
    }
    .body {
      margin-top: 5px;
      /deep/ .el-checkbox-group {
        label {
          margin: 5px;
        }
      }
    }
  }
</style>
