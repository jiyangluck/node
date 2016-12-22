# 《从零开始》系列教程之《从零开始学node》

#### 课程目录
* 安装node
* 安装cnpm
``` bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

#### package.json文件属性说明
* name - 包名。
* version - 包的版本号。
* description - 包的描述。
* homepage - 包的官网 url 。
* author - 包的作者姓名。
* contributors - 包的其他贡献者姓名。
* dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module目录下。
* devDependencies -开发环境依赖的包列表。
* repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
* main - main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说， 如果你包的名字叫 * express，然后用户安装它，然后require("express")。
* keywords - 关键字

#### 案例内容
1. http协议：抓包工具，上传文件
2. 网络爬虫
3. 控制并发
4. fs模块
5. 爬虫内容写入本地文件
6. 上传文件
7. websocket
8. 在线聊天
6. jade模板
7. jade模板显示本地文件内容
8. 设置路由
9. 多页面显示本地文件数据
10. 数据库 mongodb
11. node操作数据库mongoose
12. jade模板显示数据库中的数据
13. 登录功能：session cookie
14. html5本地存储
15. 页面传值
15. 使用node制作一个简单的博客网站：后台管理，前台显示
16. gulp
17. sass
18. es6
19. webpack
20. vue基础
21. vue实现图书管理系统
22. vue实现移动电商
23. cms
24. angular "hello world"
25. react "hello world"
26. 收尾：easyUI,swiper,flex，echarts
