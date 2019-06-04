<template>
	<div v-cloak class="time_com">
		<div v-time="timeNow"></div>
		<div v-time="timeBefore"></div>
		<div v-birthday="birthday"></div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				timeNow: (new Date()).getTime(),
				timeBefore: 1488930696722,
				birthday: (new Date('1996-8-2')).getTime()
			}
		}
	}
</script>

<style scoped>

.time_com {
	font-size: 20px;
	color: #4d63bc;
}
</style>
