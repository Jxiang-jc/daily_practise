// 闰年
let days = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
]

var Birthday = {
	// 已经出生多少天
	getDays (timestamp) {
		var date = new Date() // Fri May 03 2019 16:50:16 GMT+0800 (中国标准时间)
		var timer = date.getTime() - timestamp
		var day = Math.floor(timer / (1000 * 60 * 60 * 24))
		return '你已经出生' + day + '天'
	},
	
	// xxx天转换具体年龄
	age (timestamp) {
		let date = new Date()
		let birthday = new Date(timestamp)
		// 当前年份 - 出生年份
		let year = date.getFullYear() - birthday.getFullYear()
		// 当前月份 - 出生月份
		let month = date.getMonth() - birthday.getMonth()
		// 当前日数 - 出生日数
		let day = date.getDate() - birthday.getDate()
		
		if (month < 0) {
			year -= 1
			month += 12
		}
		
		if (day < 0) {
			if (this.checkIfLeapYear(birthday.getFullYear())) {
				day += days[1][date.getMonth()]
			} else {
				day += days[0][date.getMonth()]
			}
		}
		return '年龄：' + year + '岁' + month + '个月' + day + '天'
	},
	
	// 检查是否闰年
	checkIfLeapYear (year) {
		if ((year % 4 === 0) && (year % 100 !== 0) || (year & 400 ===0)) {
			return true
		}
		return false
	}
}

export default {
	bind: function (el, binding) {
		console.log('el', el)
		el.innerHTML = Birthday.getDays(binding.value)
		el.innerHTML = el.innerHTML + '<br/>' + Birthday.age(binding.value)
	}
}
