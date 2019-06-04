const {
    basePath, // 定位到根目录(示例 basePath('abc') => '项目名/abc' )
    getCurrentCubeInfo, // 获取当前cubeinfo内容（传入特定格式的cubemodule.json）
    compress, // 压缩目录到指定的zip
    updateCubeModule, // 更新版本号
    transferCubeModule, // 文件复制
    getCurrentCubemodulePath // 获取当前project-version
    // copyFile
  } = require('./until.js')
  
  const cubeModulePath = getCurrentCubemodulePath()
  const buildPath = basePath('release/dist')
  
  class MxBuildPlugin {
    apply(compiler) {
      // 配置之前进行环境版本更新
      compiler.hooks.beforeRun.tap('CubeModule Update', compiler => {
        // console.log(compiler.options)
        if (process.env.NODE_ENV === 'production') {
          if (process.argv.slice(2).includes('--cur')) {
            console.log('当前build不更新版本')
          } else {
            console.log('版本号更新')
            updateCubeModule(cubeModulePath)
          }
        }
      })
  
      // 生成资源之后生成cubeModule文件
      compiler.hooks.afterEmit.tap('CubeModule Move', compilation => {
        if (process.env.NODE_ENV === 'production') {
          console.log('生成cubeModule.json')
          transferCubeModule(cubeModulePath, buildPath + '/CubeModule.json')
        }
      })
  
      // 完成编译后打包项目
      compiler.hooks.done.tap('Compress Project', stats => {
        if (process.env.NODE_ENV === 'production') {
          console.log('项目压缩Zip')
          let cube = getCurrentCubeInfo(cubeModulePath)
          let zipName = `${cube.name}.${cube.version}.${cube.environment}.zip`
          compress(buildPath, basePath(`release/${zipName}`))
        }
      })
  
      // 下面是测试是事件-------------------------------------------------
      // compiler.hooks.entryOption.tap('entryOption', () => {
      //   console.log('entryOption')
      // })
      // compiler.hooks.afterPlugins.tap('afterPlugins', compiler => {
      //   console.log('afterPlugins')
      // })
      // compiler.hooks.afterResolvers.tap('afterResolvers', compiler => {
      //   console.log('afterResolvers')
      // })
      // compiler.hooks.environment.tap('environment', () => {
      //   console.log('environment')
      // })
      // compiler.hooks.afterEnvironment.tap('afterEnvironment', () => {
      //   console.log('afterEnvironment')
      // })
      // compiler.hooks.beforeRun.tap('beforeRun', compiler => {
      //   console.log('beforeRun')
      // })
      // compiler.hooks.run.tap('run', compiler => {
      //   console.log('run')
      // })
      // compiler.hooks.watchRun.tap('watchRun', compiler => {
      //   console.log('watchRun')
      // })
      // compiler.hooks.normalModuleFactory.tap(
      //   'normalModuleFactory',
      //   normalModuleFactory => {
      //     console.log('normalModuleFactory')
      //   }
      // )
      // compiler.hooks.contextModuleFactory.tap(
      //   'contextModuleFactory',
      //   contextModuleFactory => {
      //     console.log('contextModuleFactory')
      //   }
      // )
      // compiler.hooks.beforeCompile.tap('beforeCompile', compilationParams => {
      //   console.log('beforeCompile')
      // })
      // compiler.hooks.compile.tap('compile', compilationParams => {
      //   console.log('compile')
      // })
      // compiler.hooks.thisCompilation.tap('thisCompilation', compilation => {
      //   console.log('thisCompilation')
      // })
      // compiler.hooks.compilation.tap('compilation', compilation => {
      //   console.log('compilation')
      // })
      // compiler.hooks.make.tap('make', compilation => {
      //   console.log('make')
      // })
      // compiler.hooks.afterCompile.tap('afterCompile', compilation => {
      //   console.log('afterCompile')
      // })
      // compiler.hooks.shouldEmit.tap('shouldEmit', compilation => {
      //   console.log('shouldEmit')
      // })
      // // compiler.hooks.needAdditionalPass.tap('needAdditionalPass', () => {
      // // 此钩子报错
      // //   console.log('needAdditionalPass')
      // // })
      // compiler.hooks.emit.tap('emit', compilation => {
      //   console.log('emit')
      // })
      // compiler.hooks.afterEmit.tap('afterEmit', compilation => {
      //   console.log('afterEmit')
      // })
      // compiler.hooks.done.tap('done', stats => {
      //   console.log('done')
      // })
      // compiler.hooks.failed.tap('failed', error => {
      //   console.log('failed')
      // })
      // compiler.hooks.invalid.tap('invalid', (fileName, changeTime) => {
      //   console.log('invalid')
      // })
      // compiler.hooks.watchClose.tap('watchClose', () => {
      //   console.log('watchClose')
      // })
    }
  }
  
  module.exports = MxBuildPlugin
  