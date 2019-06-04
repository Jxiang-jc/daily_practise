<template>
  <div class="tabbar">
    <router-link class="tabbar_item"
      v-for="(item, index) in tabData"
      :key="index"
      :to="item.path"
      active-class="is_selected"
    >
      <div class="tabbar_item_icon">
        <i :class="'fa fa-' + item.icon"></i>
      </div>
      <div class="tabbar_item_label">
        {{ item.label }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    tabData: {
      type: Array,
      required: true,
      default: () => {
        return [
          {
            id: 1,
            path: '/',
            icon: 'cny',
            label: '鸡肠'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabbar {
    height: 45px;
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-image: linear-gradient(
      180deg,
      #d9d9d9,
      #d9d9d9 50%,
      transparent 0
    );
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-color: #fafafa;
    display: flex;
    text-align: center;
    .tabbar_item {
      display: block;
      padding: 3px 0;
      flex: 1;
      .tabbar_item_icon {
        width: 20px;
        height: 20px;
        margin: 0 auto 5px;
        i {
          font-size: 16px;
        }
      }
      .tabbar_item_label {
        color: inherit;
        font-size: 12px;
        line-height: 1;
      }
    }
    a {
      text-decoration: none;
      color: #999;
    }
    .is_selected {
      color: #009eef;
    }
  }
</style>
