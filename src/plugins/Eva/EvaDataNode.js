/*
    EvaDateNode
*/

import EventEmitter from 'events';
import EvaConnection  from "./EvaConnection"

class EvaDataNode extends EventEmitter {
  constructor (id,name,options) {
    super();
    if(!options) {
      options = {}
    }
    this.id  = id
    this.renderer = options.renderer        // global 父节点  region 区域节点 （非叶子节点）  focusedChild 叶子节点
    this.name = name  // 节点名字 唯一
    this.displayName = options.displayName //节点名 显示名字
    this.maxVolume = options.maxVolume                //例子密度  越大 粒子速度 越小 越分散
    this.class = options.class            //类别 normal  danger  warning 三种类别
    this.layout = options.layout      // 树形结构 支持dns 结构 ring结构 ringCenter 结构
    this.updated = options.updated?options.updated:Date.now()         // 更新时间戳 目前没用
    this.parentNodes = []
    this.childNodes = []
    this.node_type = options.node_type
    this.connections = []
    this.detailShow = "default"
    this._createOptaion = options
    this._nodeTag = []      // dataNode 标签类
    this._genTime = Date.now()
    this.metadata = options.metadata    // 用于资深私有数据
    this.checkDataNode()
  }
  setHightLight (bool){
    this.emit("modify","hight",this,bool)
    return this
  }
  setClass (className) {
    this.class = className
    this.emit("modify","setClass",className)
    return this
  }
  setNodeType (nodeType) {
    this.node_type = nodeType
    this.emit("modify","setNodeType",nodeType)
  }
  checkDataNode () {
  // 用于检查 数据的合法性
    if(this.id == null) {
      console.log(this)
      throw new Error("dataNodeId is required")
    }
    if(!this.renderer) {
      this.renderer = EvaDataNode.CONSTS.DEAULT.RENDERER
    }
    if(this.name == null) {
      console.error(this)
      throw new Error("dataNode's name is required!")
    }
    if(!this.displayName) {
      this.displayName = this.name
    }
    if(!this.node_type) {
      //TODO
      this.node_type = "default"
    }
    if(!this.maxVolume) {
      this.maxVolume = EvaDataNode.CONSTS.DEAULT.MAXVOLUME
    }
    if(!this.class) {
      this.class = EvaDataNode.CONSTS.DEAULT.CLASS
    }
    if(!this.layout) {
      this.layout =  EvaDataNode.CONSTS.DEAULT.LAYOUT 
    }
    if(!this.metadata ){
      this.metadata  = {}
    }
  }
  setMetadata(key,value) {
    this.metadata[key] = value
    this.emit("modify","setMetadata",key,value)
    return this
  }
  setParentDataNode (dataNode) {
    if(!(dataNode instanceof EvaDataNode)){
      throw new Error("dataNode must be EvaDataNode class")
    }
    let exist = this.parentNodes.find(function(dataNodeItem) {return dataNodeItem.id === dataNode.id})
    if(!exist) {
      this.parentNodes.push(dataNode)
    }
    return this
  }
  setNode (dataNode) {
  // 判定是否有链接
    if(!(dataNode instanceof EvaDataNode)){
      throw new Error("dataNode must be EvaDataNode class")
    }
    let exist = this.childNodes.find(function(dataNodeItem) {return dataNodeItem.id === dataNode.id})
    if(!exist) {
      this.childNodes.push(dataNode)
      dataNode.setParentDataNode(this)
    }
    if(this.childNodes.length > 0) {
      this.renderer = EvaDataNode.CONSTS.RENDERER.REGION
    }else{
      this.renderer = EvaDataNode.CONSTS.RENDERER.FOCUSEDCHILD
    }
    return this
  }
  connect (dataNode,streamData) {
    // 判定是否是类
    // 增加区域节点
    let self = this
    let newConnection = new EvaConnection(this.name,dataNode.name,streamData)
    let exist = this.connections.find(function(connectionItem) {return connectionItem.id === newConnection.id})
    // 先加节点 然后更新视图
    this.setNode(dataNode)
    if(!exist) {
      this.connections.push(newConnection)
      newConnection.on("modify",self.emit.bind(self,"modify"))
      this.emit("modify","newConnection",newConnection)
    }
    return this
  }
  connectAndGetConnetion(dataNode,streamData) {
    return this.connect(dataNode,streamData).getConnection(this.name,dataNode.name)
  }
  getConnection (sourceDataId,targetDataId) {
    let  connectionId  = sourceDataId + "-" + targetDataId
    return this.connections.find(function(conn){return conn.getId() === connectionId})
  }
  getConnections () {
    return this.connections
  }
  showDetail(name) {
    if(!name) {
      name = "default"
    }
    if(name !== "docunt" && name !== "arc"){
      return
    }

    this.detailShow = name
    this.emit("modify","detailSwitch",this)
    return this 
  }
  getChildren  (collectionArray) {
    collectionArray.push(this)
    if(this.childNodes.length > 0) {
      for (var i = this.childNodes.length - 1; i >= 0; i--) {
        this.childNodes[i].getChildren(collectionArray)
      }
    }
  }
  getFormatData () {
  // body...
    let childs = this.childNodes.map(function(dataNodeItem){return dataNodeItem.getFormatData()})
    let selfEntryNode = {
      name:this.name,
      renderer:EvaDataNode.CONSTS.RENDERER.FOCUSEDCHILD,
      node_type:this.node_type,
      displayName:this.displayName ,
      maxVolume:this.maxVolume,
      class:this.class,
      layout:this.layout ,
      updated:this.updated,
      nodes:childs,
      connections:connections,
      metadata:this.metadata
    }
    if(this.displayName) {
      selfEntryNode.displayName = this.displayName
    }
    childs.push(selfEntryNode)
    let connections = this.connections.map(function(connectionItem){return connectionItem.getFormatData()})
    return {
      evaNodeId:this.id,
      renderer :this.renderer,
      name:this.name,
      node_type:this.node_type,
      displayName:this.displayName ,
      maxVolume:this.maxVolume,
      class:this.class,
      layout:this.layout ,
      updated:this.updated,
      nodes:childs,
      connections:connections,
      metadata:this.metadata
    }
  }
}

EvaDataNode.CONSTS = {
  RENDERER:{
    REGION:"region",
    GLOBAL:"global",
    FOCUSEDCHILD:"focusedChild",
  },
  CLASS :{
    DANGER:"danger",
    NORMAL:"normal",
    WARNING:"warning"
  },
  DEAULT:{
    RENDERER:"focusedChild",
    DISPLAYNAME_PRE:"dataNode",
    MAXVOLUME:50000,
    LAYOUT:"ltrTree",
    CLASS:"normal"
  }
}


export default EvaDataNode;
