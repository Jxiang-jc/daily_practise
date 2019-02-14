// 创建一个音乐播放器的类 单例模式
class Player {
    // 类的构造函数
    constructor () {
        // 如果类已经有实例了, 就返回这个实例
        if (Player.instance) return Player.instance

        // 如果没有实例化的话, 就去构建一个实例
        return this.getInstance(...arguments)
    }

    // // // 构建实例
    // getInstance () {
    //     // 创建一个实例
    //     let instance = {

    //     }
    //     // 让实例可以使用到Player的原型上的属性方法
    //     instance.__proto__ = Player.prototype;
    //     instance.constructor = Player;
    //     // 把构建好的实例挂在Player类上
    //     Player.instance = instance;
    //     return instance;
    // }

    // 构建实例
    getInstance () {
        // 创建一个实例
        let instance = new PlayerCreator(...arguments)

        // 把构建好的实例挂载在Player类上
        Player.instance = instance
        return instance
    }
}

// 真正构建播放器的类
class PlayerCreator {
    constructor () {
        // Audio dom元素，因为很多api都是需要原生audio调用, 所以不用jq获取
        this.audio = document.querySelector('.music-player__audio')

        // this.audio.muted =true // 控制静音

        // 音量
        this.audio.volume = 0.8

        // 实例化工具
        this.util = new Util()

        // 歌曲信息
        this.musics = new Musics()

        // 当前播放的歌曲的索引
        this.song_index = 0

        // 控制循环模式 0 随机 1 单曲循环 2
        this.loop_mode = 0

        // 下方歌曲列表容器(ul)
        this.song_list = $('.music__list_content')

        // 切换歌曲的时候需要渲染的dom组
        this.render_doms = {
            title: $('.music__info--title'),
            singer: $('.music__info--singer'),
            image: $('.music-player__image img'),
            blur:  $('.music-player__blur')
        }

        // 时间显示容器
        this.render_time = {
            current: $('.song__time--current'), // 当前时间
            duration: $('.song__time--duration') // 歌曲总时间
        }

        // 唱片
        this.disc = {
            image: $('.music-player__image'),
            pointer: $('.music-player__pointer')
        }

        // 播放器初始化
        this.init()
        
    }
    
    // 初始化执行函数
    init () {
        this.renderSongList()
        this.renderSongStyle()
        this.bindEventListener()
    }

    // 渲染歌曲列表
    renderSongList () {
        let _str = ''
        this.musics.songs.forEach( (song, i) => {
            _str += `<li class="music__list__item">${song.title}</li>`
        } )

        this.song_list.html(_str)
    }

    // 根据当前歌曲渲染视图, 每次切换歌曲都需要执行
    renderSongStyle () {
        // 当前播放的歌曲信息
        let { title, singer, songUrl, imageUrl } = this.musics.getSongByNum(this.song_index)

        this.audio.src = songUrl

        this.render_doms.title.html(title)
        this.render_doms.singer.html(singer)
        this.render_doms.image.prop('src', imageUrl)
        this.render_doms.blur.css('background-image', 'url("'+ imageUrl +'")')

        // 切换列表中的item的类名(添加高亮) play
        this.song_list.find('.music__list__item').eq(this.song_index).addClass('play').siblings().removeClass('play')
    }

    // 绑定各种事件
    bindEventListener () {
        // 播放按钮
        this.$play = new Btns('.player-control__btn--play', { click: this.handlePlayAndPause.bind(this)} )

        // 上一首
        this.$prev = new Btns('.player-control__btn--prev', { click: this.changeSong.bind(this, 'prev')} )

        // 下一首
        this.$next = new Btns('.player-control__btn--next', { click: this.changeSong.bind(this, 'next')} )

        // 循环模式
        this.$mode = new Btns('.player-control__btn--mode', { click: this.changePlayMode.bind(this)})

        // 列表点击
        this.song_list.on('click', 'li', (e) => {
            let index = $(e.target).index()
            this.changeSong(index)
        })

        // 音量控制 audio标签音量 volume 属性控制 0 - 1

        new Progress('.control__volume--progress', {min: 0, max: 1, value: this.audio.volume, handler: (value) => { // 当拖动/更改进度的时候会执行
            this.audio.volume = value
        }})

        // 歌曲进度 this.audio.duration
        // 可以播放的时候触发 (歌曲的基本信息都已经获取到了)
        this.audio.oncanplay = () => {
            // 避免重复实例化
            if (this.progress) {
                this.progress.max = this.audio.duration // 切换歌曲后更新时长
                this.render_time.duration.html(this.util.formatTime(this.audio.duration))
                return false
            }

            this.progress = new Progress('.player__song--progress', { min: 0, max: this.audio.duration, value: 0, handler: (value) => { // 当拖动/更改进度的时候会执行
                this.audio.currentTime = value
            }})

            // 调整总时长
            this.render_time.duration.html(this.util.formatTime(this.audio.duration))
        }
        
        // 会在播放的时候持续触发
        this.audio.ontimeupdate = () => {
            this.progress.setValue(this.audio.currentTime)

            // 调整当前时长
            this.render_time.current.html(this.util.formatTime(this.audio.currentTime))
        }

        // 当歌曲播放完成的时候
        this.audio.onended = () => {
            this.changeSong('next')

            //  播放完, 切歌后, 重新播放
            this.audio.play()
        }
    }

