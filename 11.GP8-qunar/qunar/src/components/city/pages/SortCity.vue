<template>
  <div class="sort">
    <div class="sort_title">字母排序</div>
    <ul class="sort_list">
      <li class="sort_item"
        v-for="(val, key) in sortList"
        :key="key"
      >{{ key }}</li>
    </ul>
    <!--
      1. 循环数组时候两个参数，第一个为数组内元素，第二个为元素索引（item,index)
      2. 循环对象时候可以有三个参数，第一个为键值，第二个为键名，第三个为索引（value,key,index)
    -->
    <div class="letter_list">
      <div v-for="(value, letter) in sortList"
        :key="letter"
      >
        <div class="list_title">{{ letter }}</div>
        <ul class="list_msg">
          <li class="list_msg_item"
            v-for="(city, index) in sortList[letter]"
            :key="index"
          >{{ city.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sortList: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.sort {
  /* A-Z英文字母 */
  .sort_title {
    font-size: 12px;
    color:#212121;
    padding: 12px 15px;
  }
  .sort_list {
    background: #fff;
    color:#212121;
    position: relative;
    overflow: hidden; /* 这个是border的关键 */
    .sort_item {
      float: left;
      width: 16.666%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 14px;
      color: $smallSizeColor;
    }
  }

  /* 按字母分类 */
  .list_title {
    font-size: 12px;
    color:#212121;
    padding: 12px 15px;
  }
  .list_msg {
    background: #fff;
    color:#212121;
    position: relative;
    overflow: hidden; /* 这个是border的关键 */
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 25%;
      height: 100%;
      left: 25%;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
    &:after {
      content: '';
      position: absolute;
      width: 25%;
      height: 100%;
      left: 50%;
      border-right: 1px solid #ddd;
    }
    .list_msg_item {
      float: left;
      width: 25%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 14px;
      color: $smallSizeColor;
      @include textOverflow;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
