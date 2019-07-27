<template>
    <div class="picker-container">
        <!-- 遮罩层 -->
        <transition name="fade">
            <div class="mask" v-show="show"></div>
        </transition>
        <!-- 最外层盒子作用是固定,让子元素有父级定位 -->
        <transition name="slide">
            <section class="adress-box" v-show="show">
                <!-- 子元素盒子, absolute定位 -->
                <div class="adress-contnet">
                    <div class="title">
                        <h4>居住地址</h4>
                        <span class="close-box" @click="closeAddress">
                            <i class="iconfont icon-close rt"></i>
                        </span>
                    </div>
                    <!-- 副标题(当前选中的城市) -->
                    <div class="current-address-title" ref="subtitle">
                        <div
                            class="current-item"
                            :class="{'active': activeIdx === 0}"
                            @click="provinceSelected"
                        >{{ provineceName ? provineceName : '请选择' }}</div>
                        <div
                            class="current-item"
                            :class="{'active': activeIdx === 1}"
                            v-show="provineceName"
                            @click="citySelected"
                        >{{ cityName ? cityName : '请选择' }}</div>
                        <div
                            class="current-item"
                            :class="{'active': activeIdx === 2}"
                            v-show="cityName"
                            @click="districtSelected"
                        >{{ districtName ? districtName : '请选择' }}</div>
                        <div
                            class="current-item"
                            :class="{'active': activeIdx === 3}"
                            v-show="districtName"
                            @click="townSelected"
                        >{{ townName ? townName : '请选择' }}</div>
                        <!-- 选中的 -->
                        <span class="current-line" ref="currentLine"></span>
                    </div>

                    <!-- 地址选择内容 -->
                    <div class="picker-content">
                        <ul ref="scroll">
                            <li
                                class="addressCont"
                                v-for="prov in provinceList"
                                :key="prov.regionId"
                                @click.stop.prevent="getPovince(prov)"
                                v-show="activeIdx === 0"
                            >{{
                                prov.regionName
                            }}</li>
                            <li
                                class="addressCont"
                                v-for="city in cityList"
                                :key="city.regionName"
                                @click.stop.prevent="getCity(city)"
                                v-show="activeIdx === 1"
                            >{{
                                city.regionName
                            }}</li>
                            <li
                                class="addressCont"
                                v-for="district in districtList"
                                :key="district.regionId"
                                @click.stop.prevent="getDistrict"
                                v-show="activeIdx === 2"
                            >{{
                                district.regionName
                            }}</li>
                        </ul>
                    </div>
                </div>
            </section>
        </transition>
    </div>
</template>

