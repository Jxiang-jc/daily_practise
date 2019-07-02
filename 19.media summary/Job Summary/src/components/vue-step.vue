<!-- created by Jxiang 2019-6-21 -->
<template>
    <div class="jx-step-warp-horizontal">
        <!-- 步骤条背景颜色 -->
        <div class="jx-step-progress-bg">
            <!-- 步骤条实际进度 -->
            <div class="jx-step-progress-value" :style="progressStyle"></div>
            <ul class="jx-step-list">
                <li
                    v-for="(item, idx) in stepList"
                    :key="idx"
                    class="jx-step-item"
                    :style="horizontalItemWidth"
                    @click="selectItem(idx)"
                >
                    <label class="jx-step-item-label" v-if="item.label">{{ item.label }}</label>
                    <div class="jx-step-item-circle" :style="itemNumberStyle(idx)"></div>
                    <div class="jx-step-item-ctx" v-if="item.minLimit">{{ item.minLimit }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
/**
 * step
 * @module components/step
 * @desc   步骤条
 * @param { umber, String } nowStep   - 当前step
 * @param { umber, String } stepPrecent   - 进度条百分比
 * @param { Array } stepList   - step参数
 * @param { String } activeColor   - 当前step的圆点颜色
 *
 * @example
 * <step
      :step-list="stepList"
      :step-precent="precent"
      @selected="doSomething"
      class="reset-step-style"
    />
    stepList: [
                {
                    label: "2%",
                    minLimit: "10000",
                    maxLimit: "50000"
                },
                {
                    label: "5%",
                    minLimit: "50000",
                    maxLimit: "100000"
                },
              ]
 */
export default {
    name: "jx-step",
    props: {
        stepPrecent: {
            type: [Number, String],
            required: true
        },
        stepList: {
            type: Array,
            required: true
        },
        activeColor: {
            type: String,
            default: "#E74520"
        }
    },
    data() {
        return {
            currentStep: 0 // 默认不显示圆点样式
        };
    },
    computed: {
        // 每一步 宽度
        stepItemWidth() {
            return (100 / (this.stepList.length + 1)).toFixed(2);
        },
        horizontalItemWidth() {
            return { width: this.stepItemWidth + "%" };
        },
        // 控制进度条显示位置
        nowPrecent() {
            // 获取所有的阶梯和length
            let ladder = this.stepList,
                ladderLen = ladder.length;

            // 初始化百分比
            let initPrecent = 0;

            // 每一格占据百分比
            let precentItem = (100 / (ladderLen + 1)).toFixed(2);

            // 转int，以防传进来的是string
            let stepPrecent = Number(this.stepPrecent);

            // 遍历数组。根据数据计算显示当前进度条显示的位置（百分比）
            ladder.forEach((item, idx, arr) => {
                if (
                    stepPrecent >= item.minLimit &&
                    stepPrecent <= item.maxLimit
                ) {
                    this.currentStep = idx + 1 > ladderLen ? idx : idx + 1;

                    initPrecent = precentItem * (idx + 1);

                    // 圆点在当前区间位置 = (传进来的值 - 当前区间最小值) / (当前区间最大值 - 当前区间最小值) * 当前区间占总进度条的百分比
                    let historyAmountOccupy = stepPrecent - item.minLimit,
                        currentOccupy = item.maxLimit - item.minLimit;

                    let currentRate =
                        (historyAmountOccupy / currentOccupy).toFixed(2) *
                        precentItem;

                    initPrecent += currentRate;
                } else if (stepPrecent < arr[0].minLimit) {
                    // 小于第一阶梯
                    this.currentStep = 0;

                    initPrecent =
                        (stepPrecent / arr[0].minLimit).toFixed(2) *
                        precentItem;
                } else if (stepPrecent > arr[ladderLen - 1].maxLimit) {
                    // 大于最后一阶梯
                    initPrecent = 100;

                    this.currentStep = ladderLen;
                }
            });

            return initPrecent;
        },
        // 进度条value样式
        progressStyle() {
            let oStyle = {
                "background-color": this.activeColor
            };
            if (parseInt(this.nowPrecent) > 100) {
                oStyle.width = "100%";
            } else {
                oStyle.width = this.nowPrecent + "%";
            }
            return oStyle;
        }
    },
    methods: {
        // 圆点样式
        itemNumberStyle(idx) {
            let style = null;
            if (idx < this.currentStep) {
                style = {
                    "background-color": this.activeColor
                };
            }
            return style;
        },
        // 允许手动点击
        selectItem(itemIndex) {
            this.$emit("selected", this.stepList[itemIndex]);
        }
    }
};
</script>

<style lang="less" scoped>
.jx-step-warp-horizontal {
    position: relative;
    width: 100%;
    z-index: 2;
    .jx-step-progress-bg {
        position: relative;
        width: 100%;
        height: 2px;
        background: #dbdbdb;
        .jx-step-progress-value {
            position: absolute;
            top: 0;
            left: 0;
            height: inherit;
            transition: width 0.6s ease;
            &:after {
                content: "";
                position: absolute;
                right: 0;
                top: -2px;
                right: -3px;
                display: block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #e74520;
            }
        }
        .jx-step-list {
            display: -webkit-flex;
            display: flex;
            user-select: none;
            justify-content: center;
            text-align: center;
            .jx-step-item {
                position: relative;
                display: -webkit-flex;
                display: flex;
                flex-direction: column;
                align-items: center;
                .jx-step-item-label {
                    position: absolute;
                    top: -25px;
                    font-family: PingFangSC-Light;
                    font-size: 12px;
                    color: #ff5028;
                }
                .jx-step-item-circle {
                    position: absolute;
                    top: -3PX;
                    width: 8PX;
                    height: 8PX;
                    border-radius: 50%;
                    color: #999;
                    background-color: #ddd;
                }
                .jx-step-item-ctx {
                    position: absolute;
                    top: 12px;
                    color: #ff5028;
                }
            }
        }
    }
}
</style>
