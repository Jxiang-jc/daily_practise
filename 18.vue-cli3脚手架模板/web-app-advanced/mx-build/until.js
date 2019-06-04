'use strict'

const path = require('path')
const fs = require('fs')
const archiver = require('archiver')
// const inquirer = require('inquirer')

/**
 * 定位到根目录(示例 basePath('abc') => '项目名/abc' )
 * @param {*} dir
 */
const basePath = _path => {
  return path.join(__dirname, `../${_path}`)
}

/**
 * 定位到根目录(示例 basePath('abc') => '项目名/abc' )
 * @param {*} dir
 */
exports.basePath = basePath

/**
 * 获取当前cubeinfo内容（传入特定格式的cubemodule.json）
 */
exports.getCurrentCubeInfo = function(_path) {
  let info = require(_path)
  let VUE_APP_MX_ENV = process.env.VUE_APP_MX_ENV
  info.environment = VUE_APP_MX_ENV
  info.version = info[`version`]
  return info
}

/**
 * 获取当前project-version
 */
exports.getCurrentCubemodulePath = function() {
  let VUE_APP_MX_ENV = process.env.VUE_APP_MX_ENV
  return basePath(`src/project-version/${VUE_APP_MX_ENV}.json`)
}

/**
 * 压缩目录到指定的zip
 */
exports.compress = function(inputPath, outPutPath) {
  let output = fs.createWriteStream(outPutPath)

  let archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  })

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', () => {
    console.log('compress done!\n')
    console.log(outPutPath, (archive.pointer() / 1024 / 1024).toFixed(2) + 'Mb')
  })

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', () => {
    console.log('Data has been drained')
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', err => {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', err => {
    throw err
  })

  // pipe archive data to the file
  archive.pipe(output)

  // append files from a sub-directory and naming it `new-subdir` within the archive
  archive.directory(inputPath, '')

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize()
}

/**
 * 读取cube文件
 * @param {*} filePath
 */
function readCubeModule(filePath) {
  if (fs.existsSync(filePath)) {
    let fileContent = JSON.parse(fs.readFileSync(filePath))
    return fileContent
  } else {
    throw new Error('项目中不存在 ' + filePath)
  }
}

/**
 * 版本号更新
 * @param {*} version
 */
function increaseVerision(version) {
  // let arr = version.split('.')
  // // 转换为数字
  // let last = +arr[arr.length - 1]
  // // 覆盖源数据
  // arr[arr.length - 1] = ++last
  // return arr.join('.')
  version = version.split('.')
  let newVersion = [1, 0, 0]
  if (parseInt(version[2]) >= 9) {
    if (parseInt(version[1]) >= 9) {
      newVersion[0] = parseInt(version[0]) + 1
      newVersion[1] = 0
      newVersion[2] = 0
    } else {
      newVersion[0] = parseInt(version[0])
      newVersion[1] = parseInt(version[1]) + 1
      newVersion[2] = 0
    }
  } else {
    newVersion[0] = parseInt(version[0])
    newVersion[1] = parseInt(version[1])
    newVersion[2] = parseInt(version[2]) + 1
  }
  version = newVersion
  return version
}

/**
 * 更新版本号
 */
exports.updateCubeModule = function(_path) {
  let fileContent = null

  // 读取 CubeModule
  fileContent = readCubeModule(_path)

  let env = process.env.VUE_APP_MX_ENV
  let curVersion = `version`
  let oldVersion = fileContent[curVersion]
  let newVersion = increaseVerision(oldVersion)
  fileContent[curVersion] = newVersion.join('.')
  fileContent.build = parseInt('' + newVersion[0] + newVersion[1] + newVersion[2]) * 100
  console.info(`${env}版本更新信息： ${oldVersion} -> ${fileContent[curVersion]}`)

  fs.writeFileSync(_path, JSON.stringify(fileContent, null, 2))
}

/**
 * 文件复制
 */
exports.transferCubeModule = function(sourceFile, destPath) {
  let cube = readCubeModule(sourceFile)
  // let newCubeModule = {
  //   autoDownload: cube.autoDownload,
  //   identifier: cube.identifier,
  //   name: cube.name,
  //   hidden: false,
  //   build: cube.build,
  //   version: cube[process.env.VUE_APP_MX_ENV + 'Version'],
  //   releaseNote: ''
  // }
  fs.writeFileSync(destPath, JSON.stringify(cube, null, 2))
}

/**
 * 添加开发环境
 */
exports.newEnv = function(env) {
  env = env.trim()
  if (env === '') {
    console.log('环境名称不能为空')
    return false
  }
  let cubeFile = basePath('src/CubeModule.json')
  let cubeInfo = require(cubeFile)
  let envVersionName = `${env}Version`
  if (cubeInfo[envVersionName]) {
    console.log('已存在此环境')
    return false
  }

  // CubeModule.json 添加环境版本号
  cubeInfo[envVersionName] = '1.0.0'
  fs.writeFileSync(cubeFile, JSON.stringify(cubeInfo, null, 2))

  // 添加.env文件 flag: 'a' - 打开文件用于追加。如果文件不存在，则创建该文件。
  fs.writeFileSync(basePath(`.env.${env}`), `NODE_ENV = 'production'\nVUE_APP_MX_ENV = '${env}'\n`, { flag: 'a' })

  // 添加环境配置环境
  fs.writeFileSync(
    basePath(`src/project-config/${env}.js`),
    `'use strict'

window.PROJECT_CONFIG = {
  host: '',
  appKey: '',
  widgetKey: ''
}
`,
    { flag: 'a' }
  )

  // package.json scripts 打包命令
  let packageFile = basePath('package.json')
  let packInfo = require(packageFile)
  packInfo.scripts[`${env}`] = `vue-cli-service build --mode ${env}`
  fs.writeFileSync(packageFile, JSON.stringify(packInfo, null, 2))

  console.log(`1、基于vue-cli3的环境文件已生成: .env.${env} `)
  console.log(`2、./src/CubeModule.json模板已添加 ${env}环境 的版本控制`)
  console.log(`3、package.json已添加 ${env}环境 的打包命令`)
  console.log(`4、已添加项目环境配置 ./src/project-config/${env}.js ,请重点关注`)
  console.log(`${env}环境 已配置完成`)
}

/**
 * 文件复制
 */
exports.copyFile = function(srcFile, destPath) {
  // 默认情况下将创建或覆盖目标文件。
  fs.copyFileSync(srcFile, destPath, err => {
    if (err) throw err
    console.log('源文件已拷贝到目标文件')
  })
}

/**
 * 生成配置文件-在Html-webpack-plugin生成模板的時候在public資源文件夾生成配置文件
 */
exports.buildProjectConfig = function() {
  let srcFile = basePath(`src/project-config/${process.env.VUE_APP_MX_ENV}.js`)
  let destPath = basePath(`public/config.js`)
  // 默认情况下将创建或覆盖目标文件。
  fs.copyFileSync(srcFile, destPath, err => {
    if (err) throw err
    console.log('源文件已拷贝到目标文件')
  })

  return './config.js'
}

/**
 * 判断是否生成sourceMap
 */
exports.buildSourceMap = function() {
  if (process.env.NODE_ENV !== 'production') {
    return true
  }
  if (process.argv.slice(2).includes('--map')) {
    return true
  }
  return false
}

/**
 * 判断是否输出vconsole
 */
exports.buildVConsole = function() {
  if (process.argv.slice(2).includes('--map') || process.env.VUE_APP_MX_ENV === 'test') {
    return true
  }
  return false
}
