# react 集成开发框架

>  * 使用知识点：
>  * react            
>  * webpack             前端自动话打包工具
>  * react-router-dom       
>  * react-redux       
>  * redux            
>  * babel            

## 项目步骤

1.安装node.js

2.安装项目依赖包

```
npm install
```

3.运行开发环境

```
npm run dev 

```

4.打包生产文件

```
npm run build:dll   //此命令一般只运行一次 请参考上面weboack构建优化文章说明

npm run build

``` 


### 增加flow 
- 参考链接： flow使用请参考官网：https://flow.org/


```
使用flow检查的文件在顶部增加  
// @flow   或者  /* @flow */  标识

检查全部文件
npm run flow

```

### 如果Sublime要开启eslint的flow检测 需要做如下另个步骤  

- 1.安装 npm install babel-preset-flow --save-dev    npm install flow-bin --save-dev
- 2.sublime text安装 flow  SublimeLinter-flow两个插件
- 参考链接：https://flow.org/en/docs/editors/sublime-text/


### 新增eslint代码检查 
- sublime text 安装插件：SublimeLinter,SublimeLinter-contrib-eslint 插件
 参考链接： 
- https://eslint.org/docs/user-guide/integrations
- http://www.jianshu.com/p/e826e13c67ec
- 提醒：提交代码之前会进行 eslint 检测，若检测不通过提交不了代码。


>  特色：
> 
> * webpack 
>     * 引入happypack 多线程操作
>     * 添加dll概念，创建类库，避免构建过慢以及生产文件过大
> * react
>     * 响应式布局
