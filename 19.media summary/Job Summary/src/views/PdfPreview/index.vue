<template>
    <div id="app">
        <button @click="show=!show">点我</button>
        <pdf-preview :url="url" :show="show"></pdf-preview>
    </div>
</template>

<script>
import pdfPreview from '_c/PdfPreview.vue'

export default {
    name: 'PdfPreview',
    components: {
        pdfPreview
    },
    data() {
        return {
            url: 'http://118.24.174.95/api/mvp-manager/file/download/5F87A68CA98D4B0092E9C6EA4B528DB6',
            // url: 'http://fp.midea.com/trade-invoice/get?id=qMNNfeJN3IZr',
            show: false
        }
    }
}
</script>

<style>
</style>
