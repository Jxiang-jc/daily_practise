<template>
  <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; // 引入编辑器
import editorOptions from './vue-quill-editor-config.js' // 引入quill配置
export default {
  data () {
    return {
      content: "", // 文本内容
      editorOption: editorOptions,
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorBlur(event) {},
    onEditorFocus(event) {},
    onEditorReady(event) {},
  }
}
</script>

<style>

</style>
