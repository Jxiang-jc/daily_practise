//封装vue-quill-editor
// 对接七牛文件上传的版本

<template>
  <div>
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>

    <el-dialog title="上傳圖片" :visible.sync="uploadPicDialog" width="60%" append-to-body>
      <el-input v-model="photoUrl" placeholder="粘貼網絡圖片地址"></el-input>
      <el-row style="margin-top:20px;">
        <cc-uploader :config="uploaderConf" fType="image" v-model="photoUrlR"/>
      </el-row>
      <el-button type="primary" @click="addImage()" :disabled="addable">添加</el-button>
    </el-dialog>

    <el-dialog title="修改尺寸"
      :visible.sync="editPicSizeDialog" width="60%" 
      append-to-body
      @close="cancel"
      >
      <el-form :model="formData" :rules="rules" ref="editorAliForm">
        <el-form-item label="宽度: "
        :label-width="formLabelWidth"
        prop="imgWidth">
          <el-input v-model="formData.imgWidth"
          autocomplete="off"
          @blur="changeHeight(formData.imgWidth)"></el-input>
        </el-form-item>
        <el-form-item label="高度: "
        :label-width="formLabelWidth"
        prop="imgHeight">
          <el-input v-model="formData.imgHeight"
          autocomplete="off"
          @blur="changeWidth(formData.imgHeight)"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; // 引入编辑器
import ImagePreview from "@/components/img_preview.vue";

// 图片拖拽缩放
import ImageResize from 'quill-image-resize-module-withfix'; 

Quill.register('modules/imageResize', ImageResize);

// quill编辑器的字体
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif"
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts; // 将字体加入到白名单
Quill.register(Font, true);

const imageResizeConfig = {
  handleStyles: {
      backgroundColor: '#58bc58',
      border: 'none',
      color: 'white'
      // other camelCase styles for size display
  },
  displayStyles: {
    // display: 'none';      
  },
  toolbarStyles: {
    display: 'none'
  }
}

