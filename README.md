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
