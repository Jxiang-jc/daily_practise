<template>
  <div class="vaction">
    <div class="vacation_title">周末去哪儿</div>

    <ul>
      <li class="vacation_item"
        v-for="(vacation, index) in vacationList"
        :key="index"
      >
        <div class="vacation_img_box">
          <img :src="vacation.imgUrl">
        </div>
        <div class="vacation_msg">
          <p>{{ vacation.title }}</p>
          <p>{{ vacation.msg }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    vacationList: {
      type: Array,
      required: true,
      // 当type的类型为Array或者Object的时候default必须是一个函数：
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.vacation_title {
  font-size: 14px;
  line-height: 40px;
  height: 40px;
  padding-left: 12px;
  color: $smallSizeColor;
}
.vacation_item {
  background: #fff;
  margin-bottom: 5px;
}
.vacation_img_box {
  width: 100%;
  img {
    width: 100%;
  }
}
.vacation_msg {
  padding: 7px 10px 10px;
  width: 100%;
  p {
    margin-top: 5px;
    font-size: 14px;
    color: $smallSizeColor;
    padding-right: 70px;
    @include textOverflow;
  }
  p+p {
    color: $miniSizeColor;
    font-size: 12px;
  }
}
</style>
