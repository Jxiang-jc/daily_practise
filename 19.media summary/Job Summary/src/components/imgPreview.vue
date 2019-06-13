// 图片预览的组件
<template>
    <transition name="fade">
        <div v-if="show" class="mask">
            <div class="img-box">
                <!-- <img :src="imgUrl" alt=""> -->
                <div class="bgImg" :style="{ backgroundImage: 'url(' + imgUrl + ')' }"></div>
            </div>
            <div v-if="deleteShow" class='delete-img' @click="hide">
                <i class="iconfont icon-cancel"></i>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'imgPreview',
    props: {
        imgUrl: {
            type: String,
            required: true
        },
        deleteShow: {
            type: Boolean,
            default: true
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hide () {
            this.$emit('update:show', false);
        }
    }
}
</script>

<style lang="scss" scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* 遮罩层样式 */
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 25;
}

/* 不限制图片大小，实现居中 */
.img-box {
    width: 100%;
    height: 90%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 26;
    div {
        background-size: 100% 99.99%;
        width: 90%;
        height: 90%;
        border-radius: 10px;
        background-position: center;
    }
    // img {
    //     position: absolute;
    //     display: block;
    //     width: 90%;
    //     max-height: 580px;
    //     border-radius: 10px;
    // }
}
.delete-img {
    height: 10%;
    position: relative;
    i {
        display: blcok;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 26;
        font-size: 25px;
        color: #d9d9d9;
    }
}

</style>
