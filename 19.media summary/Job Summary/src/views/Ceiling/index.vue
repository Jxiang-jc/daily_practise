<template>
    <div>
        <ul class="ceiling-box">
            <li v-for="(list, idx) in lists" :key="idx" :class="{'isFixed': list.ceiling}">{{ list.ctx }}</li>
        </ul>
        <p v-show="showTest" class="copy-fixed">我是吸顶--------------{{ num }}</p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            lists: [],
            num: 0,
            showTest: false,
            firstTop: 0
        }
    },
    mounted () {
        this._initData()
        
        window.addEventListener('scroll', this.onScroll)
    },
    methods: {
        _initData () {
            for (let i = 0; i < 300; i++) {
                // 取余等于0
                if (i % 100 === 0) {
                    this.lists.push({
                        ctx: '我是吸顶--------------' + i,
                        ceiling: true
                    })
                } else {
                    this.lists.push({
                        ctx: 'jx666+'+ i,
                        ceiling: false
                    })
                }
            }
            this.$nextTick(() => {
                this.firstTop = document.querySelector('.isFixed').getBoundingClientRect().top
            })


        },
        // 监听滚动条
        // 这里的做法有一个小bug，如果要完善的话。需要获取到0-99个li的总高度。计算它的getBoundingClientRect().bottom距离顶部的值
        onScroll () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

            if (scrollTop > this.firstTop) {
                this.showTest = true
            } else {
                this.showTest = false
            }
            var allTitle = document.querySelectorAll('.isFixed');
            for (let i = 0, len = allTitle.length; i < len; i++) {
                var contop = allTitle[i].getBoundingClientRect().top;
                if (contop > 0 && contop < this.firstTop) {
                    this.num = i;
                    console.log("TCL: onScroll -> this.num", this.num)
                }
            }
        }
    }
}
</script>
<style scoped>
.ceiling-box li{
    height: 30px;
    line-height: 30px;
}
.copy-fixed {
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #58bc58;
}
</style>