
import generateUuid from 'generate-uuid';
import EventEmitter from 'events';
import Vizceral from '../../vizceral';
import EvaDataNode from './EvaDataNode';
const Console = console;

class RegionView extends EventEmitter {
  constructor (vizRegion) {
	 super();
    this.evaReion = vizRegion
    this.isRoot = false
    this.reginInfomation = {}
    this.entryNodes = []
    this.nodeMap = {}
    this.connectionMap ={}
  }
  setEntryNodes (...entryNodes) {
    for (const dataNode of entryNodes) {
      if (!(dataNode instanceof EvaDataNode)) {
        throw new Error('dataNode must be EvaDataNode class');
      }
      const exist = this.entryNodes.find(dataNodeItem => dataNodeItem.name === dataNode.name);
      if(!exist){
      	 this.entryNodes.push(dataNode)  
         this._headEvent(dataNode)
      }     
    }
    return this
  }
  setRoot (isRoot) {
  	this.isRoot = isRoot
  }
  toData() {
  	const entryNode = this.entryNodes[0]
    if(!entryNode){
      return {}
    }
    let data = entryNode.getFormatData()
    for(let i = 1 ;i< this.entryNodes.length;i++){
      const secEntryNode = this.entryNodes[i]
      const secData = secEntryNode.getFormatData("body")
      data.nodes = data.nodes.concat(secData.nodes)
      data.connections = data.connections.concat(secData.connections)
    }
    return data
  }

  _headEvent (dataNode) {
    // if (!(dataNode instanceof EvaDataNode)) {
    //   throw new Error('dataNode must be EvaDataNode class');
    // }
    // const child = []
    // dataNode.getChildren(child)
    // child.forEach(node => node.on("modify",(events)=>{}))
  }
  setData (data) {
  	// 解析入口点
  	this.cleanup()
  	const rootDatanode = data.nodes.map(node => new EvaDataNode(node.name,node))
    const nodeMap = {}
    const self = this
  	rootDatanode.forEach(node=>{
  		nodeMap[node.name] = node
  	})
  	for(let i =0 ;i < data.connections.length;i++){
      const conn = data.connections[i]
      const target = conn.target
      const source  = conn.source
      const targetNode = nodeMap[target]
      const sourceNode = nodeMap[source]
      if(!targetNode||!sourceNode){
        continue
      }
      const connection = sourceNode.connectAndGetConnetion(targetNode, conn.metrics);
      if(conn.class = 'region' && conn.region) {
        connection.setRegionData(conn.region)
      }
      if (conn.notices) {
        for (let j = 0; j < conn.notices.length; j++) {
          const notice = conn.notices[j];
          connection.createNotices(notice.title, notice.severity, notice.link);
        }
      }
    }
    rootDatanode.filter(node => node.parentNodes.length == 0).forEach(node => this.setEntryNodes(node))
  }
  cleanup() {
  	for(let i =0 ; i < this.entryNodes.length;i++){
  		this.entryNodes[i].removeAllListeners()
  		this.entryNodes[i] = null
  	}
  	this.entryNodes = []
  	return this
  }
  getNodeByNodeName (name) {
    for(let i =0 ; i < this.entryNodes.length;i++){
      if(this.entryNodes[i].name == name){
        return this.entryNodes[i]
      }
      const child = []
      this.entryNodes[i].getChildren(child)
      let targetNode =child.find(node => node.name == name)
      if(targetNode) {
        return targetNode
      }
      if(this.entryNodes[i].subRegion){
        targetNode = this.entryNodes[i].subRegion.getNodeByNodeName(name)
        if(target) {
          return target
        }
      }
    }
  }
  getConnection(sourceDataName,targetDataName) {
    const node = this.getNodeByNodeName(sourceDataName)
    if(!node) {
      return
    }
    return node.getConnection(targetDataName)
  }
}
export default RegionView;