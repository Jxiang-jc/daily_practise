// 搜索功能的组件
<template>
  <div class="search-page" :class="{'show': isShow}">
    <div class="search-page-header bd-bottom" :class="{'not-ios': !isIOS, 'opacity': !isShow}">
      <div class="left" @click.prevent.stop="hide" v-if="!isIOS">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="search-input">
        <input
          ref="input"
          type="search"
          name="search"
          v-model="query"
          @keyup.prevent.stop="search($event)"
          placeholder="搜索产品"
        >
        <i class="iconfont iconsousuo"></i>
        <i v-if="query.length" class="iconfont iconcancel" @click.prevent.stop="clear"></i>
      </div>
      <div v-if="isIOS" class="right" @click.prevent.stop="hide">取消</div>
      <div v-if="!isIOS" class="right" @click.prevent.stop="chooseItem(null,true)">搜索</div>
    </div>
    <div class="has-header" v-show="isShow">
      <div class="history" v-if="historyItems.length">
        <div class="item-header">历史搜索</div>
        <div class="history-content">
          <a
            v-for="(item, idx) in historyItems"
            :key="idx"
            class="cell bd-bottom"
            @click="chooseItem(item,false)"
          >{{item[displayProp]}}</a>
          <div class="no-item" v-if="!historyItems.length">暂无历史记录</div>
        </div>
        <a class="item-footer bd-top" v-if="historyItems.length">
          <i class="iconfont icon-garbage"></i>
          清空历史搜索
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import { storage } from '../utils/common.js'
import common from '../utils/common.js';

export default {
  name: 'searchPageCom',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    storageKey: {
      type: String,
      default: 'productSearchHistory'
    },
    displayProp: {
      type: String,
      default: 'name'
    },
    blur: {
      type: Boolean,
      default: false
    },
    allowBlank: {
      // 是否允许搜索空白
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      query: '', // v-model
      historyItems: [], // 历史搜索
      isIOS: common.isIOS() // 判断是否IOS
    };
  },
  methods: {
    // 聚焦
    focus() {
      // 这种方法适用于Hybrid App. 通过用户交互（点击某个按钮）从而唤起软键盘
      // 在web app上有bug
      this.$refs.input.focus();
    },
    // 隐藏搜索框
    hide() {
      // .sync 相当于对一个props进行双向绑定
      /* 
					* this.$emit('update:title', newTitle)
					*  
					* <text-document
						v-bind:title='doc.title'
						v-on:update:title='doc.title = $event'
					  ></text-document>
					*  			↑↑
					* 			↓↓  .sync语法糖 等同上面
					* <text-document v-bind:title.sync='doc.title'></text-document>
				 */
      this.$emit('update:isShow', false);
    },
    // 保存历史搜索
    saveHistory(item) {
      const self = this;
      // 判断历史搜索中是否存在
      // !0 === true
      // !1 === false / !2 === false / !3 === false ...
      let notHas = !self.historyItems.filter(temp => {
        return temp[self.displayProp] === item[self.displayProp];
      }).length;
      if (notHas) {
        // 往数组的起始位添加
        self.historyItems.unshift(item);
        if (self.historyItems.length > 15) {
          // 删除最后一个
          self.historyItems.length = 15;
        }
        storage.set(self.storageKey, self.historyItems);
      }
    },
    chooseItem(item, isSaveHistory) {
      // 点击历史搜索时需要传item，点击搜索或keycode==13时，判断是否位空
      if (!item) {
        // 若搜索框为空并且不允许空白搜索
        if (!this.query && !this.allowBlank) return;
        item = {};
        item[this.displayProp] = this.query;
      }
      if (isSaveHistory) {
        this.saveHistory(item);
      }
      this.$emit('choose', item);
      this.hide();
    },
    search(e) {
      if (e.keyCode === 13) {
        // 如果设置了查询失去焦点，就让他失去焦点
        this.blur && this.$refs.input.blur();

        this.chooseItem(null, true);
      }
    },
    clear() {
      this.query = '';
    },
    setValue(val) {
      // 供外部组件调用
      this.query = val;
    }
  },
  mounted() {
    let temp = storage.get(this.storageKey);
    this.historyItems = temp || [];
  },
  activated() {
    isShow: nVal => {
      if (nVal) {
        const self = this;
        self.scrollTop = document.body.scrollTop;
        document.body.classList.add('stop-scroll');
        self.$nextTick(() => {
          self.$refs.input.focus();
        });
      } else {
        document.body.classList.remove('stop-scroll');
        window.scrollBy(0, this.scrollTop);
      }
    };
  }
};
</script>

<style scoped lang='scss'>
input:focus {
  outline: none;
}

/* IOS，input出现阴影 */
input[type='search'],
input,
textarea {
  -webkit-appearance: none !important;
  /* 清楚ios阴影 */
  -moz-appearance: none !important;
  /* mobile firefox too! */
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}
.has-header {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  width: 100%;
}

.bd-bottom {
  border-bottom: 1px solid #dcd7d7;
}

.search-page {
  text-align: left;
  &.show {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: #f4f4f4;
  }
  .search-page-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    padding: 0 60px 0 15px;
    height: 45px;
    background-color: #fff;
    .left {
      position: absolute;
      left: 10px;
      top: 0;
      line-height: 44px;
      .iconfont {
        line-height: 44px;
        font-size: 18px;
        color: #979797;
      }
    }
    .search-input {
      position: relative;
      top: 6px;
      height: 32px;
      input {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 30px;
        border: 0;
        border-radius: 4px;
        background-color: #f2f2f2;
        font-family: PingFangSC-Light;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        vertical-align: middle;
      }

      input::-webkit-input-placeholder {
        color: #999;
      }

      input[type='search']::-webkit-search-decoration,
      input[type='search']::-webkit-search-cancel-button,
      input[type='search']::-webkit-search-results-button,
      input[type='search']::-webkit-search-results-decoration {
        -webkit-appearance: none;
        appearance: none;
      }

      .iconfont {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
        margin-top: 1px;
        color: #979797;
      }

      .iconcancel {
        left: inherit;
        right: 10px;
        color: #c6c6c6;
      }
    }

    .right {
      position: absolute;
      right: 15px;
      top: 0;
      height: 44px;
      line-height: 44px;
      color: #666;
    }

    &.not-ios {
      padding-left: 35px;
      .search-input input {
        padding-top: 7px;
        padding-bottom: 5px;
      }
    }
    &.opacity {
      opacity: 0;
      z-index: 0;
    }
  }
  .history {
    background-color: #f4f4f4;
  }

  .history-content {
    background: #fff;
  }

  .cell {
    padding-left: 15px;
    display: block;
    line-height: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #666;

    &:last-child {
      border-bottom: 0;
    }
  }

  .item-header {
    padding: 10px 0 10px 15px;
    background-color: #f4f4f4;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #999;
  }

  .item-footer {
    display: block;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Light;
    color: #999;

    .iconfont {
      position: relative;
      top: 1px;
      padding: 0 4px 0 0;
      font-size: 16px;
    }
  }

  .tab-item {
    display: inline-block;
    margin: 5px;
    padding: 10px;
    border-radius: 4px;
    background-color: #f4f4f4;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #666;
  }

  .no-item {
    display: block;
    text-align: center;
    line-height: 50px;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #666;
  }
}

.stop-scroll {
  position: fixed;
}
</style>
