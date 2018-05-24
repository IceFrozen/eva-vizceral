import generateUuid from 'generate-uuid';
import EventEmitter from 'events';
import Vizceral from '../../vizceral';
import EvaDataNode from './EvaDataNode';

const Console = console;
// import TWEEN from 'tween.js';
 /**
	 * EvaRegion (rootElement)
	 *
	 * const region = new Vizceral.EvaRegion(document.getElementById('viz'))
	 * @constructor
	 * @param {dom} rootElement 节点 需要在哪里绘制图形
	 *
	 */
class EvaRegion extends EventEmitter {
  constructor (rootElement) {
		 super();
    this.hasInit = false;
    this.canvasDom = null;
    this.noticeDom = null;
    this.rootElement = rootElement;
    this.id = generateUuid();
    this.vizceral = null;
    this.perfNow = 0;
    this._reload = false;
    this.vizstatus = {};
    this.entryNode = [];
    this.childNodes = [];
    this.perfNow = getPerformanceNow();
    this.data = {};
    this.currentView = undefined;
    this.Aggregation = []
    this.init();
  }
  init () {
    if (this.hasInit) {
		 return;
	 }
    this.genHtml();
    if (!this.canvasDom) {
      throw new Error('the dom div must be add!!');
    }

    this.vizceral = new Vizceral(this.canvasDom);
    this.vizceral.animate(this.perfNow === null ? 0 : this.perfNow);
    const self = this;
    this.vizceral.on('viewChanged', (view) => {
      this.currentView = view;
      self._updateNav();
      self.emit('viewChanged', view);
    });
    this.vizceral.on('befroeObjectHighlighted', (nativeNode,isSelect) => {
      let node = false;
      let type = 'node';
      if (nativeNode.type == 'connection') {
        type = 'connection';
        const sourceName = nativeNode.source.name;
        const targetName = nativeNode.target.name;
        const sourceNode = self.getNodeByNodeName(sourceName);
        if(sourceNode){
          node = sourceNode.getConnection(targetName);
          if(!node) {
            type = 'unknow';
          }
        }else{
          type = 'unknow';
        }
      } else if (nativeNode.type === 'node') {
        type = 'node';
        node = self.getNodeByNodeName(nativeNode.name);
      } else {
        type = 'unknow';
        Console.warn('objectHighlighted node is un know:', nativeNode);
      }
      this.emit("befroeObjectHighlighted",type, node, nativeNode,isSelect)

    });
    this.vizceral.on('objectHighlighted', (nativeNode,graph) => {
      let node = false;
      let type = 'node';
      if (!nativeNode) {
        type = 'cancel';
      } else if (nativeNode.type == 'connection') {
        type = 'connection';
        const sourceName = nativeNode.source.name;
        const targetName = nativeNode.target.name;
        const sourceNode = self.getNodeByNodeName(sourceName);
        if(!sourceNode){
          type = 'cancel';
        }else{      
          node = sourceNode.getConnection(targetName);
        }
      } else if (nativeNode.type === 'node') {
        type = 'node';
        node = self.getNodeByNodeName(nativeNode.name);
      } else {
        type = 'unknow';
        Console.warn('objectHighlighted node is un know:', nativeNode);
      }
      self.emit('objectHighlighted', type, node, nativeNode);
    });
    this.hasInit = true;
    this.initDefinitions();
  }
  genHtml () {
    this.canvasDom = document.createElement('canvas');
    this.navDom = document.createElement('div');
    this.navDom.className = 'nav';
    this.navDom.setAttribute('id', 'vizceral-nav' + this.id);
    this.canvasDom.setAttribute('id', 'vizceral' + this.id);
    this.noticeDom = document.createElement('div');
    this.noticeDom.className = 'vizceral-notice';
    this.rootElement.append(this.navDom);
    this.rootElement.append(this.canvasDom);
    this.rootElement.append(this.noticeDom);
    const self = this;
    this.navDom.addEventListener('click', (data) => {
      self.backToParentLevel();
    });
    if (this.rootElement.className) {
      this.rootElement.className += ' graph';
    } else {
      this.rootElement.className = ' graph';
    }
  }
  _updateNav () {
    if (!this.navDom) {
      return;
    }
    const complier = _.template('<span>{{name}}</span>');
    const self = this;
    let tmp = [] 
    this.vizceral.__parentTrafficData.map(data=>data.name)
    .forEach(data => {
      tmp.unshift(data)
    })
    let views = _.cloneDeep(this.currentView.view);
    tmp = tmp.reverse().concat(views)
    tmp.unshift('[back]');
  

    const c = tmp.map((data, index) => {
      let name = data;
      if (index !== 0) {
        const node = self.getNodeByNodeName(data);
        if (node && node.displayName) {
          name = node.displayName;
        }
      }
      return { name: data, index: index };
    }).map((data) => {
      const d = complier(data);
      return complier(data);
    }).join('&gt;');
    this.navDom.innerHTML = c;
  }
	/**
	 * 创建EvaRegion 用于update操作或者首次加载的绘图
	 */
  show () {
    if (this.hasInit) {
      this.init();
    }
    this.update();
    return this;
  }
  /**
   * 设置性能监控
   * @param {boolean} isDebuggerShow 是否启动性能监控图标
   * @returns {EvaRegion} EvaRegion
   */
   setDebugger (isDebuggerShow) {
    if(this.vizceral){
      this.vizceral.setDebuggerMode(isDebuggerShow)
    }
    return this
   }
  _onEvent (eventName, func) {
    Console.warn('not support');
    return this;
  }
	/**
	 * 更新操作
	 * @returns {EvaRegion} EvaRegion
	 */
  update (resaon,forceClear) {
    this.vizceral.updateData(this.toData(),forceClear);
    if (this.currentView) {
      this.vizceral.setView(this.currentView.view, this.currentView.hightObject);
    }else{
      this.vizceral.setView();
    }
    return this;
  }
  updateEvent (eventName, eventSubType, eventData, ...args) {
    if (eventSubType == 'hight') {
      const nodeId = eventData.name;
      const isHightObject = !!args[0];
      this.setHightLightNode(nodeId, isHightObject);
      return;
    }
    if (eventSubType == 'detailSwitch') {
      const fn = this.vizceral.currentGraph.focusedNode;
      if (fn) {
        fn.context = eventData.detailShow;
        if (fn.view) {
          fn.view.updateText();
        }
      }
      return;
    }
    this.update(eventSubType);
    return this;
  }
	/**
	 * 返回上层结构
	 *
	 * @returns {EvaRegion}  EvaRegion
	 */
  backToParentLevel () {
    
    if (!this.currentView) {
      return;
    }
    
    const tmp = _.cloneDeep(this.currentView.view);
    tmp.pop();
    this.changeView(tmp, null);
    return this;
  }
	/**
	 * 设置跟路径
	 *
	 * @param {EvaDataNods} EvaDataNods 需要显示的根路径节点
	 *
	 * @returns {EvaRegion} EvaRegion
	 */
  setRootLevels (...EvaDataNods) {
    const children = [];
    for (const dataNode of EvaDataNods) {
      if (!(dataNode instanceof EvaDataNode)) {
        throw new Error('dataNode must be EvaDataNode class');
      }
      dataNode.getChildren(children);
    }
    return this.setChildren(children);
  }
  setChildren (dataNodes) {
    if (dataNodes.length <= 0) {
      return;
    }
    if (this._reload) {
      this.childNodes.every(child => child.removeAllListeners());
      this.entryNode.every(child => child.removeAllListeners());
      this.childNodes = [];
      this.entryNode = [];
    }
    for (let i = 0; i < dataNodes.length; i++) {
      const datanode = dataNodes[i];
      if (i == 0) {
        this.entryNode.push(datanode);
      }
      const isExist = this.childNodes.find(child => child.name === datanode.name);
      if (isExist) continue;
      datanode.on('modify', this.updateEvent.bind(this, 'nodeUpdate'));
      this.childNodes.push(datanode);
    }
    return this;
  }
	 /**
	 * 根据name 获取 EvaDataNode 对象
	 *
	 * @param {string} name EvaDataNode name
	 *
	 * @returns {EvaDataNode} EvaDataNode
	 */
  getNodeByNodeId (name) {
    return this.childNodes.find(node => node.name == name);
  }
	 /**
	 * 根据name 获取 EvaDataNode 对象
	 *
	 * @param {string} name EvaDataNode 根据name
	 *
	 * @returns {EvaDataNode} EvaDataNode
	 */
  getNodeByNodeName (name) {
    return this.childNodes.find(node => node.name == name);
  }
	/**
	 * 设置高亮节点
	 *
	 * @param {string} nodename EvaDataNode name
	 * @param {boolean} hightOrHidden 是否高亮 true 高亮 false 取消高亮
	 * @returns {EvaRegion} EvaRegion
	 */
  setHightLightNode (nodename, hightOrHidden) {
    if (!this.vizceral) {
      Console.warn('this.vizceral is not exist');
      return this;
    }
    let nodeName;
    const node = this.getNodeByNodeName(nodename);
    if (!node) {
      Console.warn('the node is not exist nodename:', nodename);
    }
    if (hightOrHidden) {
      nodeName = this.vizceral.getNode([node.name]);
    }
    this.vizceral.setHighlightedNode(nodeName);
    return this;
  }
  changeView (view, hightObject) {
    this.vizceral.zoomOutViewLevel()
    //this.vizceral.setView(view, hightObject);
    return this;
  }

