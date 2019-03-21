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
  data () {
    return {
      vacationList: [
        {
          id: 1,
          imgUrl: 'http://img1.qunarzz.com/sight/source/1811/15/66f14e0fd6fbb.jpg_r_640x214_5d69f21d.jpg',
          title: '清远周边逛',
          msg: '人人都有一双发现美的眼睛，身边的事物最熟悉不过，那你可曾发现了被人遗漏的美？'
        },
        {
          id: 2,
          imgUrl: 'http://img1.qunarzz.com/sight/source/1811/b8/5d599bbdcf8b57.jpg_r_640x214_2ee055e3.jpg',
          title: '浮在海上的绿洲',
          msg: '南国滨海之城，避寒胜地，有暖暖的阳光，海风习习，吃着海鲜逛逛老街多惬意啊'
        },
        {
          id: 3,
          imgUrl: 'http://img1.qunarzz.com/sight/source/1812/fe/208e0360d686b8.jpg_r_640x214_7b9e6607.jpg',
          title: '广州泡汤圣地',
          msg: '解压之地，放松自己，来一段轻松的旅程。'
        },
        {
          id: 6,
          imgUrl: 'http://img1.qunarzz.com/sight/source/1811/f8/29dfa785277839.jpg_r_640x214_7d051523.jpg',
          title: '阳江温泉知多少',
          msg: '这里的天空和大海让人心旷神怡，配上舒缓的优美音乐，泡个暖暖的温泉岂不美哉'
        }
      ]
    }
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
