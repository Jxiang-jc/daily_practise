<template>
    <div class="grandson">
        <div>我是孙子88</div>
        <div>我从爷爷那里拿到{{giveGrandson1 + ' 和 ' + giveGrandson2}}</div>
    </div>
</template>

<script>
export default {
    props: {
        giveGrandson1: String,
        giveGrandson2: String
    },
    components: {},
    data() {
        return {};
    },
    methods: {},
    created() {},
    mounted() {
        this.$emit("getFromGrandson", "加油兄弟");
    }
};
</script>
<style lang='less' scoped>
</style>