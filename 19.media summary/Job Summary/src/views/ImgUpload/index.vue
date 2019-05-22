<template>
	<div class="hello">
		<h1> This is an image upload demo</h1>
		<h3> --By &nbsp; wrx </h3>
		<!-- 
		* class: 组件样式
		* canedit: 图片是否可编辑
		* imgData: 图片初始化数据(obj)，数据格式：{key: src, key2: src2}
		* uploadimg: 图片上传后的回调
		* src: 图片上传地址
		* multiple: 是否可以上传多张
		* maxlength: 最多可以上传多少张
		* clear: 清楚所有图片（用于初始化清空图片）
		* change： 触发组件的watch （用于初始化数据）
		*  
		-->
		
		<img-upload class="you_box_css"
			:canEdit="canEdit"
			:imgData="imgData"
			@uploadImg="uploadImg"
			:src="imgSrc"
			:multiple="multiple"
			:maxlength="imgMax"
			:clear='clearImgData'
			:change="upDateImg"></img-upload>
	</div>
</template>

<script>
	import imgUpload from '_c/imgUpload';
	
	export default {
		name: 'pageImgUpload',
		components: {
			imgUpload
		},
		data () {
			return {
				canEdit: true,
				multiple: true,
				imgSrc: '@/components/imgBox',
				imgMax: 6,
				clearImgData: true,
				imgData: {},
				upDateImg: false
			}
		},
		methods: {
			uploadImg () {
				// 上传图片触发此函数
			},
		}
	}
</script>
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	.yourBoxCss {
		display: inline-block;
		width: auto;
		min-width: 80%;
		height: auto;
		padding: 10px;
		border: 1px solid #f2f2f2;
	}
</style>
