// 筛选功能的组件
<template>
    <div class="filter">
        <div class="sub_header row">
            <div
                v-for="(type, idx) in types" :key="idx"
                class="col"
                :class="{active: kind === idx && show}" @click="showKind(idx)"
            >
                {{ type }}
                <i class="iconfont iconicon_sanjiaoxing"></i>
            </div>
        </div>
        <transition name="slide">
            <div class="filter-body" v-show="show">
                <div class="content" v-for="(type, index) in types" :key="index">
                    <div class="order-content" v-if="kind === index">
                        <div
                        v-for="(item, ids) in typeList[index]" :key="ids"
                        class="item"
                        :class="{active: item.active}"
                        @click="orderSelect(item, ids, index)"
                    >
                        {{ item.orderText }}
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="mask" :class="{'top-135':show}" v-show="show" @click="hide"></div>
    </div>
</template>

<script>
export default {
    name: 'filterBar',
    props: {},
    data () {
        return {
            show: false, // 默认状态
            kind: 0, // 控制显示的类型
            types: ['类型1', '类型2', '类型3'],
            typeList: [
                [
                    { orderId: 0, orderText: '类型1', active: true, val: ''},
                    { orderId: 1, orderText: '类型11', active: false, val: 'jx111'},
                    { orderId: 2, orderText: '类型12', active: false, val: 'jx122'}
                ],
                [
                    { orderId: 0, orderText: '类型2', active: true, val: ''},
                    { orderId: 1, orderText: '类型21', active: false, val: 'jx211'},
                    { orderId: 2, orderText: '类型22', active: false, val: 'jx222'}
                ],
                [
                    { orderId: 0, orderText: '类型3', active: true, val: ''},
                    { orderId: 1, orderText: '类型31', active: false, val: 'jx311'},
                    { orderId: 2, orderText: '类型32', active: false, val: 'jx322'}
                ]
            ]
        }
    },
    methods: {
        showKind (key) {
            console.log("TCL: showKind -> key", key)
            console.log("TCL: showKind -> this.kind", this.kind)
            let kind = key
            if (this.kind === key && this.show) {
                
                this.hide()
            } else {
                this.kind = key
                this.show = true
                this.$emit('showFilter')
            }
        },
        hide () {
            console.log(1111)
            this.show = false
        },

        // 选择处理事件
        orderSelect (item, ids, index) {
            console.log("TCL: orderSelect -> item", item)
            // 本身已经选中
            if (item.active) {
                this.$emit('orderTypeChange', item)

                this.types[index] = item.orderText

                this.hide()

                return
            }

            this.typeList[index]
                .filter(item => {
                    return item.active
                })
                .forEach(v => {
                    v.active = false
                })
            
            this.$set(item, 'active', true)
            this.$emit('orderTypeChange', item)
            this.types[index] = item.orderText
            this.hide()
        }
    },
    watch: {
        // 如果需要通过props传typeList的值进来。可以使用监听
    }

}
</script>

<style scpoed lang="scss">
.filter {
    z-index: 24;
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
    font-family: PingFangSC-Light;
    .sub_header {
        position: absolute;
        top: 0;
        height: 50px;
        width: 100%;
        color: #595959;
        background: #fff;
        z-index: 25;
        &.row {
            display: flex;
        }
        .col {
            flex-grow: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            &.active {
                color: #ff5028;
                font-family: PingFangSC-Regular;
                .iconfont {
                    margin-left: 7px;
                    font-size: 12px;
                    color: #ff5028;
                }
            }
            .iconfont {
                margin-left: 7px;
                font-size: 12px;
                color: #979797;
            }
        }
    }
    .filter-body {
        position: absolute;
        top:45px;
        left: 0;
        right:0;
        z-index: 25;
        .content {
            display: flex;
            line-height: 44px;
            font-size: 14px;
            background: #fff;
            color: #666;
            .order-content {
                padding: 13px 0;
            }
            .kind-content {
                display: flex;
                flex-grow: 1;
            }
            .item {
                padding-left: 25px;
                &.active {
                    color: #ff5028;
                    background: #fff;
                }
            }
        }
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 24;
        background: rgab(0, 0, 0, 0.7);
        &.top-100 {
            top: 100px;
        }
    }
}
</style>
