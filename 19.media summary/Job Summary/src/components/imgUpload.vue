<template>
	<div class="vue-uploader">
		<!-- title -->
		<h3 class="file-tips">
			还可以上传{{ maxlength - files.length }}张图片
		</h3>
		<div class="file-list">
			<!-- img list -->
			<section v-for="(file, index) in files" :key="index"
				class="file-item draggable-item"
			>
				<img :src="file.src" alt="" ondragstart="return false;">
				<span v-show="canEdit" class="file-remove" @click="remove(file, index)">+</span>
			</section>
			<!-- add -->
			<section v-show="files.length < maxlength && canEdit" class="file-item add-box">
				<div @click="add">
					<div class="add">
						<span>+</span>
					</div>
				</div>
			</section>
		</div>
		<!-- progress bar -->
		<section>
			<div class="imgProgress-bar">
				<section v-if="uploading" :style="{width:(percent * 100) + '%'}">{{(percent * 100) + '%'}}</section>
			</div>
		</section>
		<!-- file -->
		<input type="file" accept="image/*" @change="fileChanged" ref="file" :multiple="multiple">
	</div>
</template>

<script>
	export default {
		props: {
			src: { // 图片上传地址
				type: String,
				required: true
			},
			canEdit: { // 是否可编辑
				type: Boolean,
				default: true
			},
			imgData: { // 初始化img数据，（编辑 / 查看时的数据源）
				type: Object,
				required: false,
				default: () => {
					return {}
				}
			},
			multiple: { // 图片是否可多选
				type: Boolean,
				default: true
			},
			change: { // 修改数据源对象的值不能让数据源发生改变时使用（页面无刷新加载）
				type: Boolean,
				required: false
			},
			maxlength: { // 最多上传多少张
				type: Number,
				return: 6
			},
			clear: { // 是否需要清楚以上传的所有图片
				type: Boolean,
				required: false,
				default: false
			}
		},
		data () {
			return {
				files: [], //图片数据
				isFirstLoad: true, // 是否是第一次加载
				uploading: false, // 上传中显示进度条
				percent: 0, // 进度条百分比
				newUrl: '', // canvas压缩后图片地址
			}
		},
		mounted () {
			this.initFiles();
		},
		methods : {
			// 清除所有图片（首次加载时使用）
			clearFiles (){
				if (this.clear) {
					this.files = [];
				}
			},
			// 初始化数据
			initFiles () {
				if (JSON.stringify(this.imgData) !== '{}') {
					console.log('this.imgData', this.imgData)
					for (let key in this.imgData) {
						var tempObj = {};
						tempObj['name'] = key;
						tempObj['src'] = process.env.NODE_ENV === 'production' ?
														this.imgData[key] + '?x-oss-process=image/resize,w_200,h_300/quality,q_100' :
														'http://' + this.imgData[key] + '?x-oss-process=image/resize,w_200,h_300/quality,q_100';
						this.files.push(tempObj);
					}
				}
				this.isFirstLoad = false;
			},
			add () {
				this.$refs.file.click();
			},
			// 上传图片
			submit (file, index) {
				console.log('图片上传中');
				if (this.files.length === 0) {
					console.warn('no file!');
					return;
				}
				const formData = new FormData();
				var blob = this.dataURItoBlob(this.newUrl);
				console.log('压缩后的图片大小 》》》', blob.size);
				formData.append(file.name, blob, 'image.png');
				
				const xhr = new XMLHttpRequest();
				xhr.upload.addEventListener('progress', this.uploadProgress, false);
				xhr.open('POST', this.src, true);
				this.uploading = true;
				xhr.send(formData);
				let status = [200, 304];
				xhr.onload = () => {
					this.uploading = false;
					if (status.indexOf(xhr.status) !== -1) {
						let imgObj = {};
						let key = (new Date()).getTime() + index;
						imgobj[key] = JSON.parse(xhr.response).Data;
						file.name = key;
						this.imgData = Object.assign(this.imgData, imgObj);
						this.$emit('uploadImg', this.imgData);
						console.log('图片上传成功！');
					} else {
						console.log(`error: error code ${xhr.status}`);
					}
				}
			},
			// 移除图片
			remove (list, index) {
				this.files.splice(index, 1);
				delete this.imgData[list.name];
				this.$emit('uploadImg', this.imgData);
				if (document.getElementsByClassName('v-modal').length) {
					document.getElementsByClassName('v-modal')[0].style.display = 'none'
				}
			},
			/*
			* change触发图片上传函数
			* 上传之前先判断图片大小是否符合最大尺寸
			* 如果大于最大尺寸则裁剪图片
			* 每次选中一张图片都会上传一次
			*/
		    async fileChanged () {
			    let list = this.$refs.file.files;
			    if (this.files.length + list.length < 7) {
				    for (let i = 0, listLen = list.length; i < listLen; i++) {
					    const item = {
						    name: list[i].name,
						    size: list[i].size,
						    file: list[i]
					    };
					    console.log('压缩前大小》》》', list[i].size);
					    await this.compress(list[i], item, i);
					    this.files.push(item);
				    }
			    } else {
				    console.log('最多选择6张图片');
			    }
			    this.$refs.file.value = '';
		    },
		   
		    // 进度条
		    uploadProgress (evt) {
			    const that = this;
			    if (evt.lengthComputable) {
				    const percentComplete = Math.round((evt.loaded * 100) / evt.total);
				    console.log('percentComplete>>>', percentComplete);
				    that.percent = percentComplete / 100;
			    } else {
				    console.warn('upload progress unable to compute');
			    }
		    },
		   
		    // 压缩图片
		    // filereader 对象允许web应用程序异步读取存储再用户计算机上的文件
		    // Image() 函数将会创建一个新的HTMLImageElement实例。 它的功能等价于 document.createElement('img')
		    // new Image 用于获取上传图片 （绘制canvas时会用到），并获取其大小用于设置最大尺寸（压缩）
		    // 注意：需要设置src之后才能触发onload中的函数
		    compress (file, item, i) {
			    const that = this;
			    var reader = new FileReader();
			    reader.onload = function (e) {
				    var image = new Image();
				    image.src = e.target.result;
				    image.onload = function () {
					    // 图片原始尺寸
					    var originWidth = this.naturalWidth;
					    var originHeight = this.naturalHeight;
					    // 最大尺寸限制， 可通过设置宽高来实现图片压缩程度
					    var maxWidth = 300;
					    var maxHeight = 300;
					    // 目标尺寸
					    var targetWidth = originWidth;
					    var targetHeight = originHeight;
					    // 图片尺寸超过300 * 300 的限制
					    if (originWidth > maxWidth || originHeight > maxHeight) {
						    if (originWidth / originHeight > maxWidth / maxHeight) {
							 	// 原始图片比限制图片尺寸更宽，按照最大宽度限定尺寸
								targetWidth = maxWidth;
								targetHeight = Math.round(maxWidth * (originHeight / originWidth));
							} else {
								targetHeight = maxHeight;
								targetWidth = Math.round(maxHeight * (originWidth / originHeight));
							}
					    }
					    // 缩放图片需要的canvas
					    var canvas = document.createElement('canvas');
					    var context = canvas.getContext('2d');
					   
					    // canvas对图片进行缩放
					    canvas.width = targetWidth;
					    canvas.height = targetHeight;
					   
					    // 清除画布
					    context.clearRect(0, 0, targetWidth, targetHeight);
					   
					    // 获取图片的拍摄方向（通过Exif.js插件）
					    let orient;
					    that.EXIF.getData(image, () => {
						    orient = that.EXIF.getTag(this, 'Orientation');
					    })
					   
					    // 因为ios手机拍摄上传的图片会出现旋转的hack， 这里需要特殊处理
					    // 如果图片顺时针旋转了90度则调整下
					    if (orient === 6) {
						    context.save();
						    context.translate(targetWidth / 2, targetHeight /2);
						    context.rotate(90 * Math.PI / 180);
						    // 图片压缩
						    context.drawImage(this, 0 - targetHeight / 2, 0 - targetWidth / 2, targetHeight, targetWidth);
						    context.restore();
					    } else {
						    // 图片压缩
						    context.drawImage(this, 0, 0, targetWidth, targetHeight);
					    }
					   
					    // 压缩后的图片base64 url
					    that.newUrl = canvas.toDataURL('image/jpeg');
					    that.$set(item, 'src', that.newUrl); // 生成预览地址
					    that.submit(item, i);
				    };
			    };
			    reader.readAsDataURL(file);
		    },
		   
		    // dataUrl 转为blob对象， 用于formdata数据提交
		    dataURItoBlob (dataurl) {
			    var arr = dataurl.split(',');
			    var mime = arr[0].match(/:(.*?);/)[1];
			    var bstr = atob(arr[1]); // base-64编码过的字符串进行解码
			    var len = bstr.length;
			    var u8arr = new Uint8Array(len); // 8位无符号整数值的类型化数组
			   
			    while (len--) {
				    u8arr[len] = bstr.charCodeAt(len);
			    }
				
				return new Blob([u8arr], {type: mime});
				}
		},
		watch: {
			change () {
				if (!this.isFirstLoad) {
					for (let i = 0; i < this.files.length; i++) {
						if (this.files[i].name === 'selectImg') {
							this.files.splice(i, 1);
							break;
						}
					}
					this.clearFiles();
					this.initFiles();
				}
			}
		}
	}
