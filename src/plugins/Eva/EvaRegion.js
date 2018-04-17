
import EventEmitter from 'events';
import Vizceral  from '../../vizceral';
import EvaDataNode  from "./EvaDataNode";
import generateUuid from 'generate-uuid'; 
import TWEEN from 'tween.js'; // Start TWEEN updates for sparklines and loading screen fading out

const getPerformanceNow = function () {
    const g = window;
    if (g != null) {
      const perf = g.performance;
      if (perf != null) {
          try {
            const perfNow = perf.now();
            if (typeof perfNow === 'number') {
              return perfNow;
            }
          } catch (e) {
          // do nothing
          }
      }
    }
    return null;
}

class EvaRegion extends EventEmitter {
  constructor (rootElement) {
  	 super();
  	this.hasInit = false
  	this.canvasDom = null
    this.noticeDom = null
    this.rootElement = rootElement
  	this.id = generateUuid()
  	this.vizceral = null
  	this.perfNow = 0
    this._reload = false
  	this.vizstatus = {}
    this.entryNode = []
    this.childNodes = []
    this.perfNow = getPerformanceNow()
    this.data = {}
    this.currentView = undefined
    this.init()
  }
  init () {
   	if(this.hasInit) {
      return 
    }
    this.genHtml()
    if(!this.canvasDom){
      throw new Error("the dom div must be add!!")
    }
   
    this.vizceral = new Vizceral(this.canvasDom)
    this.vizceral.animate(this.perfNow === null ? 0 : this.perfNow);
    let self = this
    this.vizceral.on("viewChanged",view => {
        this.currentView = view
        self._updateNav()
        self.emit("viewChanged",view)
    })
    this.vizceral.on("onDocumentDoubleClick",_=>{
      // if(!self.currentView){
      //   return 
      // }
      // let tmppush = []
      // // TODO bug 类
      // console.log(self.currentView)
      // let index = self.currentView.view.length - 1
      // for(let i = 0;i < index;i++){
      //   tmppush.push(self.currentView.view[i])
      // }
      // console.log(tmppush)
      // this.vizceral.setView(tmppush)

    })
    this.vizceral.on("objectHighlighted",function(nativeNode){
      let node = false
      let type = "node"
      if(!nativeNode){
        type = "cancel"
      } else if(nativeNode.type == "connection"){
        type = "connection"
        let sourceName = nativeNode.source.name
        let targetName = nativeNode.target.name
        let sourceNode = self.getNodeByNodeName(sourceName)
        node = sourceNode.getConnection(sourceName,targetName)
      }else if (nativeNode.type == 'node'){
        type = "node"
        node =  self.getNodeByNodeName(nativeNode.name)
      }else{
        type = "unknow"
        conole.warn("objectHighlighted node is un know:",nativeNode)
      }
      self.emit("objectHighlighted",type,node,nativeNode) 
  })
    this.hasInit = true
  }
  genHtml() {
    this.canvasDom = document.createElement('canvas')
    this.navDom = document.createElement('div')
    this.navDom.className = "nav"
    this.navDom.setAttribute("id","vizceral-nav")
    this.canvasDom.setAttribute("id","vizceral")
    this.noticeDom = document.createElement('div')
    this.noticeDom.className = "vizceral-notice"
    this.rootElement.append(this.navDom)
    this.rootElement.append(this.canvasDom)
    this.rootElement.append(this.noticeDom)
    let self = this
    this.navDom.addEventListener('click',()=>{
      self.backToParentLevel()
    })
    if(this.rootElement.className) {
       this.rootElement.className += ' graph'
     }else{
       this.rootElement.className = ' graph'
     }
  }
  _updateNav () {
   if(!this.navDom) {
      return 
    }
    let complier = _.template("<span>{{name}}</span>")
    let self = this
    let tmp = _.cloneDeep(this.currentView.view)
    tmp.unshift("global")
    let c = tmp.map(function(data,index) {
      let name  = data
      if(index !== 0){
        let node = self.getNodeByNodeName(data)
        if(node && node.displayName) {
          name = node.displayName
        }
      }
      return {name:data,index:index}
    }).map(function(data) {
      let d = complier(data)
      return complier(data)
    }).join("&gt;")
    this.navDom.innerHTML = c
  }
  show () {
    if(this.hasInit) {
      this.init()
    }
    this.update()
    return this
  }
  _onEvent (eventName,func) {
    console.warn("not support")
    return this
  }

