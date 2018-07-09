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
import * as THREE from 'three';

import BaseView from '../../base/baseView';
import GlobalStyles from '../../globalStyles';
import GroupConnection from './GroupConnection';
import GroupNode from './GroupNode';
function roundRect (context, x, y, w, h, radius, strokeColor, fillColor) {
  const r = x + w;
  const b = y + h;
  context.beginPath();
  context.strokeStyle = strokeColor;
  context.lineWidth = 2;
  context.moveTo(x + radius, y);
  context.lineTo(r - radius, y);
  context.quadraticCurveTo(r, y, r, y + radius);
  context.lineTo(r, (y + h) - radius);
  context.quadraticCurveTo(r, b, r - radius, b);
  context.lineTo(x + radius, b);
  context.quadraticCurveTo(x, b, x, b - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.fillStyle = fillColor;
  context.closePath();
  context.fill();
  context.stroke();
}

class GroupInfo extends BaseView {
  constructor (nodeView) {
    super(nodeView.object);
    this.fixedWidth = true;
    this.nodeName = "test"
    this.nodeView = nodeView;
    this.lines = []
    this.borderOffset = 30
    this.groupNodes = {}
    this.lineMapToGropuId = {}
    this.areaMapToNameView = {}
    this.groups = []
    this.keyLocation = {}
    this.interactiveLineMaterial = new THREE.LineBasicMaterial({
      depthTest: true,
      depthWrite: false,
      transparent: true,
      opacity: 0.3,
      color: 0xfffff1 
    });
    this.nodeView.container.add(this.container);
    this.updateArea()
  }
  setGroupInfo (groups) {
    this.groups  = groups
    groups.forEach((group)=>group.layoutPosition())


  }

  getDisplayName (getDefault) {
    return this.nodeName
  }
  updateArea () {
    if(this.groups.length == 0) {
      return 
    }
    /*
      1、这里微调 节点和节点直接的覆盖
    */
    let allNodes = _.flattenDeep(this.groups.map((group) => group.nodes));
    let connections = _.uniq(_.flattenDeep(this.groups.map((group)=>group.connections)))
    let xDirect =  _.groupBy(allNodes, node=>node.position.x)
    let yDirect =  _.groupBy(allNodes, node=>node.position.y)
    
    _.each(xDirect,(nodes,key)=>{
      if(nodes.length <=2 ){
        return 
      }
      let sortNodes =  _.sortBy(nodes, [function(node) { return node.position.y }])
      /*
        找出排序后
      */
      sortNodes.reverse()
      let nodeMap = _.groupBy(sortNodes, node=>node.name)
      let indexArray = []
      for(let i = 0 ; i < sortNodes.length;i++) {
        let sourceTarget = sortNodes[i]
        // 找到跟这个节点相关的节点
        const filterConnection = connections.filter(connection => {
            if(connection.source.name == sourceTarget.name) {
              return nodeMap[connection.target.name]
            }
            if(connection.target.name == sourceTarget.name) {
              return nodeMap[connection.source.name]
            }
        }).forEach(c => {
            let source = c.source;
            let target = c.target;
            indexArray.push(_.findIndex(sortNodes, function(node) { return node.name == source.name; }));
            indexArray.push( _.findIndex(sortNodes, function(node) { return node.name == target.name; }));
        })
      }
      if(indexArray.length == 0) {
        return 
      }
      //处理函数
      let min = _.min(indexArray)
      let max  = _.max(indexArray)
      if((max - min )<=1) {
        return 
      }
      for(let i = min+1;i<max;i++) {
        let n = sortNodes[i]
        let offerDir =i %2?1:-1
        n.position.x += (offerDir) * (30 +(i*10))
      }
    })
    
    this.cleanLine()
    _.forEach(this.groups,(group)=>{
      this.genArea(group.getGroupId(),group.getStartPoint(),group.getWidth(),group.getHeight())
    })
  }
  updateLabel () {
   
  }

  applyPosition () {
    let x;
    const y = 0;
    x = 0 + (this.labelWidth / 2) + this.buffer;
    this.container.position.set(x, y, 1);
  }

  setHighlight (highlight) {
    //this.highlight = highlight;
  }

  refresh () {
    this.updateLabel();
  }

  setOpacity (opacity) {
    super.setOpacity(opacity);
  } 
  // 排序node 找出各个地方的起点和重点
  sortNodes () {

  }
  getDisplayName (groupId) {
    return  groupId
  }

  getGroupByGroupId (groupId) {
     return this.groups.find((group)=> group.getGroupId() == groupId)
  }

  /*
    生成机房信息
  */
  genDecText (groupId) {
    this.cleanNameViewById(groupId)
    const group = this.getGroupByGroupId(groupId)
    if(!group) {
      console.warn("groupId:"+ groupId +' information is not exist ')
      return 
    }
    const nameCanvas = this.nodeView.createCanvas(256, 32);
    const nameTexture = new THREE.Texture(nameCanvas);
    const materialClone = new THREE.MeshBasicMaterial({ map: nameTexture, side: THREE.DoubleSide, transparent: true });
    const geometry = new THREE.PlaneBufferGeometry(200, 30)

    const nameOfferset = { x:60, y:-30 }   //调整文字的位置 使之进入框内

    const startPoint_x = group.getStartPoint().x + nameOfferset.x
    const startPoint_y = group.getStartPoint().y + nameOfferset.y
    const mess = this.addChildElement(geometry, materialClone);
    const context = nameCanvas.getContext('2d');
    // TODO 这里调整 字体大小
    const fontSize = this.fixedWidth ? 30 : 30;
    const font = `${fontSize}px 'Source Sans Pro', sans-serif`;
    context.font = font;
    // Label Width
    this.defaultLabelWidth = this.fixedWidth ? 256 : context.measureText(this.getDisplayName(groupId)).width + 16;
    const labelWidth = this.fixedWidth ? 256 : context.measureText(this.getDisplayName(groupId)).width + 16;
    this.resizeCanvas(nameCanvas, labelWidth, 32);

    // label color
    const labelColor = GlobalStyles.getColorTraffic('normal');
    roundRect(context, startPoint_x, startPoint_y, nameCanvas.width / 2, nameCanvas.height / 2, 3, GlobalStyles.styles.colorLabelBorder, labelColor);
    //context.fillStyle = GlobalStyles.styles.colorLabelText;
    context.fillText(this.getDisplayName(groupId), nameCanvas.width / 2, nameCanvas.height / 2);
   
    this.areaMapToNameView[groupId] ={
      mess:mess,
      geometry:geometry,
      material:materialClone,
      texture:nameTexture,
      canvas:nameCanvas
    }
   
    mess.position.x = startPoint_x
    mess.position.y = startPoint_y + nameCanvas.height/2 
    nameTexture.needsUpdate = true;
    return mess
  }

  cleanNameView (groupId) {
    _.forEach(this.areaMapToNameView,(item,groupId)=>{
        item.geometry.dispose()
        item.material.dispose()
        item.texture.dispose()
        this.container.remove(item.mess)
    })
  }

  cleanNameViewById (groupId) {
    if(this.areaMapToNameView[groupId]){
      this.areaMapToNameView[groupId].geometry.dispose()
      this.areaMapToNameView[groupId].material.dispose()
      this.areaMapToNameView[groupId].texture.dispose()
      this.container.remove(this.areaMapToNameView[groupId].mess)
    }
  } 
  /*
    生成机房的图
  */
  genArea (groupId,startPointObject,width,height) {
    const left_up_point = new THREE.Vector3(startPointObject.x,startPointObject.y, -9999)
    const right_up_point = new THREE.Vector3(startPointObject.x + width,startPointObject.y, -9999)
    const left_down_point = new THREE.Vector3(startPointObject.x,startPointObject.y - height, -9999)
    const right_down_point = new THREE.Vector3(startPointObject.x + width,startPointObject.y - height, -9999)
    const upline = this.genLine(left_up_point,right_up_point)
    const leftline = this.genLine(left_up_point,left_down_point)
    const downline = this.genLine(left_down_point,right_down_point)
    const rightline = this.genLine(right_up_point,right_down_point)
    this.container.add(rightline);
    this.container.add(leftline);
    this.container.add(downline);
    this.container.add(upline);
    this.genDecText(groupId)
    this.lineMapToGropuId[groupId]=[upline.uuid,leftline.uuid,downline.uuid,rightline.uuid]
  }

  cleanLine () {
    for(let i = 0; i< this.lines.length;i++) {
      this.container.remove(this.lines[i])
      this.lines[i].material.dispose()
      this.lines[i].geometry.dispose()
    }

    this.cleanNameView()

    this.interactiveLineMaterial.dispose()
    //this.material.dispose()
    this.lines = []
    this.interactiveChildren = []
    this.interactiveLine = []
    this.groupNodes = {}
    this.lineMapToGropuId = {}
  }
  /*
    鼠标移动到某个上边
  */
  highlight(mouseOnObject) {

    let nodes = []

    const filter = (connection) => {
      if(!connection){
        return 
      }
      if(connection.source){
        nodes.push(connection.source)
      }
      if(connection.target){
        nodes.push(connection.target)
      }
    }
    if(mouseOnObject instanceof GroupNode){
        nodes.push(mouseOnObject)
        _.each(mouseOnObject.outgoingConnections,filter)
        _.each(mouseOnObject.incomingConnections,filter)
    }else if(mouseOnObject instanceof GroupConnection){
        filter(mouseOnObject)
    }else {
      nodes = []
    }
    nodes = _.uniq(nodes.filter((node)=>node.groupId).map((node)=>node.groupId))
    this._hightlingArea(nodes)
  }

  _hightlingArea (groupIds) {
    let self = this
    _.forEach(this.lineMapToGropuId,(uuids,groupId)=>{
        if(groupIds.includes(groupId)){
          self._hightlingLine(uuids,true)
        }else{
          self._hightlingLine(uuids,false)
        }
    })
    _.forEach(this.areaMapToNameView,(view,groupId)=>{
      if(groupIds.length == 0) {
        view.material.opacity = 1
        return 
      }
      if(groupIds.includes(groupId)){
        view.material.opacity = 1
      }else{
        view.material.opacity = 0.3
      }
    })
  }
  _hightlingLine (uuids,hight) {
    let opacity = 2
    let transparent = hight
    if(!hight) {
      opacity = 0.3
    }
    _.each(this.lines,(line)=> {
        if(uuids.includes(line.uuid)){
          line.material.transparent = !transparent
          line.material.opacity  = opacity
        }
    })
  }

  // 节点高亮
  highlightObject() {
    console.log('i am hight in Group')  
  }
  /*
    生成线
  */
  genLine (startPoint,endPoint) {
    const interactiveLineGeometry = new THREE.Geometry();
    const interactiveLine = new THREE.Line(interactiveLineGeometry, this.interactiveLineMaterial.clone());
    interactiveLine.geometry.vertices[0] = startPoint;
    interactiveLine.geometry.vertices[1] = endPoint;
    this.lines.push(interactiveLine)
    this.addInteractiveChild(interactiveLine);
    return interactiveLine
  }

  cleanup () {
     for(let i = 0; i< this.lines.length;i++) {
      this.lines[i].material.dispose()
      this.lines[i].geometry.dispose()
    }
    _.forEach(this.areaMapToNameView,(item,groupId)=>{
        item.geometry.dispose()
        item.material.dispose()
        item.texture.dispose()
    })
    this.interactiveLineMaterial.dispose()
  }
}

export default GroupInfo;
