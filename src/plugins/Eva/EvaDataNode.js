import EventEmitter from 'events';
import EvaConnection from './EvaConnection';
import RegionView from "./RegionView";
 /**
   * EvaDataNode (name,options)布局对象
   *
   * @constructor
   * @param {string} name dataNode name 唯一
   * @param {object}  options
        options.displayName 节点名 显示名字
        options.maxVolume   例子密度  越大 粒子速度 越小 越分散
        options.class       类别 normal  danger  warning 三种类别 可以自定义
        options.layout      （ltrTree）树形结构  支持dns 结构 ring结构 ringCenter
        options.metadata      用于资深私有数据结构
   */
class EvaDataNode extends EventEmitter {
  constructor (name, options) {
    super();
    if (!options) {
      options = {};
    }
    this.renderer = options.renderer;        // global 父节点  region 区域节点 （非叶子节点）  focusedChild 叶子节点
    this.name = name;  // 节点名字 唯一
    this.displayName = options.displayName; // 节点名 显示名字
    this.maxVolume = options.maxVolume;                // 例子密度  越大 粒子速度 越小 越分散
    this.class = options.class;            // 类别 normal  danger  warning 三种类别
    this.layout = options.layout;      // 树形结构 支持dns 结构 ring结构 ringCenter 结构
    this.updated = options.updated ? options.updated : Date.now();         // 更新时间戳 目前没用
    this.parentNodes = [];
    this.childNodes = [];
    this.GroupInfo = options.GroupInfo || []
    this.groupId = options.groupId
    this.node_type = options.node_type;
    this.connections = [];
    this.subRegion = undefined
    this.detailShow = 'default';
    this._createOptaion = options;
    this._nodeTag = [];      // dataNode 标签类
    this._genTime = Date.now();
    this.metadata = options.metadata;    // 用于资深私有数据
    this._addChildNodes()
    this.checkDataNode();
  }
  _addChildNodes(nodes,connections) {
    if(this._createOptaion.nodes && this._createOptaion.nodes.length >0){
      this.subRegion = new RegionView(this)
      this.subRegion.setData(this._createOptaion)
      this.subRegion.on("modify",this.emit.bind(this))
    }
  }
  /**
   *  setSubRegionEntry
   *
   * @param {string} 设置子区域
   * @return {EvaDataNode}
   */
   setSubRegion () {
    return this
   }
  /**
   *  设置高亮
   *
   * @param {string} bool 是否高亮 true or false
   * @return {EvaDataNode}
   */
  setHightLight (bool) {
    this.emit('modify', 'hight', this, bool);
    return this;
  }
  /**
   *  设置颜色
   *
   * @param {string} className 是否高亮  类别 normal  danger  warning 三种类别 可以自定义 需要 EvaRegion.addColors 支持
   * @return {EvaDataNode}
   */
  setClass (className) {
    this.class = className;
    this.emit('modify', 'setClass', className);
    return this;
  }
  /**
   * 设置节点图像 此方法不能动态改变 需要在show 方法之前设置
   * @param {string} nodeType 目前支持users service storage pipe azure 四种
   * @return {EvaDataNode}
   */
  setNodeType (nodeType) {
    this.node_type = nodeType;
    this.emit('modify', 'setNodeType', nodeType);
    return this;
  }
  checkDataNode () {
  // 用于检查 数据的合法性
    if (!this.renderer) {
      this.renderer = EvaDataNode.CONSTS.DEAULT.RENDERER;
    }
    if (this.name == null) {
      // console.error(this);
      throw new Error("dataNode's name is required!");
    }
    if (!this.displayName) {
      this.displayName = this.name;
    }
    if (!this.node_type) {
      // TODO
      this.node_type = EvaDataNode.CONSTS.DEAULT.NODE_TYPE
    }
    if (!this.maxVolume) {
      this.maxVolume = EvaDataNode.CONSTS.DEAULT.MAXVOLUME;
    }
    if (!this.class) {
      this.class = EvaDataNode.CONSTS.DEAULT.CLASS;
    }
    if (!this.layout) {
      this.layout = EvaDataNode.CONSTS.DEAULT.LAYOUT;
    }
    if (!this.metadata) {
      this.metadata = {};
    }
  }
  /**
   * 设置用户私有数据
   * @param {object} key 私有key
   * @param {object} value  私有v
   * @return {EvaDataNode}
   */
  setMetadata (key, value) {
    this.metadata[key] = value;
    this.emit('modify', 'setMetadata', key, value);
    return this;
  }
  /**
   * 获取用户数据
   * @param {object} key
   * @return {EvaDataNode}
   */
  getMetadata (key) {
    return this.metadata[key];
  }
  setParentDataNode (dataNode) {
    if (!(dataNode instanceof EvaDataNode)) {
      throw new Error('dataNode must be EvaDataNode class');
    }
    const exist = this.parentNodes.find(dataNodeItem => dataNodeItem.name === dataNode.name);
    if (!exist) {
      this.parentNodes.push(dataNode);
    }
    return this;
  }
  setConnectNode (dataNode) {
    if (!(dataNode instanceof EvaDataNode)) {
      throw new Error('dataNode must be EvaDataNode class');
    }
    const exist = this.childNodes.find(dataNodeItem => dataNodeItem.name === dataNode.name);
    if (!exist) {
      this.childNodes.push(dataNode);
      dataNode.setParentDataNode(this);
    }
    return this;
  }
  /**
   * 链接节点
   * @param {EvaDataNode} dataNode 节点类
   * @param {object} streamData 链接流量显示 例子 {"danger":10,"normal":10}
   * @return {EvaDataNode}
   */
  connect (dataNode, streamData) {
    const self = this;
    const newConnection = new EvaConnection(this.name, dataNode.name, streamData);
    const exist = this.connections.find(connectionItem => connectionItem.id === newConnection.id);
    if (!exist) {
      this.setConnectNode(dataNode);
      this.connections.push(newConnection);
      newConnection.on('modify', self.emit.bind(self, 'modify'));
      this.emit('modify', 'newConnection', newConnection);
    }
    return this;
  }
  /**
   * 链接节点
   * @param {EvaDataNode} dataNode 节点类
   * @param {object} streamData 链接流量显示 {"danger":10,"normal":10}
   * @return {EvaConnection}
   */
  connectAndGetConnetion (dataNode, streamData) {
    return this.connect(dataNode, streamData).getConnection(dataNode.name);
  }
  /**
   * 获取链接
   * @param {string} targetDataName 目地节点 name
   * @return {EvaConnection}
   */
  getConnection (targetDataName) {
    const connectionId = `${this.name}-${targetDataName}`;
    return this.connections.find(conn => conn.getId() === connectionId);
  }
  /**
   * 获全部取链接
   * @return {[EvaConnection]}
   */
  getConnections () {
    return this.connections;
  }
  /**
   * 是否有环
   * @return {[EvaConnection]}
   */
   isLoop () {
     return true  
   }
  showDetail (name) {
    if (!name) {
      name = 'default';
    }
    if (name !== 'docunt' && name !== 'arc') {
      return this;
    }
    this.detailShow = name;
    this.emit('modify', 'detailSwitch', this);
    return this;
  }
  getChildren (collectionArray) {
    const isExit = collectionArray.find((node)=>node.name === this.name)
    if(!isExit) {
      collectionArray.push(this)
    }
    if (this.childNodes.length > 0) {
      for (let i = this.childNodes.length - 1; i >= 0; i--) {
        const childNode = this.childNodes[i]
        const isExit = collectionArray.find((collectionArrayItem)=>collectionArrayItem.name === childNode.name)
        if(isExit) {
          continue;
        }
        this.childNodes[i].getChildren(collectionArray);
      }
    }
  }