  update (resaon) {
    //console.log("update:",resaon)
    this.vizceral.updateData(this.toData())
    const initialView = this.vizceral.checkInitialView();
    if (!initialView.view) { 
      this.vizceral.setView()
    }
    return this
  }
  updateEvent (eventName,eventSubType,eventData,...args) {
    if(eventSubType == 'hight') {
      let nodeId = eventData.id
      let isHightObject = args[0]?true:false
      this.setHightLightNode(nodeId,isHightObject)
      return 
    }
    this.update(eventSubType)
    return this
  }
  backToParentLevel() {

    if(!this.currentView || !this.currentView.view){
      return
    }
    let tmp =_.cloneDeep(this.currentView.view)
    tmp.pop()
    this.changeView(tmp,null)
  }
  setRootLevels (...EvaDataNods) {
    let children = []
    for(let dataNode of EvaDataNods) {
      if(!(dataNode instanceof EvaDataNode)){
        throw new Error("dataNode must be EvaDataNode class")
      }
      dataNode.getChildren(children)
    }
    return this.setChildren(children)
  }
  setChildren (dataNodes) {
    if(dataNodes.length <= 0) {
      return 
    }
    if(this._reload) {
      this.childNodes.every(function(child){return child.removeAllListeners()})
      this.entryNode.every(function(child){return child.removeAllListeners()})
      this.childNodes = []
      this.entryNode = []
    }
    for(let i = 0; i< dataNodes.length;i++) {
      let datanode = dataNodes[i]
      if(i == 0) {
        this.entryNode.push(datanode)
      }
      let isExist = this.childNodes.find(function(child){return child.name === datanode.name})
      if(isExist) continue;
      datanode.on("modify",this.updateEvent.bind(this,'nodeUpdate'))
      this.childNodes.push(datanode)
    }
    return this
  }
  getNodeByNodeId (nodeId) {
   return  this.childNodes.find(function (node) {
      return node.id == nodeId
    })
  }
  getNodeByNodeName (name) {
    return  this.childNodes.find(function (node) {
      return node.name == name
    })
  }
  setHightLightNode (nodeId,hightOrHidden) {
    if(!this.vizceral) {
      console.warn("this.vizceral is not exist")
      return this
    }
    let node = this.getNodeByNodeId(nodeId)
    let nodeName =""
    if(!node) {
      console.warn("the node is not exist nodeId:" + nodeId + " and switch nodeId to Name")
      node = this.getNodeByNodeName(nodeName)
    }
    if(!node) {
      console.warn("the node is not exist nodeId:",nodeId)
    }
    if(hightOrHidden){
      nodeName = node.name
    }
    this.currentView.hightObject = nodeName
    this.changeView(this.currentView.view,this.currentView.hightObject)
    return this
  }
  changeView (view,hightObject) {
    this.vizceral.setView(view,hightObject)
    return this
  }

  setRegionArea () {
    return this
  }
  setNodeData (...datas) {
    let children =  []
    let connections = []
    for(let data of datas) {
       EvaRegion.transforData(data,children,connections)
    }
    if(children.length  == 0) {
      return 
    }
    for(let i = 0; i < connections.length;i++) {
      let conn = connections[i]
      let sourceName = conn.source
      let targetName = conn.target
      let sourceNode = children.find(function(child){return child.name === sourceName})
      let targetNode = children.find(function(child){return child.name === targetName})
      if(!sourceNode || !targetNode){
        console.warn("error in pass the json data source:",conn.sourceNode,conn.targetNode,conn)
       continue;
      }
      let connection = sourceNode.connectAndGetConnetion(targetNode,conn.metrics)
      if(conn.notices) {
        for(let j = 0; j < conn.notices.length;j++) {
            let notice = conn.notices[j]
            connection.createNotices(notice.title,notice.severity,notice.link)
        }
      }
    }
    this.setChildren(children)
    return this
  }
  reload (...datas) {
    if(this._reload) {
      return
    }
    this._reload = true
    this.setNodeData(...datas)
    this.update(true)
    this._reload = false
    return this
  }
  toData () {
    if(this.childNodes.length <= 0) {
      return {}
    }
    let entryNode = this.childNodes[0]
    let connections = this.childNodes.map(function (datanode,index) {
      return datanode.getConnections()
    })
    connections.push([])
    let connectionItem = connections.reduce(function(c1,c2){
      return c1.concat(c2)
    }).map(function (connectionItem) {
      return connectionItem.getFormatData()
    })

    let nodes = this.childNodes.map(function (datanode,index) {
      return datanode.getFormatData()
    })
    //TODO
    return {
      renderer:entryNode.renderer,
      name:entryNode.name,
      displayName:entryNode.displayName,
      maxVolume:entryNode.maxVolume,
      class:entryNode.class ,
      layout:entryNode.layout ,
      updated:entryNode.updated,
      node_type:entryNode.node_type,
      nodes:nodes,
      connections:connectionItem,
      metadata:entryNode.metadata
    }
  }
}

EvaRegion.transforData = function (data,nodeCollections,conCollections) {
  let dataNode = new EvaDataNode(nodeCollections.length,data.name,data)
  nodeCollections.push(dataNode)
  if(data.connections){
    for(let i =0; i < data.connections.length;i++) {
      conCollections.push(data.connections[i])
    }
  }
  if(!data.nodes) {
    return
  }
  for(let i =0; i < data.nodes.length;i++) {
    EvaRegion.transforData(data.nodes[i],nodeCollections,conCollections)
  }
}

export default EvaRegion;
