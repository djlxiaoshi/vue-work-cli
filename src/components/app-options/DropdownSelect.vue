<template>
  <el-select
    v-model="option.selected"
    placeholder="请选择"
    size="mini"
    @change="selectChange">
    <el-option
      v-for="item in option.list"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'DropdownSelect',
  data () {
    return {};
  },
  props: ['option'],
  methods: {
    setDefaultSelected () {},
    selectChange (value) {
      this.$emit('dropdownSelect', value);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