<script>
let provinceList=[
    {"regionCode":"122","regionName":"吉林省","regionLevel":"1","regionId":"787"},
    {"regionCode":"134","regionName":"安徽省","regionLevel":"1","regionId":"788"},
    {"regionCode":"136","regionName":"江西省","regionLevel":"1","regionId":"789"},
    {"regionCode":"141","regionName":"河南省","regionLevel":"1","regionId":"790"},
    {"regionCode":"154","regionName":"西藏自治区","regionLevel":"1","regionId":"791"},
    {"regionCode":"165","regionName":"新疆维吾尔自治区","regionLevel":"1","regionId":"792"},
    {"regionCode":"111","regionName":"北京市","regionLevel":"1","regionId":"793"},
    {"regionCode":"133","regionName":"浙江省","regionLevel":"1","regionId":"794"},
    {"regionCode":"145","regionName":"广西壮族自治区","regionLevel":"1","regionId":"795"},
    {"regionCode":"151","regionName":"四川省","regionLevel":"1","regionId":"796"},
    {"regionCode":"113","regionName":"河北省","regionLevel":"1","regionId":"797"},
    {"regionCode":"132","regionName":"江苏省","regionLevel":"1","regionId":"798"},
    {"regionCode":"143","regionName":"湖南省","regionLevel":"1","regionId":"799"},
    {"regionCode":"164","regionName":"宁夏回族自治区","regionLevel":"1","regionId":"800"},
    {"regionCode":"112","regionName":"天津市","regionLevel":"1","regionId":"801"},
    {"regionCode":"114","regionName":"山西省","regionLevel":"1","regionId":"802"},
    {"regionCode":"121","regionName":"辽宁省","regionLevel":"1","regionId":"803"},
    {"regionCode":"137","regionName":"山东省","regionLevel":"1","regionId":"804"},
    {"regionCode":"144","regionName":"广东省","regionLevel":"1","regionId":"805"},
    {"regionCode":"162","regionName":"甘肃省","regionLevel":"1","regionId":"806"},
    {"regionCode":"142","regionName":"湖北省","regionLevel":"1","regionId":"807"},
    {"regionCode":"152","regionName":"贵州省","regionLevel":"1","regionId":"808"},
    {"regionCode":"153","regionName":"云南省","regionLevel":"1","regionId":"809"},
    {"regionCode":"146","regionName":"海南省","regionLevel":"1","regionId":"810"},
    {"regionCode":"161","regionName":"陕西省","regionLevel":"1","regionId":"811"},
    {"regionCode":"115","regionName":"内蒙古自治区","regionLevel":"1","regionId":"812"},
    {"regionCode":"131","regionName":"上海市","regionLevel":"1","regionId":"813"},
    {"regionCode":"135","regionName":"福建省","regionLevel":"1","regionId":"814"},
    {"regionCode":"150","regionName":"重庆市","regionLevel":"1","regionId":"816"},
    {"regionCode":"163","regionName":"青海省","regionLevel":"1","regionId":"817"},
    {"regionCode":"123","regionName":"黑龙江省","regionLevel":"1","regionId":"815"},
    {"regionCode":"934","regionName":"澳门","regionLevel":"1","regionId":"47893"},
    {"regionCode":"933","regionName":"香港特区","regionLevel":"1","regionId":"47892"},
    {"regionCode":"935","regionName":"台湾省","regionLevel":"1","regionId":"717361"}
];
export default {
    name: 'jxAddress',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            itemWidth: 0, // 每个副标题的宽度
            curLineLeft: 0, // 初始高亮下划线的位置
            provineceName: '',
            cityName: '',
            districtName: '',
            townName: '',
            provinceList: provinceList,
            cityList: provinceList,
            districtList: [],
            activeIdx: 0
        }
    },
    mounted () {
        this._getRect();
    },
    methods: {
        // 获取单个副标题宽度与下划线的初始left
        _getRect () {
            // 元素默认隐藏时, 无法获取offsetWidth
            this.itemWidth = window.getComputedStyle(this.$refs.subtitle.children[0]).width;
            this.curLineLeft = window.getComputedStyle(this.$refs.currentLine).left;
            this.itemWidth = Number(this.itemWidth.slice(0, -2));
            this.curLineLeft = Number(this.curLineLeft.slice(0, -2));
            this._changeCurrentLine(0);
        },

        // 高亮时下划线的位置
        _changeCurrentLine (idx) {
            this.$refs.currentLine.style.left = idx * this.itemWidth + this.curLineLeft + 'px';
            this._activeTitle(idx);
        },

        // 高亮副标题
        _activeTitle (idx) {
            this.activeIdx = idx;
        },

        // 关闭地址选择
        closeAddress () {
            this.$emit('update:show', false);
        },

        // 省份选择
        provinceSelected () {
            this._changeCurrentLine(0);
        },

        // 城市选择
        citySelected () {
            this._changeCurrentLine(1);
        },

        // 区选择
        districtSelected () {
            this._changeCurrentLine(2);
        },

        // 城镇选择
        townSelected () {
            this._changeCurrentLine(3);
        },

        // 获取省份
        getPovince ({ regionCode, regionName }) {
            this._changeCurrentLine(1);
            this.$refs.scroll.scrollTop = 0;
            this.provineceName = regionName;
            this.cityName = '';
            this.districtName = '';
        },

        // 获取城市
        getCity ({ regionCode, regionName }) {
            this._changeCurrentLine(2);
            this.cityName = regionName;
            this.districtName = '';
        },

        // 获取区
        getDistrict () {}
    }
}
</script>

<style lang="less" scoped>

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* .slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-leave-active,
.slide-enter {
    -webkit-transform: translateY(50%);
    transform: translateY(50%);
} */

.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter,
.slide-leave-to {
    -webkit-transform: translateY(50%);
    transform: translateY(50%);
    opacity: 0;
}

/* 单独写是因为想要两种过渡效果 */
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 120;
    background: rgba(0, 0, 0, .5);
}
.adress-box {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 121;
    background: rgba(0, 0, 0, 0);
    .adress-contnet {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 121;
        background: #fff;
        width: 100%;
        height: 300px;
        .title {
            position: relative;
            display: inline-block;
            width: 100%;
            padding: 20px 0;
            text-align: center;
            color: #999;
            h4 {
                font-size: 14px;
                line-height: 14px;
                display: inline-block;
            }
            .close-box {
                position: absolute;
                right: 1px;
                bottom: 3px;
                margin: 20px 15px;
                line-height: 15px;
                text-align: right;
                .icon-close {
                    font-size: 18px;
                }
            }
        }
        .current-address-title {
            position: relative;
            display: flex;
            width: 100%;
            text-align: center;
            color: #999;
            &:before {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    content: '';
                    height: 1px;
                    background: #d7d7d7;
                    transform: scaleY(0.5) translateY(-50%);
            }
            .current-item {
                font-size: 14px;
                padding: 10px 4px;
                line-height: 16px;
                color: #333;
                width: 20vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex-grow: 0;
                text-align: center;
            }
            .current-line {
                position: absolute;
                left: 2vw;
                width: 16vw;
				bottom: 0px;
				height: 2px;
				background: #e4393c;
                -webkit-transition: left;
                transition: left;
                transition-duration: 300ms;
            }
            .active {
                color: #ff5028;
            }
        }
        .picker-content {
            width: 95%;
            height: 206px;
            ul {
                height: 100%;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
                &::-webkit-scrollbar{
                    display: none;
                }
                .addressCont {
                    padding: 15px 0;
                    font-size: 14px;
                    line-height: 14px;
                    color: #333;
                    margin-left: 18px;
                    font-family: PingFangSC-Light;
                }
            }
        }
    }
}

</style>
