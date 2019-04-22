<template>
  <div class="iCountUp">
    <ICountUp
      :endVal="endVal"
      :options="options"
      @ready="onReady"
    />
  </div>
</template>

<script type="text/babel">
  import ICountUp from 'vue-countup-v2'
  export default {
    name: 'demo',
    components: {
      ICountUp
    },
    data() {
      return {
        endVal: 120500,
        options: {
          useEasing: true, // 是否在初始化后改变数值时使用过渡动画
          useGrouping: true, // 3个数字为一组
          separator: ',', // 用逗号分隔
          decimal: '.', // 进制
          prefix: '', // 前缀
          suffix: '' // 后缀
        }
      }
    },
    methods: {
      // 等待页面初始化后的回调函数
      onReady: function (instance, CountUp) {
        const that = this;
        instance.update(that.endVal + 100)
      }
    }
  };
</script>

<style scoped>
  .iCountUp {
    font-size: 12em;
    margin: 0;
    color: #4d63bc;
  }
</style>