<template>
  <div class="app-plugins">
    <AppOptions
      :options="options"
      @optionsSelectedChange="change"
      @optionsReady="optionsReady"></AppOptions>
  </div>
</template>

<script>
import { mainRoutes } from '@/router/routes';

export default {
  data () {
    return {
      obj: {age: 1, name: 'djlxs'},
      options: [
        {
          type: 'dropdown',
          labelName: 'bname',
          valueName: 'id',
          query: {
            url: 'business/list/',
            params: {type: 'my'}
          },
          defaultSelectedIndex: 1,
          sync: true
        },
        {
          type: 'multiSelect',
          defaultSelectedNumber: 1,
          noLessThanNumber: 1,
          labelName: 'bname',
          valueName: 'id',
          query: {
            url: 'business/list/',
            params: {type: 'my'}
          },
          sync: true
        },
        {
          type: 'singleSelected',
          selected: 2,
          list: [
            {label: '选项一', value: 0},
            {label: '选项二', value: 1},
            {label: '选项三', value: 2}
          ]
        },
        {
          type: 'cascade',
          selected: [1],
          list: [{
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }]
        }
      ],
      routesConfig: mainRoutes
    };
  },
  mounted () {
  },
  components: {
  },
  methods: {
    change (data) {
      console.log(data);
    },
    optionsReady (options) {
      console.log(options);
    }
  }
};
</script>
