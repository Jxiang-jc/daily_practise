<template>
    <div class="father">
        <div>我是爸爸66</div>
        <Son :giveSon="giveSon" :giveGrandson1="giveGrandson1" :giveGrandson2="giveGrandson2" @getFromGrandson="handleGetData" />
        <br />
    </div>
</template>

<script>
import Son from "./son";
export default {
    components: { Son },
    data() {
        return {
            giveSon: "jx666",
            giveGrandson1: "jx777",
            giveGrandson2: "jx888"
        };
    },
    methods: {
        handleGetData(data) {
            console.log('这是从孙子那里拿到的参数：', data)
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang='less' scoped>
</style>