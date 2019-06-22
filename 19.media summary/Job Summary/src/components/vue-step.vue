<!-- created by Jxiang 2019-6-21 -->
<template>
  <div class="jx-step-warp-horizontal">
    <!-- 步骤条背景颜色 -->
    <div class="jx-step-progress-bg">
      <!-- 步骤条实际进度 -->
      <div class="jx-step-progress-value" :style="progressStyle"></div>
      <ul class="jx-step-list">
        <li v-for="(item, idx) in stepList" :key="idx" class="jx-step-item" :style="horizontalItemWidth" @click="selectItem(idx)">
          <label class="jx-step-item-label" v-if="item.label">
            {{ item.label }}
          </label>
          <div class="jx-step-item-circle" :style="itemNumberStyle(idx)">
          </div>
          <div class="jx-step-item-ctx" v-if="item.ctx">
            {{ item.ctx }}
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
/**
 * cell
 * @module components/step
 * @desc   步骤条
 * @param { umber, String } nowStep   - 当前step
 * @param { umber, String } stepPrecent   - 进度条百分比
 * @param { Array } stepList   - step参数
 * @param { String } activeColor   - 当前step的圆点颜色
 *
 * @example
 * <vue-step
      :now-step="nowStep"
      :step-list="stepList"
      :step-precent="precent"
      @selected="doSomething"
      class="reset-step-style"
    />
 */
export default {
  name: 'jx-step',
  props: {
    nowStep: {
      type: [Number, String],
      required: true
    },
    stepPrecent: {
      type: [Number, String],
      required: true
    },
    stepList: {
      type: Array,
      required: true
    },
    activeColor: {
      type: String,
      default: '#E74520'
    }
  },
  data () {
    return {
      test: 0
    }
  },
  computed: {
    // 每一步 宽度
    stepItemWidth () {
      return 100 / (this.stepList.length + 1)
    },
    horizontalItemWidth () {
      return { width: this.stepItemWidth + '%' }
    },
    // 进度条
    nowPrecent() {
      return this.stepPrecent
    },
    // 进度条value样式
    progressStyle () {
      let oStyle = {
        'background-color': this.activeColor
      }
      if (parseInt(this.nowPrecent) > 100) {
        oStyle.width = '100%'
      } else {
        oStyle.width = this.nowPrecent + '%'
      }
      return oStyle
    }
  },
  methods: {
    // 圆点样式
    itemNumberStyle (idx) {
      let style = null
      if (idx < this.nowStep) {
        style = {
          'background-color': this.activeColor
        }
      }
      return style
    },
    // 允许手动点击
    selectItem (itemIndex) {
      this.$emit('selected', this.stepList[itemIndex])
    }
  }
}
</script>

<style lang="scss" scoped>
.jx-step-warp-horizontal {
  position: relative;
  width: 100%;
  z-index: 2;
  .jx-step-progress-bg {
    position: relative;
    width: 100%;
    height: 2px;
    bottom: 22px;
    background: #DBDBDB;
    .jx-step-progress-value {
      position: absolute;
      top: 0;
      left: 0;
      height: inherit;
      transition: width 0.6s ease;
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: -2PX;
        display: block;
        width: 6PX;
        height: 6PX;
        border-radius: 50%;
        background: #E74520;
      }
    }
    .jx-step-list {
      display: -webkit-flex;
      display: flex;
      user-select: none;
      justify-content: center;
      text-align: center;
      .jx-step-item {
        position: relative;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        align-items: center;
        .jx-step-item-label {
          position: absolute;
          top: -25px;
          font-family: PingFangSC-Light;
          font-size: 12px;
          color: #FF5028;
        }
        .jx-step-item-circle {
            position: absolute;
            top: -3PX;
            width: 8PX;
            height: 8PX;
            border-radius: 50%;
            color: #666;
            background-color: #ddd;
        }
        .jx-step-item-ctx {
          position: absolute;
          top: 12px;
          color: #FF5028;
        }
      }
    }
  }
}
</style>
