## app-options 组件配置说明
```text
{
  type: dropdown | singleSelect | multiSelect | cascade, // 分别对应 下拉选择 单选 多选 级联选择
  selected: 1 | [] // 设置默认选择项 如果是dropdown和singleSelected值为基本类型  如果是级联或者多选 值为一个数组
  list: [{label: '', value: ''}]  选项
}
```
