import _ from 'lodash';
import GroupLayout from '../../layouts/GroupLayout';
import GroupConnection from './GroupConnection';
import GroupNode from './GroupNode';
import TrafficGraph from '../../base/trafficGraph';
import GroupInfo from './GroupInfo';


const Console = console;
/**
  Group
   * 机房 用于绘图绘制 节点和节点之间的 关系
   * @constructor
   * @param {string} source 源节点name
   * @param {string} target 目的节点name
   * @param {object} metadata 私有数据
*/
class GroupTrafficGraph extends TrafficGraph {
  constructor (name, mainView, parentGraph, graphWidth, graphHeight, Layout = EvaLTRTreeLayout, entryNode) {
    Layout = GroupLayout
    super(name, mainView, parentGraph, graphWidth, graphHeight, GroupNode, GroupConnection, Layout, entryNode);
    this.type = 'Group';
    this.linePrecision = 4;
    this.data = {};
    this._layoutTimeoutId = null;
    this._numberOfRunningAsyncLayoutTasks = 0;
    this._onAsyncLayoutTimeout_func = this._onAsyncLayoutTimeout.bind(this);
    this.groupInfo = new GroupInfo(this.view)
  }

  updateVisibleInfo () {
    const minimumNoticeLevel = this.nodeName ? 0 : 1;
    _.each(this.connections, (connection) => { connection.setMinimumNoticeLevel(minimumNoticeLevel); });
  }

  setIntersectedObject (object) {
    const changed = super.setIntersectedObject(object);
    if (changed) {
      // Change node highlighting
      if (!this.highlightedObject) {
        if (!this.intersectedObject) {
          // If we are not hovering over anything, clear the highlighting
          if(this.groupInfo) this.groupInfo.highlight(this.intersectedObject)
          this.highlightConnectedNodes(undefined);
        } else if (this.intersectedObject instanceof this.NodeClass ||
                    this.intersectedObject instanceof this.ConnectionClass) {
          this.emit('objectHovered', this.intersectedObject);
          if(this.groupInfo) this.groupInfo.highlight(this.intersectedObject)
          this.highlightConnectedNodes(this.intersectedObject);
        }
      }
    }
  }

  handleIntersectedObjectClick () {
    // If we clicked on nothing, clear highlight
    if (!this.intersectedObject) {
      this.highlightObject(undefined);
      if(this.groupInfo) this.groupInfo.highlight(this.intersectedObject)
    } else if ((this.intersectedObject instanceof this.NodeClass)
             || (this.intersectedObject instanceof this.ConnectionClass)) {
      // If clicked on a node and highlighting is allowed, highlight
      // Or if clicked on a connection, highlight.
      if(this.groupInfo) this.groupInfo.highlight(this.intersectedObject)
      this.highlightObject(this.intersectedObject);
    }
    return this
  }

  handleIntersectedObjectDoubleClick (node) {
    if (this.intersectedObject && this.intersectedObject.graphRenderer === 'region') {
      super.handleIntersectedObjectDoubleClick();
    }
    return this
  }

  highlightObject (objectToHighlight, force) {
    super.highlightObject(objectToHighlight, force)
  }
  getSelectedNode () {
    return this.nodes[this.nodeName];
  }

  setFilters (filters) {
    let filtersChanged = false;
    _.each(filters, (filter) => {
      if (!this.filters[filter.name]) {
        this.filters[filter.name] = filter;
        filtersChanged = true;
      }
      if (filter.value !== this.filters[filter.name].value) {
        this.filters[filter.name].value = filter.value;
        filtersChanged = true;
      }
      if (this.filters[filter.name].defaultValue === undefined) {
        this.filters[filter.name].defaultValue = this.filters[filter.name].value;
        filtersChanged = true;
      }
    });

    if (this.isPopulated() && filtersChanged) {
      this._relayout();
    }
  }
  update() {
    super.update()
  }
  _onAsyncLayoutBegin () {
    this._numberOfRunningAsyncLayoutTasks += 1;
    this._clearLayoutTimeoutId();
    this._layoutTimeoutId = setTimeout(this._onAsyncLayoutTimeout_func, 5000);
    this.updateIsParticleSystemEnabled();
  }

  _clearLayoutTimeoutId () {
    if (this._layoutTimeoutId !== null) {
      clearTimeout(this._layoutTimeoutId);
      this._layoutTimeoutId = null;
    }
  }

  _onAsyncLayoutTimeout () {
    this._numberOfRunningAsyncLayoutTasks = 0;
    Console.warn('AsyncLayout timed out:', 0);
    this._clearLayoutTimeoutId();
    this.updateIsParticleSystemEnabled();
  }

  computeShouldParticleSystemBeEnabled () {
    return super.computeShouldParticleSystemBeEnabled() && this._numberOfRunningAsyncLayoutTasks === 0;
  }
  cleanup (force) {
    super.cleanup()
    if(this.groupInfo){
      this.groupInfo.cleanup()
    }
  }

  layoutRunCompleted (graph,result) {
    if(this.groupInfo) {
      this.groupInfo.setGroupInfo(result)
      this.groupInfo.updateArea()
    }
  }
  onAsyncLayoutCompleted () {
    super.onAsyncLayoutCompleted();
    if (this._numberOfRunningAsyncLayoutTasks > 0) {
      this._numberOfRunningAsyncLayoutTasks -= 1;
      if (this._numberOfRunningAsyncLayoutTasks === 0) {
        this._clearLayoutTimeoutId();
      }
      this.updateIsParticleSystemEnabled();
    }
    
  }
}

export default GroupTrafficGraph;
