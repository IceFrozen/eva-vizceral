/**
 *
 *  Copyright 2016 Netflix, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 *
 */
import _ from 'lodash';

//import LayoutWorker from 'worker?inline!./ltrTreeLayoutWorker'; // eslint-disable-line import/no-extraneous-dependencies, import/extensions
class EvaLTRTreeLayout {
  constructor () {}

  findPositions (nodeKey, edgeKey) {
    return this.cache.find((layout) => {
      // If there are more nodes or edges than are in the layout, then we know it doesn't match
      if (nodeKey.length > layout.nodeKey.length || edgeKey.length > layout.edgeKey.length) {
        return false;
      }

      // If there are new nodes that are not in this layout, bail
      const nodeKeyMatch = nodeKey.every(node => layout.nodeKey.indexOf(node) !== -1);
      if (!nodeKeyMatch) {
        return false;
      }

      // If there are new edges that are not in this layout, bail
      const edgeKeyMatch = edgeKey.every(edge => layout.edgeKey.indexOf(edge) !== -1);
      if (!edgeKeyMatch) {
        return false;
      }

      return true;
    });
  }

  cachePositions (nodeKey, edgeKey, positions) {
    // mark7 TODO
    this.cache.push({
      nodeKey: nodeKey,
      edgeKey: edgeKey,
      positions: positions
    });
  }

  layoutPositions (graph, positions) {
    graph.nodes.forEach((node) => {
      if (positions[node.name]) {
        node.updatePosition(positions[node.name]);
      }
    });
  }
  /*
    排版单线程版本 用于调试
    TODO
  */
  run (graph, dimensions, layoutComplete) { 
    
    const workerGraph = {
      nodes: _.map(graph.nodes, node => ({ name: node.getName(), position: node.position, size: node.size, weight: node.depth,metadata: node.metadata,aggregationId:node.aggregationId,Aggregation:node.Aggregation})),
      edges: _.map(graph.connections, connection => ({ source: connection.source.getName(), target: connection.target.getName() })),
    };
    const LTRTreeLayouter = require('./ltrTreeLayouter')
    const  ltrTreeLayouter = new LTRTreeLayouter();
    let nodePositions = ltrTreeLayouter.layout({ graph: workerGraph, dimensions: dimensions, entryNode: graph.entryNode, options: graph.options });
    const halfWidth = dimensions.width / 2;
    const halfHeight = dimensions.height / 2;
    let nodeName;
    for (nodeName in nodePositions) {
      if ({}.hasOwnProperty.call(nodePositions, nodeName)) {
        nodePositions[nodeName].x -= halfWidth;
        nodePositions[nodeName].y -= halfHeight;
      }
    }
    this.layoutPositions(graph, nodePositions);
    layoutComplete();
  }


  /*
    多线程的版本 目前先关掉 绘图功能暂时不影响速度
  */
  __run (graph, dimensions, layoutComplete) {
    const workerGraph = {
      nodes: _.map(graph.nodes, node => ({ name: node.getName(), position: node.position, size: node.size, weight: node.depth, metadata: node.metadata })),
      edges: _.map(graph.connections, connection => ({ source: connection.source.getName(), target: connection.target.getName() }))
    };
    const edgeKey = workerGraph.edges.map(edge => edge.source + edge.target).sort();
    const nodeKey = workerGraph.nodes.map(node => node.name).sort();
    const existingPositions = null;// this.findPositions(nodeKey, edgeKey);
    if (existingPositions) {
      this.layoutPositions(graph, existingPositions);
      layoutComplete();
    } else {
      const layoutWorker = LayoutWorker();
      const layoutWorkerComplete = (event) => {
        //TODO 内存泄漏
        //this.cachePositions(nodeKey, edgeKey, event.data);
        this.layoutPositions(graph, event.data);
        layoutComplete();
        layoutWorker.removeEventListener('message', layoutWorkerComplete);
      };
      layoutWorker.addEventListener('message', layoutWorkerComplete);

      layoutWorker.postMessage({ graph: workerGraph, dimensions: dimensions, entryNode: graph.entryNode, options: graph.options });
    }
  }
}

export default EvaLTRTreeLayout;
