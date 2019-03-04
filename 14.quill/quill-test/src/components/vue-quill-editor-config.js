
import * as Quill from "quill"; // 引入编辑器
console.log(Quill)
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

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ['bold', 'italic', 'underline', 'strike'],            // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'],                         // 引用 代码块
  [{'header': 1}, {'header': 2}],                       // 1、2 级标题
  [{'list': 'ordered'}, {'list': 'bullet'}],            // 有序、无序列表
  [{'script': 'sub'}, {'script': 'super'}],             // 上标/下标
  [{'indent': '-1'}, {'indent': '+1'}],                 // 缩进
  [{'direction': 'rtl'}],                               // 文本方向
  [{'size': ['small', false, 'large', 'huge']}],        // 字体大小
  [{'header': [1, 2, 3, 4, 5, 6, false]}],              // 标题
  [{'color': []}, {'background': []}],                  // 字体颜色、字体背景颜色
  [{'font': fonts}],                                       // 字体种类
  [{'align': []}],                                      // 对齐方式
  ['clean'],                                            // 清除文本格式
  ['link', 'image', 'video']                            // 链接、图片、视频
]

// 川辰配置
const ccToolOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{header: 1}, {header: 2}],
  [{list: "ordered"}, {list: "bullet"}],
  // [{script: "sub"},{script: "super"}],
  [{indent: "-1"}, {indent: "+1"}],
  [{direction: "rtl"}],
  [{size: ["small", false, "large", "huge"]}],
  [{header: [1, 2, 3, 4, 5, 6, false]}],
  [{color: []}, {background: []}],
  [{font: fonts}], // 把上面定义的字体数组放进来
  [{align: []}],
  ["clean"],
  ["image"]
]

// 拖拽缩放配置
const imageResizeConfig = {
  handleStyles: {
    backgroundColor: '#58bc58',
    border: 'none',
    color: 'white',
    padding: '10px'
      // other camelCase styles for size display
  },
  displayStyles: {
    // display: 'none';      
  },
  toolbarStyles: {
    display: 'none'
  }
}


// 全部配置
const editorOptions = {
  placeholder: '',
  theme: 'snow',  // 主题
  modules: {
    toolbar: {
      container: ccToolOptions,  // 工具栏选项
    },
    imageResize: {}
    // imageResize: imageResizeConfig
  }
}

export default editorOptions