  getFormatData (infoType) {
    if(infoType == "head") {
      return this.getHeadData()
    }
    else if(infoType == 'body') {
      return this.getBodyData()
    }
    const head = this.getHeadData()
    const body = this.getBodyData()
    return _.assign(head,body)
  }
  getHeadData () {
    return {
      name: this.name,
      renderer: this.renderer,
      node_type: this.node_type,
      displayName: this.displayName,
      maxVolume: this.maxVolume,
      class: this.class,
      layout: this.layout,
      updated: this.updated,
      GroupInfo:this.GroupInfo,
      groupId:this.groupId,
      metadata: this.metadata
    }
  }
  getBodyData () {
    // 获取 top 
    // 获取 所有连接
    let connections = []
    const childs = []
    this.getChildren(childs)
    const nodes = childs.map(node => {
      let data = node.getFormatData("head")
      let connectionItems = node.connections.map(connectionItem => connectionItem.getFormatData());
      connections.push(connectionItems)
      if(node.renderer == EvaDataNode.CONSTS.RENDERER.REGION){
         const subRegion = node.subRegion.toData()
         data.nodes = subRegion.nodes
         data.connections = subRegion.connections
      }
      return data
    })
    return {
      nodes: nodes,
      connections: _.flattenDeep(connections)
    }
  }
}

EvaDataNode.CONSTS = {
  RENDERER: {
    REGION: 'region',
    GLOBAL: 'global',
    FOCUSEDCHILD: 'focusedChild',
  },
  CLASS: {
    DANGER: 'danger',
    NORMAL: 'normal',
    WARNING: 'warning'
  },
  NODE_TYPE:{
    DEAULT:"default"
  },
  DEAULT: {
    RENDERER: 'focusedChild',
    DISPLAYNAME_PRE: 'dataNode',
    NODE_TYPE:"default",
    MAXVOLUME: 50000,
    LAYOUT: 'ltrTree',
    CLASS: 'normal'
  }
};


export default EvaDataNode;
