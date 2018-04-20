![](./eva.png) 
## Eva vizceral 绘图插件  

![](./eva.gif)

   1、基于开源绘图系统[vizceral](https://github.com/Netflix/vizceral "Heading link")
   
   2、修复vizceral若干bug，优化渲染
    
   3、增加js层面的api，提供实时渲染更新功能

## Using
	使用方法1,自编译

		1.  安装nodejs
		2.  git clone https://http://git.intra.weibo.com/im/eva-vizceral.git
		3.  cd eva-vizceral
		4.  do some thing change
		5.  npm run build
		6.  cd eva-vizceral/disk

	使用方法2
		1. git clone https://http://git.intra.weibo.com/im/eva-vizceral.git
		2. cd eva-vizceral/disk
		3. 浏览器引入 app.css 和 vizceral_eva.min.js

## Example
```html
   <html>
     <head>
       <script src="../dist/vizceral_eva.js"></script>
       <link rel="stylesheet" type="text/css" href="../dist/vizceral_eva.css" />
     <script>
     var region
     var dataNode1 = new Vizceral.EvaDataNode("dataNode1")   
     var dataNode2 = new Vizceral.EvaDataNode("dataNode2")   
     var dataNode3 = new Vizceral.EvaDataNode("dataNode3")
     dataNode1
       .connectAndGetConnetion(dataNode2)
       .setDetail("danger",10)
       .createNotices("i am notices",0,"http://www.baidu.com")
   
     dataNode2
     .connectAndGetConnetion(dataNode3,{"danger":100,"normal":10})
     .createNotices("I am notice",1)
    
     function run () {
       region = new Vizceral.EvaRegion(document.getElementById('viz'))
       region.setRootLevels(dataNode1).show()
     }     
   </script>
   </head>
     <body onload='run()'>
       <div id="viz"></div>
     </body>
   </html>
```

## 加载数据方式

		1、javascript Api 层加载数据 见:example/exampleDetail.html
 		2、json 数据加载 见:example/exampleJson.html

# 开发者
		zhipeng9@staff.weibo.com



## Table of Contents

-   [EvaConnection](#evaconnection)
    -   [createNotices](#createnotices)
    -   [clearNotics](#clearnotics)
-   [EvaRegion](#evaregion)
    -   [show](#show)
    -   [update](#update)
    -   [backToParentLevel](#backtoparentlevel)
    -   [setRootLevels](#setrootlevels)
    -   [getNodeByNodeId](#getnodebynodeid)
    -   [getNodeByNodeName](#getnodebynodename)
    -   [setHightLightNode](#sethightlightnode)
    -   [setNodeData](#setnodedata)
    -   [reload](#reload)
    -   [toData](#todata)
    -   [getConnection](#getconnection)
    -   [addColors](#addcolors)
-   [EvaDataNode](#evadatanode)
    -   [setHightLight](#sethightlight)
    -   [setClass](#setclass)
    -   [setNodeType](#setnodetype)
    -   [setMetadata](#setmetadata)
    -   [getMetadata](#getmetadata)
    -   [connect](#connect)
    -   [connectAndGetConnetion](#connectandgetconnetion)
    -   [getConnection](#getconnection-1)
    -   [getConnections](#getconnections)

## EvaConnection

**Extends EventEmitter**

EvaConnection

**Parameters**

-   `source` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 源节点name
-   `target` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 目的节点name
-   `metadata` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 私有数据

### createNotices

创建通知 可创建多个

**Parameters**

-   `title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 通知名称
-   `severity` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 通知级别 支持 0 1 2 3 >3则不显示图标
-   `link` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 通知是否可以链接

Returns **[EvaConnection](#evaconnection)** 

### clearNotics

清空全部通知

## EvaRegion

**Extends EventEmitter**

EvaRegion (rootElement)

const region = new Vizceral.EvaRegion(document.getElementById('viz'))

**Parameters**

-   `rootElement` **dom** 节点 需要在哪里绘制图形

### show

创建EvaRegion 用于update操作或者首次加载的绘图

### update

更新操作

**Parameters**

-   `resaon`  

Returns **[EvaRegion](#evaregion)** EvaRegion

### backToParentLevel

返回上层结构

Returns **[EvaRegion](#evaregion)** EvaRegion

### setRootLevels

设置跟路径

**Parameters**

-   `EvaDataNods` **EvaDataNods** 需要显示的根路径节点

Returns **[EvaRegion](#evaregion)** EvaRegion

### getNodeByNodeId

根据name 获取 EvaDataNode 对象

**Parameters**

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** EvaDataNode name

Returns **[EvaDataNode](#evadatanode)** EvaDataNode

### getNodeByNodeName

根据name 获取 EvaDataNode 对象

**Parameters**

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** EvaDataNode 根据name

Returns **[EvaDataNode](#evadatanode)** EvaDataNode

### setHightLightNode

设置高亮节点

**Parameters**

-   `nodename` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** EvaDataNode name
-   `hightOrHidden` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 是否高亮 true 高亮 false 取消高亮

Returns **[EvaRegion](#evaregion)** EvaRegion

### setNodeData

加载节点数据json

**Parameters**

-   `datas` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 节点数据json  详情见example

Returns **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** EvaRegion

### reload

重载数据 用于不同结构的json 格式

**Parameters**

-   `datas` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 节点数据json

Returns **[EvaRegion](#evaregion)** EvaRegion

### toData

转换成json数据

### getConnection

获取链接

**Parameters**

-   `sourceDataName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 起点 EvaDataNode name
-   `targetDataName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 终点 EvaDataNode name

Returns **[EvaConnection](#evaconnection)** EvaConnection

### addColors

转换成json数据

**Parameters**

-   `colors` **objects** 增加颜色 例子 addColors({hello: 'rgb(91, 91, 91)'})

Returns **[EvaRegion](#evaregion)** EvaRegion

## EvaDataNode

**Extends EventEmitter**

EvaDataNode (name,options)布局对象

**Parameters**

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** dataNode name 唯一
-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** options.displayName 节点名 显示名字
    options.maxVolume   例子密度  越大 粒子速度 越小 越分散
    options.class       类别 normal  danger  warning 三种类别 可以自定义
    options.layout      （ltrTree）树形结构  支持dns 结构 ring结构 ringCenter
    options.metadata      用于资深私有数据结构

### setHightLight

设置高亮

**Parameters**

-   `bool` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 是否高亮 true or false

Returns **[EvaDataNode](#evadatanode)** 

### setClass

设置颜色

**Parameters**

-   `className` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 是否高亮  类别 normal  danger  warning 三种类别 可以自定义 需要 EvaRegion.addColors 支持

Returns **[EvaDataNode](#evadatanode)** 

### setNodeType

设置节点图像 此方法不能动态改变 需要在show 方法之前设置

**Parameters**

-   `nodeType` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 目前支持users service storage pipe azure 四种

Returns **[EvaDataNode](#evadatanode)** 

### setMetadata

设置用户私有数据

**Parameters**

-   `key` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 私有key
-   `value` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 私有v

Returns **[EvaDataNode](#evadatanode)** 

### getMetadata

获取用户数据

**Parameters**

-   `key` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[EvaDataNode](#evadatanode)** 

### connect

链接节点

**Parameters**

-   `dataNode` **[EvaDataNode](#evadatanode)** 节点类
-   `streamData` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 链接流量显示 例子 {"danger":10,"normal":10}

Returns **[EvaDataNode](#evadatanode)** 

### connectAndGetConnetion

链接节点

**Parameters**

-   `dataNode` **[EvaDataNode](#evadatanode)** 节点类
-   `streamData` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 链接流量显示 {"danger":10,"normal":10}

Returns **[EvaConnection](#evaconnection)** 

### getConnection

获取链接

**Parameters**

-   `targetDataName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 目地节点 name

Returns **[EvaConnection](#evaconnection)** 

### getConnections

获全部取链接

Returns **\[[EvaConnection](#evaconnection)]** 
