<template>
  <AppMenu :menus="menu" :licenseKey="99"></AppMenu>
</template>

<script>

export default {
  name: 'AppMenuEg',
  data () {
    return {
      menu: [
        {
          label: '选项一',
          path: '/1',
          permission: [1, 2, 3, 99] // 允许进入改菜单的权限设置，licenseKey属性值被包含在permission则可以看见
        },
        {
          label: '选项二',
          path: '/2',
          children: [
            {
              label: '字选项一',
              path: 'sub/1'
            },
            {
              label: '字选项二',
              path: 'sub/2'
            },
            {
              label: '字选项三',
              path: 'sub/3'
            }
          ]
        },
        { label: '选项三', path: '/3', hidden: true },
        { label: '选项四', path: '/4', permission: [100] }
      ]
    };
  },
  props: [],
  methods: {},
  computed: {
  }
};
</script>

<style lang="scss" scoped>

</style>
