<template>
    <div class="index">
        <h1>主要是展示vue2.4新增的$attrs和$listener</h1>
        <h2>父组件通与孙组件通信时的一种更高级更简洁的写法</h2>
        <Father />
        <br />
    </div>
</template>

<script>
import Father from "./father";

export default {
    components: {
        Father
    },
    data() {
        return {};
    },
    methods: {},
    created() {},
    mounted() {}
};
</script>
<style lang='less' scoped>
</style>