export default {
  model: {
    prop: "con",
    event: "change"
  },
  props: {
    con: ""
  },
  data() {
    let newReg1 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("不能为负数"));
      } else if (!(/(^[1-9]\d*$)/.test(value))) {
        callback(new Error("请输入正整数"));
      } else {
        callback(); // 必须要有回调，要不然表单无法提交
      }
    }

    return {
      uploaderConf: this.$uploadUtils.configPublish,
      content: "", // 文本内容
      editorOption: { // 编辑器选项
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [
              {
                header: 1
              },
              {
                header: 2
              }
            ],
            [
              {
                list: "ordered"
              },
              {
                list: "bullet"
              }
            ],
            // [
            //   {
            //     script: "sub"
            //   },
            //   {
            //     script: "super"
            //   }
            // ],
            [
              {
                indent: "-1"
              },
              {
                indent: "+1"
              }
            ],
            [
              {
                direction: "rtl"
              }
            ],

            [
              {
                size: ["small", false, "large", "huge"]
              }
            ],
            [
              {
                header: [1, 2, 3, 4, 5, 6, false]
              }
            ],

            [
              {
                color: []
              },
              {
                background: []
              }
            ],
            [
              {
                font: fonts
              }
            ], // 把上面定义的字体数组放进来

            [
              {
                align: []
              }
            ],

            ["clean"],
            ["image"]
          ],
          imageResize: imageResizeConfig
        },
        theme: "snow"
      },
      addRange: [],
      photoUrlR: "",
      photoUrl: "", // 上传图片地址
      uploadPicDialog: false,
      uploadType: "", // 上传的文件类型（图片、视频）
      addable: true,
      editPicSizeDialog: false,
      formData: {
        imgWidth: '',
        imgHeight: ''
      },
      formLabelWidth: '120px',
      rules: {
        imgWidth: [
          { required: true, message: '请输入宽度', trigger: 'blur' },
          { validator: newReg1, trigger: 'blur'}
        ],
        imgHeight: [
          { required: true, message: '请输入高度', trigger: 'blur' },
          { validator: newReg1, trigger: 'blur'}
        ]
      }
    };
  },
  components: {
    quillEditor,
    ImagePreview
  },
  watch: {
    content: {
      handler(nv, ov) {
        this.$emit("change", this.content);
      },
      deep: true
    },
    con: {
      handler(nv, ov) {
        this.content = this.con;

      },
      deep: true,
      immediate: true
    },
    photoUrlR: {
      handler() {
        if (this.photoUrlR.length > 0) {
          this.photoUrl = this.photoUrlR + "?x-oss-process=image/resize,w_1024";
        }
        this.addable = false;
      }
    }
  },

  methods: {
    onEditorBlur(event) {},
    onEditorFocus(event) {},
    onEditorReady(event) {},

    // 上传图片
    imgHandler(state) {
      this.uploadType = "image";
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();
      if (state) { // 成功回调 true
        this.uploadPicDialog = true;
      }
    },

    addImage() {
      this.$refs.myQuillEditor.quill.insertEmbed(
        this.addRange !== null ? this.addRange.index : 0,
        this.uploadType,
        this.photoUrl,
        Quill.sources.USER
      ); // 调用编辑器的 insertEmbed 方法，插入URL
      this.photoUrl = "";
      this.photoUrlR = "";
      this.uploadPicDialog = false;
      this.addable = true;
    },
    dividerHandler() {},

    // 判断处理事件
    judgeEvent () {
      // 获取编辑器
      // this.editorBox = this.$refs.myQuillEditor.$el
      this.editorBox = document.querySelector('.quill-editor')

      this.editorBox.addEventListener('click', (e) => {
        // console.log(e.target.className)
        if (e.target) {
          let evt = e.target

          if (evt.tagName && evt.tagName.toLowerCase() === 'img') {

            // 获取图片
            this.image = evt

            // 获取当前图片的父级元素, 并添加手动修改按钮(伪元素)
            this.imgBox = evt.parentNode

            this.imgBox.classList.add('editSizeButton')

          } else if (evt.classList && evt.classList.contains('editSizeButton')) {

            // 点击修改尺寸 弹窗
            this.editPicSizeDialog = true

            // 获取当前图片宽高
            this.formData.imgWidth = this.image.clientWidth || this.image.offsetWidth

            this.formData.imgHeight = this.image.clientHeight || this.image.offsetHeight

            this.scale = this.formData.imgWidth / this.formData.imgHeight
            console.log('this.scale: ', this.scale);
            
          } else {

            if (evt.style && evt.style.position && evt.style.position === 'absolute') {
              // 该插件第一次点击图片以后, 会默认添加一层div覆盖在img上.或者说, 变成了div
              return
            }

            if (this.imgBox) this.removeEditBtn()
              
          }
        }

      }, false)


      // 滚动监听, 第三个参数必须为true, 否则不执行
      this.editorBox.addEventListener('scroll', () => {
        this.removeEditBtn()
      }, true)

    },

    cancel () {
      this.editPicSizeDialog = false
      this.removeEditBtn()
    },

    submit () {

      console.log("this.$refs['editorAliForm']: ", this.$refs['editorAliForm'])
      console.log('this.$refs.editorAliForm: ', this.$refs.editorAliForm)
      this.$refs['editorAliForm'].validate(valid => {

        if (valid) {

          this.$message({
            message: "保存成功",
            type: "success"
          })

          this.editPicSizeDialog = false
          this.removeEditBtn()

          // img标签设置width不需要通过style
          this.image.width = this.formData.imgWidth
          
          // 设置了高度，就无法按比例缩放，具体查看<img>标签解释
          this.image.dataset.width = this.formData.imgWidth
          this.image.dataset.height = this.formData.imgHeight

        } else {
          this.$message({
            message: "请完善表单后提交！",
            type: "error"
          })
          return false;
        }
      })
    },

    removeEditBtn () {
      if (this.imgBox && this.imgBox.classList)
        this.imgBox.classList.remove('editSizeButton')
    },

    // 根据宽改变高度
    changeHeight (imgW) {
      this.formData.imgHeight = Math.ceil(imgW / this.scale)
    },
    
    // 根据高度改变高度
    changeWidth (imgH) {
      this.formData.imgWidth = Math.ceil(imgH * this.scale)
    }
  },
  
  mounted() {
    // 为编辑器的图片图标绑定点击事件
    let toolBar = this.$refs.myQuillEditor.quill.getModule("toolbar");
    toolBar.addHandler("image", this.imgHandler);

    // 点击图片事件
    this.judgeEvent()

  }

};
</script>

<style>
.ql-container.ql-container.ql-container {
  height: 420px;
  display: block;
  overflow: hidden;
  
}

.quill-editor.quill-editor.quill-editor {
  height: 500px;
  display: block;
}

.editSizeButton {
  position: relative;
  min-height: 50px;
  z-index:0;
  pointer-events: none;
}

.editSizeButton:after {
  position: absolute;
  top: -30px;
  left: 0;
  content: '修改尺寸';
  height: 30px;
  line-height:30px;
  font-size: 18px;
  text-align: center;
  width: 120px;
  background:linear-gradient(bottom, rgb(44, 160, 202) 0%, rgb(62, 184, 229) 100%);
  cursor:pointer;
  z-index: 99999;
  pointer-events: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: white;
}
.editSizeButton:hover:after {
  opacity:0.9;
}
.editSizeButton:active:after {
  opacity:0.8;
}

</style>
