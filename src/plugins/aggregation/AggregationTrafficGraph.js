import _ from 'lodash';
import EvaLTRTreeLayout from '../../layouts/EvaLTRTreeLayout';
import AggregationConnection from './AggregationConnection';
import AggregationNode from './AggregationNode';
import TrafficGraph from '../../base/trafficGraph';
import AggregationInfo from './AggregationInfo';


const Console = console;
/**
  Aggregation
   * 机房 用于绘图绘制 节点和节点之间的 关系
   * @constructor
   * @param {string} source 源节点name
   * @param {string} target 目的节点name
   * @param {object} metadata 私有数据
*/
class AggregationTrafficGraph extends TrafficGraph {
  constructor (name, mainView, parentGraph, graphWidth, graphHeight, Layout = EvaLTRTreeLayout, entryNode) {
    Layout = EvaLTRTreeLayout
    super(name, mainView, parentGraph, graphWidth, graphHeight, AggregationNode, AggregationConnection, Layout, entryNode);
    this.type = 'Aggregation';
    this.linePrecision = 4;
    this.data = {};
    this._layoutTimeoutId = null;
    this._numberOfRunningAsyncLayoutTasks = 0;
    this._onAsyncLayoutTimeout_func = this._onAsyncLayoutTimeout.bind(this);
    this.aggregationInfo = new AggregationInfo(this.view)
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
          this.highlightConnectedNodes(undefined);
          if(this.aggregationInfo) this.aggregationInfo.highlight(this.intersectedObject)
        } else if (this.intersectedObject instanceof this.NodeClass ||
                    this.intersectedObject instanceof this.ConnectionClass) {
          this.emit('objectHovered', this.intersectedObject);
          this.highlightConnectedNodes(this.intersectedObject);
           if(this.aggregationInfo) this.aggregationInfo.highlight(this.intersectedObject)
        }
      }
    }
  }

  handleIntersectedObjectClick () {
    // If we clicked on nothing, clear highlight
    if (!this.intersectedObject) {
      this.highlightObject(undefined);
    } else if ((this.intersectedObject instanceof this.NodeClass)
             || (this.intersectedObject instanceof this.ConnectionClass)) {
      // If clicked on a node and highlighting is allowed, highlight
      // Or if clicked on a connection, highlight.
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
    if(this.aggregationInfo){
      this.aggregationInfo.highlightObject(objectToHighlight, force)
    }
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
    if(force){
      if(this.aggregationInfo){
        this.aggregationInfo.cleanup()
      }
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
    this.aggregationInfo.updateArea()
  }
}

export default AggregationTrafficGraph;