    // 播放暂停控制
    handlePlayAndPause () {
        let _o_i = this.$play.$el.find('i')

        // this.audio.paused 值为true说明目前是不播放
        if (this.audio.paused) { // 现在是暂停, 要播放
            this.audio.play()

            _o_i.removeClass('icon-play').addClass('icon-pause')
            this.disc.image.addClass('play')
            this.disc.pointer.addClass('play')
        } else {
            this.audio.pause()
            _o_i.removeClass('icon-pause').addClass('icon-play')
            this.disc.image.removeClass('play')
            this.disc.pointer.removeClass('play')
        }
    }

    // 切歌
    changeSong (type) {
        // 更改索引
        this.changeSongIndex(type)

        // 记录切歌前的状态
        let _is_pause = this.audio.paused

        // 切歌之后更改视图上显示
        this.renderSongStyle()
        console.log(_is_pause)
        // 如果切歌前是在播放, 就继续播放
        if (!_is_pause) this.audio.play()
    }

    // 更改歌曲索引
    changeSongIndex (type) { // 'next' 'prev' 'number'
        
        // 通过歌曲列表点击切歌
        if (typeof type === 'number') {
           return this.song_index = type
        } else {
            // 列表循环模式
            if (this.loop_mode === 0) {
                this.song_index += type === 'next' ? 1 : -1
                
                if ( this.song_index > this.musics.songs.length -1 )
                    this.song_index = 0
                if ( this.song_index < 0)
                    this.song_index = this.musics.songs.length -1
            } else if (this.loop_mode === 1) {
                let _length = this.musics.songs.length

                let _remdom = Math.floor(Math.random() * _length)

                this.song_index = _remdom
            }
        }
    }

    // 更换循环模式
    changePlayMode () {
        this.loop_mode++
        if (this.loop_mode > 2) this.loop_mode = 0
        this.renderPlayMode()
    }

    // 更改按钮样式
    renderPlayMode () {
        let _classes = ['loop', 'random', 'single']
        let _o_i = this.$mode.$el.find('i')

        // prop 改一些标签的自有属性 attr改一些标签的自定义属性
        _o_i.prop('class', 'iconfont icon-' + _classes[this.loop_mode])
    }
}

class Musics {
    // 歌曲
    constructor () {
        this.songs = [{
                id: 1,
                title: '丑八怪',
                singer: '薛之谦',
                songUrl: './songs/丑八怪 - 薛之谦.ogg',
                imageUrl: './images/songs/choubaguai.jpg'
            },
            {
                id: 2,
                title: '绅士',
                singer: '薛之谦',
                songUrl: './songs/绅士 - 薛之谦.ogg',
                imageUrl: './images/songs/shenshi.jpg'
            },
            {
                id: 3,
                title: '认真的雪',
                singer: '薛之谦',
                songUrl: './songs/认真的雪 - 薛之谦.ogg',
                imageUrl: './images/songs/renzhendexue.jpg'
            },
            {
                id: 4,
                title: '演员',
                singer: '薛之谦',
                songUrl: './songs/演员 - 薛之谦.ogg',
                imageUrl: './images/songs/yanyuan.jpg'
            }
        ]
    }

    // 根据索引获取歌曲的方法
    getSongByNum (index) {
        return this.songs[index]
    }
}

class Btns {
    constructor (selector, handlers) {
        this.$el = $(selector) // 元素
        this.bindEvents(handlers)
    }

    // 绑定事件
    bindEvents (handlers) {
        for (const event in handlers) {
            // 使用值的时候, 保证键值对在对象中是存在的
            if (handlers.hasOwnProperty(event)) {
                this.$el.on(event, handlers[event])
            }
        }
    }
}

class Progress {
    constructor (selector, options) {
        // Object.assign(this, options)
        $.extend(this, options) // 给this挂载传入的参数

        this.$el = $(selector)
        this.width = this.$el.width()
        this.init()
    }

    init () {
        this.renderBackAndPointer()
        this.bindEvents()

        this.value
        this.changeDOMStyle(this.width * this.value)
    }

    // 为进度条容器渲染back 和 pointer
    renderBackAndPointer () {
        this.$back = $('<div class="back">') // 蓝色进度条
        this.$pointer = $('<div class="pointer">') // 白色小点

        this.$el.append(this.$back)
        this.$el.append(this.$pointer)
    }

    // 绑定事件
    bindEvents () {
        this.$el.click( (e) => {
            let _x = e.offsetX // 鼠标距离元素左边的距离
            let _ratio = _x / this.width // 比例
            let _value = _ratio * (this.max - this.min) // 当前的音量值
            this.changeDOMStyle(_x)
            this.handler(_value) // 更改进度之后, 执行回调
        })
    }

    changeDOMStyle (distance) {
        this.$back.width(distance)
        this.$pointer.css('left', (distance - 3) + 'px')
    }

    // 主动调用, 传入value值, 设置进度条样式
    setValue(value) {
        let _distance = this.width * value / (this.max - this.min)
        this.changeDOMStyle(_distance)
    }
}

new Player()

// audio的事件在某些浏览器会失效，this.audio.ontimeupdate ->  this.audio.addEventListener('timeupdate')

// 音视频文件从服务端获取的时候，需要将状态码设置成206