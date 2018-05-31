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
/* eslint no-restricted-syntax: 0 */
import Graph from './GroupGraph';
import AcyclicFAS from './acyclicFAS';
import Ranker from './ranker';

const weightSort = function (a, b) {
  if (a.weight === b.weight) { return 0; }
  if (a.weight === undefined || a.weight < b.weight) { return 1; }
  return -1;
};

(function () {
  const GroupLayouterWorker = (function () {
    const GroupLayouterWorker = function () {};
    // TODO: Make layout deterministic

    function sortNodesByDepth (graph) {
      // Build the map of nodes to their levels
      let nodesSortedByDepth = [];
      let index;
   
      for (index in graph.nodes) {
        if ({}.hasOwnProperty.call(graph.nodes, index)) {
          const node = graph.nodes[index];
        
          nodesSortedByDepth[node.rank] = nodesSortedByDepth[node.rank] || [];
          nodesSortedByDepth[node.rank].push(node);
        }
      }

      // Remove empty ranks (and normalize to base 0)
      nodesSortedByDepth = nodesSortedByDepth.reduce((a, n) => { a.push(n); return a; }, []);
      const maxNodesPerDepth = 30;
      for (let i = 0; i < nodesSortedByDepth.length; i++) {
        const nodesInDepth = nodesSortedByDepth[i];
        if (nodesInDepth.length > maxNodesPerDepth) {
          const nodesToKeep = Math.min((nodesInDepth.length / 2) - 1, maxNodesPerDepth);
          const newNodeDepth = nodesInDepth.splice(nodesToKeep);
          nodesSortedByDepth.splice(i + 1, 0, newNodeDepth);
        }
      }

      return nodesSortedByDepth;
    }

    function sortNodesWithinDepth (nodesSortedByDepth) {
      for (let i = 0; i < nodesSortedByDepth.length; i++) {
        const nodesAtDepth = nodesSortedByDepth[i];
        const newNodesAtDepth = [];
        nodesAtDepth.sort(weightSort);

        // Heaviest in the middle, lightest to the outside
        for (let j = nodesAtDepth.length - 1; j >= 0; j--) {
            newNodesAtDepth.unshift(nodesAtDepth[j]); 
        }
        nodesSortedByDepth[i] = newNodesAtDepth;
      }
    }

    function positionNodes (nodesSortedByDepth, dimensions) {
      const nodePositions = {};
      let lastYDelta = 0;
      let yOffset = -35;

      function setPositions (column, nodesAtDepth, xDelta) {
       
        const curXDelta = xDelta * column;
        const yDelta = dimensions.height / (nodesAtDepth.length + 1);
        const needsYOffset = yDelta < lastYDelta ? lastYDelta % yDelta < 1 : yDelta % lastYDelta < 1;
        if (needsYOffset) { yOffset = -yOffset; }
        for (let j = 0; j < nodesAtDepth.length; j++) {
          const curYDelta = (yDelta * (j + 1)) + (needsYOffset ? yOffset : 0);
          nodePositions[nodesAtDepth[j].name] = { x: curXDelta, y: curYDelta };
        }

        lastYDelta = yDelta;
      }

      let xDelta;
      if (nodesSortedByDepth.length === 1) {
        xDelta = dimensions.width / 2;
        setPositions(1, nodesSortedByDepth[0], xDelta);
      } else {
        xDelta = dimensions.width / (nodesSortedByDepth.length - 1);
        for (let i = 0; i < nodesSortedByDepth.length; i++) {
          setPositions(i, nodesSortedByDepth[i], xDelta);
        }
      }
      return nodePositions;
    }

    /*
      layout  得到一共介个组别
          1、得到每个组别
          2、确定每个组别的长宽高
                1、如果分组太多，则设置最小的长宽 然后根据条件 来分割屏幕 每组最多三个 

          3、得到每组的节点进行排列
              1、首先确定每组的进入节点
              2、根据节点生成最大深度
              3、根据深度来分割每组位置
              4、循环链接按照最大深度计算
              5、将深度一样的节点坐落到不同的
    */
    GroupLayouterWorker.prototype.layout = function (data) {
      const options = data.options || {};
      const graph = new Graph(data.graph.nodes, data.graph.edges);

      graph.removeSameEdges(); // 删除相同链接
      AcyclicFAS.remove(graph); // 删除循环的链接
      Ranker.longestPathRanking(graph); // Run a longest path algorithm to build a layout baseline
      // TODO: Rank the nodes from the dropped same edges...

      AcyclicFAS.restore(graph); // Restore acyclic links
      graph.restoreSameEdges(); // Replace edges that have same source and target

      Ranker.normalizeRanks(graph); // Normalize node ranks to be 0++
      


      const nodesSortedByDepth = sortNodesByDepth(graph);
   
      sortNodesWithinDepth(nodesSortedByDepth);
      const nodePositions = positionNodes(nodesSortedByDepth, data.dimensions);
      return nodePositions;
    };

    return GroupLayouterWorker;
  }());

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = GroupLayouterWorker;
  } else if (self !== undefined) {
    self.GroupLayouterWorker = GroupLayouterWorker;
  } else {
    window.GroupLayouterWorker = GroupLayouterWorker;
  }
}());

