let arr = [1, 3, 1, 4, 1, 5, 6, 3, 1, 2, 10]

// ES6 set
function unique(array) {
    return Array.from(new Set(array))

    // return [...new Set(arr)] 更加简洁
}

console.log('unique: ', unique(arr))

// 哈希法: 空间换时间
const quiqueArrayHash = (array) => {
    
    let map = {},
        result = [],
        i,
        len = array.length

    for (i = 0; i < len; i++) {
        if (!map[array[i]]) {
            map[array[i]] = true
            result.push(array[i])
        }
    }
    return result
}
console.log('quiqueArrayHash: ', quiqueArrayHash(arr));

// indexOf()
// indexOf 会遍历数组, 如果存在, 返回第一次出现的索引值, 并且从0开始, 如果不存在返回 -1
const uniqueArrayIndexOf = (array) => {
    
    let i,
        result = [],
        len = array.length
    for (i = 0; i < len; i++) {
        if (result.indexOf(array[i]) < 0) {
            result.push(array[i])
        }
    }
    return result
}
console.log('uniqueArrayIndexOf: ', uniqueArrayIndexOf(arr));

// filter() + indexOf
const uniqueArrayFilterIndexof  = (array) => {
    return array.filter( (value, index) => {
        return arr.indexOf(value) === index
    })
}

console.log('uniqueArrayFilterIndexof: ', uniqueArrayFilterIndexof(arr))
