<template>
    <div class="son">
        <div>我是儿子</div>
        <div>我不需要的props有：{{$attrs}}</div>
        <Grandson v-bind="$attrs" v-on="$listeners" />
        <br />
    </div>
</template>

<script>
import Grandson from "./grandson";
export default {
    components: { Grandson },
    props: {
        giveSon: String
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