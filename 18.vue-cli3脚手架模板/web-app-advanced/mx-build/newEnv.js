const { newEnv } = require('./until.js')
const inquirer = require('inquirer')

inquirer
    .prompt({
        type: 'input',
        name: 'newEnv',
        message: '请输入新的打包环境名称(如sit,uat,prod...)?'
    })
    .then(res => {
        newEnv(res.newEnv)
    })
