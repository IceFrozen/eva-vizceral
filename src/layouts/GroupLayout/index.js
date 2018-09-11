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
import Group from './Group';
const GroupLayouterWorker = require('./GroupLayouterWorker')



class GroupTreeLayout {
  constructor () {}
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

    let GroupInfos = graph.parent.data.GroupInfo
    let groupInfos = _.toArray(_.groupBy(GroupInfos,(groupInfo)=> groupInfo.order))    
    let chukNumber = _.maxBy(groupInfos,"length")[0].order

    let groupIndex = 0
    const offsetX = 10
    const offsetY = 10
    //dimensions  长度 和宽度
    let groups =  _.uniq(graph.allNodes.filter((node)=>node.groupId).map((node)=>node.groupId))
   
    let groupMap = _.groupBy(graph.allNodes,(node)=>node.groupId)
    const groupNumber = Math.ceil(groupInfos.length)

    const chunk = groupInfos //_.chunk(groups, chukNumber);
    //const chunk2 =_.chunk(groups, chukNumber);

    // 每一段长
    const everyGroupLength = (dimensions.graphWidth / groupNumber)
    const startPoint = -(dimensions.graphWidth)/2
    const startYPoint = dimensions.graphHeight/2
    const groupsObject = []
    for(let i =0 ;i < groupInfos.length;i++) {
      // Y 坐标
      const group = chunk[i]
      const startX = startPoint + everyGroupLength * i - offsetX
      const stepY_length = dimensions.graphHeight/group.length
      for(let j =0 ;j < group.length;j++) {
          const groupId = group[j].name
          const startY = startYPoint - stepY_length * j - offsetY
          const g = new Group(groupId,{x:startX,y:startY},everyGroupLength - offsetX,stepY_length - offsetY,{offsetX,offsetY})
          g.setGroupIndex(i,j)
          g.setNodes(groupMap[groupId])
          g.setConnections(graph.connections)
          groupsObject.push(g)
      }
    }
    layoutComplete(groupsObject);
  }
}

export default GroupTreeLayout;
