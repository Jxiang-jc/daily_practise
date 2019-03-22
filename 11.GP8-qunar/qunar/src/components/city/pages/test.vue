<template>
  <div>
    <!-- 点击新建就用这默认的坐标 -->
    <li
      v-for="(item,index) in posterText"
      :key="index"
      v-show="newlyBuildAndModify===1"
      @mousedown.stop="move($event,item,index)"
      :style="{color: item.color,fontSize: item.size + 'px', 'position':'absolute','left': 50 + 'px', 'top': 50 + 'px'}"
      :class="{ border: idx===index }"
    >{{item.text}}</li>
    <!-- 点击修改就用请求回来的有坐标的 -->
    <li
      v-for="(item,index) in posterText"
      :key="index"
      v-show="newlyBuildAndModify===2"
      @mousedown.stop="move($event,item,index)"
      :style="isActive ? {'position':'absolute', 'left': item.X + 'px', 'top': item.Y + 'px'} : styleObject2"
      :class="{ border: idx===index }"
    >{{item.text}}</li>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: true,
      styleObject2: {
        color: 'blue',
        fontSize: '20px'
      }
    }
  }
};
</script>

<style>
</style>