  setRegionArea () {
    return this;
  }
	/**
	 * 加载节点数据json
	 *
	 * @param {object} datas 节点数据json  详情见example
	 * @returns {object} EvaRegion
	 */
  setNodeData (...datas) {
    const children = [];
    const connections = [];
    for (const data of datas) {
      EvaRegion.transforData(data, children, connections);
    }
    if (children.length == 0) {
      return;
    }
    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      const sourceName = conn.source;
      const targetName = conn.target;
      const sourceNode = children.find(child => child.name === sourceName);
      const targetNode = children.find(child => child.name === targetName);
      if (!sourceNode || !targetNode) {
        Console.warn('error in pass the json data source:', conn.sourceNode, conn.targetNode, conn);
        continue;
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
    this.setChildren(children);
    return this;
  }
	/**
	 * 重载数据 用于不同结构的json 格式
	 *
	 * @param {object} datas 节点数据json
	 * @returns {EvaRegion} EvaRegion
	 */
  reload (...datas) {
    if (this._reload) {
      return;
    }
    this._reload = true;
    this.currentView = undefined;
    this.setNodeData(...datas);
    this.vizceral.reload(this.toData())
    this._reload = false;
    return this;
  }
	/**
	 * 转换成json数据
	 *
	 */
  setAggregation(Aggregations) {
    this.Aggregation = Aggregations
  }


   /**
   * 转换成json数据
   *
   */
  toData () {
    if (this.childNodes.length <= 0) {
      return {};
    }
    const entryNode = this.childNodes[0];
    const connections = this.childNodes.map((datanode, index) => datanode.getConnections());
    connections.push([]);
    const connectionItems = connections.reduce((c1, c2) => c1.concat(c2)).map(connectionItem => connectionItem.getFormatData());


    const nodes = this.childNodes
    .map((datanode, index) => datanode.getFormatData());
		// 拿到首节点数据，然后构建没有
    let result = entryNode.getFormatData()
    result.connections = connectionItems
    result.nodes = nodes

    if(entryNode.Aggregation.length > 0) {
       result.renderer = 'Aggregation'
     }else{
      result.renderer = 'region'
     }

    return result
  }
  /**
   * 转换成json数据 new 
   *
   */
   toDateNew () {
    /**
      1、frist get entryNode
      2、get the entryNode Top Infomation
      3、get the entryNode body data
                  body info is include
                        1 entry node top info   
                        2 entry childeNode node info 
                                  

                        3、get the connection node and unfold it out





    */
    
   }


	/**
	 * 获取链接
	 * @param {string} sourceDataName 起点 EvaDataNode name
	 * @param {string} targetDataName 终点 EvaDataNode name
	 * @returns {EvaConnection} EvaConnection
	 */
  getConnection (sourceDataName, targetDataName) {
    const node = this.getNodeByNodeId(sourceDataName);
    return node.getConnection(targetDataName);
  }
	/**
	 * 转换成json数据
	 * @param {objects} colors 增加颜色 例子 addColors({hello: 'rgb(91, 91, 91)'})
	 * @returns {EvaRegion} EvaRegion
	 */
  addColors (colors) {
    const style = { colorTraffic: colors };
    if (!this.hasInit) {
      return;
    }
    this.vizceral.updateStyles(style);
    this.update('color_change');
    return this;
  }
}

EvaRegion.transforData = function (data, nodeCollections, conCollections) {
  const dataNode = new EvaDataNode(data.name, data);
  nodeCollections.push(dataNode);
  if (data.connections) {
    for (let i = 0; i < data.connections.length; i++) {
      conCollections.push(data.connections[i]);
    }
  }
  if (!data.nodes) {
    return;
  }
  for (let i = 0; i < data.nodes.length; i++) {
    EvaRegion.transforData(data.nodes[i], nodeCollections, conCollections);
  }
};
EvaRegion.prototype.initDefinitions = function () {
  if (!this.hasInit) {
    return;
  }
  this.vizceral.updateDefinitions({
    detailedNode: {
      volume: {
        default: {
          top: { header: '流量', data: 'data.volumePercent', format: '0.00%' },
          bottom: { header: '错误率', data: 'data.classPercents.danger', format: '0.00%' },
        },
        focused: { // override for the region renderer
          top: { header: '流量', data: 'data.volume', format: '0.0' },
          bottom: { header: '错误率', data: 'data.classPercents.danger', format: '0.00%' },
					// donut: {
					//   top: { header: '流量', data: 'data.volume', format: '0.0' },
					//   bottom: { header: '错误率', data: 'data.classPercents.danger', format: '0.00%' },
					//   data: 'data.globalClassPercents',
					//   indices: [{ key: 'danger' },{ key: 'warning' },{ key: 'normal'}]
					// },
					// arc: {
					//   top: { header: '流量', data: 'data.volume', format: '0.0' },
					//   bottom: { header: '错误率', data: 'data.volume', format: '0.00%' },
					//   data: {
					//     values: [ // Array of values
					//       { name: 'danger', value: 30 }, // Values have a value, name, and an optional overriding class. If class is not present, uses name as class name.
					//       { name: 'normal', value:70, class:'normal' }
					//     ],
					//     total: 100, // The total value to equal 100% of the arc graph
					//     line: 0.9 // [optional] What percent, in decimal form, to put the optional marking line.
					//   },
					//   lineIndex: 'line'
					// }
        },
        entry: { // override for the region renderer
          top: { header: '流量', data: 'data.volume', format: '0.0' },
          bottom: { header: '错误率', data: 'data.classPercents.danger', format: '0.00%' },
					// donut: {
					//   top: { header: '流量', data: 'data.volume', format: '0.0' },
					//   bottom: { header: '错误率d', data: 'data.classPercents.danger', format: '0.00%' },
					//   data: 'data.globalClassPercents',
					//   indices: [{ key: 'danger' },{ key: 'warning' },{ key: 'normal'}]
					// },
					// arc: {
					//   top: {  header: '流量', data: 'data.volume', format: '0.0' },
					//   bottom: {header: '错误率', data: 'data.classPercents.danger', format: '0.0' },
					//   data: {
					//     values: [ // Array of values
					//       { name: 'warning', value: 30,class:"warning" }, // Values have a value, name, and an optional overriding class. If class is not present, uses name as class name.
					//       { name: 'normal', value:70, class:'normal' }
					//     ],
					//     total: 100, // The total value to equal 100% of the arc graph
					//     line: 28 // [optional] What percent, in decimal form, to put the optional marking line.
					//   },
					//   //lineIndex: 'line'
					// }
        }
      }
    }
  });
};


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
      }
    }
  }
  return null;
};

export default EvaRegion;