</script>
<style>
	/* 图片预览 */
	.vue-uploader .file-list {
		overflow: hidden;
	}

	.vue-uploader .file-list .file-item {
		position: relative;
		float: left;
		width: 150px;
		height: 150px;
		margin: 20px 20px 20px 0;
		text-align: center;
	}

	.vue-uploader .file-list .file-item img {
		width: 100%;
		height: 100%;
		border: 1px solid #ececec;
	}

	.vue-uploader .file-list .file-item .file-remove {
		font-size: 20px;
		font-weight: bold;
		line-height: 20px;
		position: absolute;
		top: -10px;
		right: -10px;
		width: 20px;
		height: 20px;
		transform: rotate(45deg);
		text-align: center;
		color: #f00;
		border: 1px solid #f00;
		border-radius: 50%;
		background: transparent;
	}

	/* add */
	.vue-uploader .add {
		font-size: 100px;
		line-height: 150px;
		float: left;
		width: 150px;
		height: 150px;
		cursor: pointer;
		text-align: center;
		color: #a9a9a9;
		border: 1px dashed #a9a9a9;
	}

	/* file */
	.vue-uploader>input[type='file'] {
		display: none;
	}

	/* progre */
	.vue-uploader .imgProgress-bar {
		flex-grow: 1;
	}

	.vue-uploader .imgProgress-bar section {
		font-size: 12px;
		margin-top: 5px;
		transition: all .5s ease;
		text-align: center;
		color: #fff;
		border-radius: 3px;
		background: #00b4aa;
	}
</style>
