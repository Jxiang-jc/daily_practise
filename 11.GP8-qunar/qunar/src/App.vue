<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss">
    $color: red;
    div {
        background: $color;
        height: 200px;
    }
</style>
