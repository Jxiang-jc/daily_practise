<template>
    <div class="filter-bar-box">
        <filter-bar
            ref="filter"
            @orderTypeChange="orderTypeChange"
            @showFilter="showFilter=true"
        ></filter-bar>
    </div>
</template>

<script>
import filterBar from '_c/filterBar'
export default {
    name: 'filterBarTest',
    components: {
        filterBar
    },
    data () {
        return {
            showFilter: false, // 控制filterBar（物理返回键）
        }
    },
    deactivated() {
        this.$refs.filter.hide();
        document.removeEventListener('backbutton',this.bindBack,false)
    },
    activated() {
        document.addEventListener('backbutton',this.bindBack,false)
    },
    methods: {
        orderTypeChange (item) {
            this.showFilter = false
            this.orderType = item.orderText

            // 根据返回的值做对应的操作，比如查询等。。
            // this.getValue()
        },
        
        // 安卓物理返回键事件
        bindBack () {
            if(this.showFilter) {
                this.$refs.filter.hide();
                this.showFilter = false;
                return;
            }
            // 如果监听的物理返回键事件，必须手动添加返回
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
    .filter-bar-box {
        background: #f4f4f4;
        width: 100%;
        height: 500px;
    }
</style>
