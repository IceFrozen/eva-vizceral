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

const minimumLength = 1;

function longestPathRanking (graph) {
  const visited = {};
  const visited2 = [];

  function dfs (nodeName) {
    const node = graph.getNode(nodeName);
    if (!node) { return undefined; }
    if (!_.has(visited, nodeName)) {
      visited[nodeName] = true;

      let rank = _.max(_.map(graph.outgoingEdges(nodeName), edge => dfs(edge.target) - minimumLength));
      if (rank === undefined) {
        rank = 0;
      }
      node.rank = rank;
    }
    return node.rank;
  }
  let resultFinal = []
  
  function dfs2(nodename,top) {

      const node = graph.getNode(nodename);
      let result = _.filter(graph.outgoingEdges(nodename), edge => edge.source == nodename)
      .map(edge => edge.target)
      
      if(!top) {
        top = [nodename]
      }
      
      for(let i =0;i< result.length;i++) {
          let resultTop = _.cloneDeep(top)
          resultTop.push(result[i])
          dfs2(result[i],resultTop)
      }
      if(result.length === 0) {
        resultFinal.push(top)
      }
  }

  _.each(graph.entryNodes(), nodeName=> dfs2(nodeName));
  
  //console.log("resultFinal",resultFinal)

  resultFinal.sort(function (item1,item2) {
    return item1.length<item2.length
  })
  //找出最长的排序


  const groupMap = {}
  resultFinal.forEach(array => {  
      for(let i = 0; i < array.length;i++){
        let nodename = array[i]
        const node = graph.getNode(nodename);
        let groupId = node.groupId
        let rank = i
        if(groupMap[groupId] == null){
            groupMap[groupId] = rank
        }else{
          rank = groupMap[groupId]
        }
        if(i != 0) {
          const parentNode = graph.getNode(array[i-1])
          if(parentNode) {
            if(rank < parentNode.rank + 1){
              rank = parentNode.rank + 1
            }
          }
        }
        node.rank = rank
      }
  })
  //console.log(groupMap)
}

function normalizeRanks (graph) {
  // for (let i = 0; i < graph.nodes.length; i++) {
  //   console.log(graph.nodes[i].name,graph.nodes[i].rank,graph.nodes[i].groupId)
  // }
  return
  let group = {}
  let maxRank = {}
  for (let i = 0; i < graph.nodes.length; i++) {
      let groupId = graph.nodes[i].groupId
      let node = graph.nodes[i]
      if(!groupId){
        continue;
      }

      if(group[groupId] === undefined){
          maxRank[groupId] = -1
      } 
      group[groupId] = []
      group[groupId].push(graph.nodes[i])
      if(maxRank[groupId] < node.rank){
        maxRank[groupId]  = node.rank
      }
  }

  for(const key in group) {
      let nodes  = group[key]
      _.each(nodes,(node)=>{
        let groupId = node.groupId
        let maxRankLevel = maxRank[groupId]
        if(!groupId || maxRankLevel === undefined) {
          return 
        }
        if(node.rank < maxRankLevel){
          node.rank = maxRankLevel
        }
      })
     
  } 
  // let i;
  // let lowestRank = Infinity;
  // // First make the ranks positive
  // for (i = 0; i < graph.nodes.length; i++) {
  //   if (graph.nodes[i].rank < lowestRank) {
  //     lowestRank = graph.nodes[i].rank;
  //   }
  // }
  // for (i = 0; i < graph.nodes.length; i++) {
  //   graph.nodes[i].rank -= lowestRank;
  // }
}
function forcePrimaryRankPromotions (graph, entryNodeName = 'INTERNET') {
  let entryNodes = graph.entryNodes();
  if (entryNodeName) {
    if (entryNodes.includes(entryNodeName)) {
      entryNodes = [entryNodeName];
    }
  }
  for (let i = 0; i < entryNodes.length; i++) {
    const entryNode = graph.getNode(entryNodes[i]);
    //entryNode.rank = 0;
  }
}

function forceSecondaryRankPromotions (graph, entryNodeName = 'INTERNET') {
  let entryNodes = graph.entryNodes();
  if (entryNodeName) {
    if (entryNodes.includes(entryNodeName)) {
      entryNodes = [entryNodeName];
    }
  }
  for (let i = 0; i < entryNodes.length; i++) {
    const outgoingNodes = graph.outgoingNodes(entryNodes[i]);
    for (let j = 0; j < outgoingNodes.length; j++) {
      const node = graph.getNode(outgoingNodes[j]);
      //node.rank = 1;
    }
  }
}

module.exports = {
  longestPathRanking: longestPathRanking,
  normalizeRanks: normalizeRanks,
  forcePrimaryRankPromotions: forcePrimaryRankPromotions,
  forceSecondaryRankPromotions: forceSecondaryRankPromotions
};
