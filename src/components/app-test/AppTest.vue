<script>
export default {
  name: 'AppTest',
  data () {
    return {};
  },
  props: [],
  render: function (createElement) {
    console.log(this);
    var header = this.$slots.test; //返回由VNode组成的数组

    return createElement('h1', header);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
