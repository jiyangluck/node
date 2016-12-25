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
1. 数据的增删改查
2. 登录功能：session cookie
3. html5本地存储
4. 页面传值
5. fs模块
6. 上传文件
7. http协议
8. 网络爬虫
9. 爬虫内容写入数据库
10. 控制并发async
11. websocket
12. 在线聊天
13. 跨域请求：jsonp
14. webpack
15. es6
16. gulp
17. sass
18. vue基础
19. 收尾：easyUI,swiper,flex，echarts


#### 内容管理系统cms需求
1. 后台发布文章，前台显示
2. 文章可以修改和删除
3. 后台图片上传，前台显示
4. 登录模块:session,cookie
5. 在线聊天功能websocket
6. 用户信息管理功能
7. 文章点赞功能
8. 文章评论功能
9. 积分购买文章（部分文章购买后才可以完整阅读）
10. 使用vue重写该项目后台
11. 服务器渲染
12. 前端自动化
13. 数据可视化：报表分析