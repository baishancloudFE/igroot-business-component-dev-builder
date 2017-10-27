# igroot-business-component-dev-builder
> iGroot 业务组件开发构建器
### 安装
首先确保你已经安装了 [Node.js](http://nodejs.org/) ，然后，请执行以下命令：
``` bash
npm install -g igroot-business-component-dev-builder
```
### 使用说明
#### 代码调用
``` javascript
const builder = require('igroot-business-component-dev-builder')

// 启动开发环境
builder.run()
```
#### 命令调用(开发调试用)
命令的执行依赖于当前路径，因此，请在项目根目录中使用
``` bash
# 启动应用
igroot-bcd-builder run
```