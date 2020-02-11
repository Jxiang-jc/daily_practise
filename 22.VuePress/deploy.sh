#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
 

# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/Jxiang-jc/daily_practise.git master:gh-pages

cd ../

# git remote add origin https://github.com/Jxiang-jc/daily_practise.git

git pull --rebase origin master

git push https://github.com/Jxiang-jc/daily_practise

cd -