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
import AggregationConnection from './AggregationConnection';
import AggregationNode from './AggregationNode';
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

class AggregationInfo extends BaseView {
  constructor (nodeView) {
    super(nodeView.object);
    this.fixedWidth = true;
    this.nodeName = "test"
    this.nodeView = nodeView;
    this.lines = []
    this.buffer = Math.max(0 * 0.3, 25);
    this.color2 = new THREE.Color( 0xFF0000 );
    this.borderOffset = 30
    this.groupNodes = {}
    this.lineMapToGropuId = {}
    // Create the canvas to build a sprite
    // 说明
    this.keyLocation = {}
    //this.nameCanvas = this.nodeView.createCanvas(200, this.fontSize + 10);
    //this.nameTexture = new THREE.Texture(this.nameCanvas);
    // this.nameTexture.minFilter = THREE.LinearFilter;
    //this.updateLabel();
    this.interactiveLineMaterial = new THREE.LineBasicMaterial({
      depthTest: true,
      depthWrite: false,
      transparent: true,
      opacity: 0.3,
      color: 0xfffff1 
    });
    this.nodeView.container.add(this.container);
    this.material = new THREE.MeshBasicMaterial({transparent: true })
    //this.view = this.nodeView.addChildElement(new THREE.CubeGeometry(250, 350, 0), this.material);
    this.updateArea()

  
  }

  getDisplayName (getDefault) {
    return this.nodeName
  }
  updateArea () {
    const canDraw = this.sortNodes()
    this.cleanLine()
    if(!canDraw) {
      return 
    }
    _.forEach(this.keyLocation,(location,key)=>{
      this.genArea(key,{x:location.left[0],y:location.left[1]},location.width,location.height)
    })
  }
  updateLabel () {
    //情况说明
    //情况线
 


    // if (this.view) {
    //   this.applyPosition(100,100,100);
    //   this.view.scale.x = this.labelWidth / this.defaultLabelWidth;
    //   this.view.geometry.width = this.nameCanvas.width;
    //   this.view.geometry.height = this.nameCanvas.height;
    //   this.view.geometry.needsUpdate = true;
    // }
  }

  // updatePosition () {
  //   // Update the bounding box
  //   this.boundingBox = {};
  //   // Add a little bit of fuzziness to the label height since we don't care if it overlaps a little...
  //   const yDelta = (this.nameCanvas.height * 0.6) / 2;
  //   this.boundingBox.top = - yDelta;
  //   this.boundingBox.bottom =  yDelta;
  //   if (this.nodeView.labelPositionLeft) {
  //     this.boundingBox.right =  - this.buffer;
  //     this.boundingBox.left = this.boundingBox.right - this.nameCanvas.width;
  //   } else {
  //     this.boundingBox.left =  this.buffer;
  //     this.boundingBox.right = this.boundingBox.left + this.nameCanvas.width;
  //   }
  // }

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
    //找出
    const nodes = this.nodeView.trafficGraph.nodes
    // 先分组 然后根据分组找到每个分组 最大x 最大y 
    if(nodes.length === 0) {
      this.cleanLine()
      return false
    }
    const grouByFilter = (node)=>node.aggregationId
    this.groupNodes = _.groupBy(_.filter(nodes,grouByFilter),grouByFilter)
    /*
        key {
            left:[x,y]
            right:[x,y]
            witdth:|right.x - left.x|
            height |right.y - right.y
        } 

    */
    const borderOffset = 30
    this.keyLocation = {}
    _.forEach(this.groupNodes,(nodes,key)=>{ 
        let left_x = (_.minBy(nodes, (node) => node.position.x)).position.x - this.borderOffset;
        let left_y = (_.maxBy(nodes, (node) => node.position.y)).position.y + this.borderOffset;
        let right_x = (_.maxBy(nodes, (node) => node.position.x)).position.x + this.borderOffset;
        let right_y = (_.minBy(nodes, (node) => node.position.y)).position.y - this.borderOffset;
        let width = Math.abs(right_x - left_x) 
        let height  = Math.abs(right_y - left_y)
        this.keyLocation[key] = {
          left:[left_x,left_y],
          right:[right_x,right_y],
          width:width,
          height:height
        }
    })
    if(_.size(this.keyLocation) > 0) {
      return true
    }
    return false
  }
  getDisplayName () {
    return  "test"
  }
  /*
    生成机房信息
  */
  genDecText () {
    const context = this.nameCanvas.getContext('2d');
    // TODO 这里调整 字体大小
    const fontSize = this.fixedWidth ? 30 : 30;
    const font = `${fontSize}px 'Source Sans Pro', sans-serif`;
    context.font = font;
    // Label Width
    this.defaultLabelWidth = this.fixedWidth ? 260 : context.measureText(this.getDisplayName(true)).width + 16;
    const labelWidth = this.fixedWidth ? 260 : context.measureText(this.getDisplayName()).width + 16;
    if (labelWidth !== this.labelWidth) { this.labelWidth = labelWidth; }
    this.resizeCanvas(this.nameCanvas, this.labelWidth, fontSize + 10);

    // label color
    console.log(this.nameCanvas.width,this.nameCanvas.height)
    const labelColor = GlobalStyles.getColorTraffic('normal', this.highlight);
    roundRect(context, 0, 0, this.nameCanvas.width, this.nameCanvas.height, 3, GlobalStyles.styles.colorLabelBorder, labelColor);
    context.fillStyle = GlobalStyles.styles.colorLabelText;
    context.fillText(this.getDisplayName(), this.nameCanvas.width / 2, this.nameCanvas.height / 2);
    this.nameTexture.needsUpdate = true;
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
    //this.genDecText()
    this.lineMapToGropuId[groupId]=[upline.uuid,leftline.uuid,downline.uuid,rightline.uuid]
  }

  cleanLine () {
    for(let i = 0; i< this.lines.length;i++) {
      this.container.remove(this.lines[i])
      this.lines[i].material.dispose()
      this.lines[i].geometry.dispose()
    }
    this.interactiveLineMaterial.dispose()
    this.material.dispose()
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
    if(mouseOnObject instanceof AggregationNode){
        nodes.push(mouseOnObject)
        _.each(mouseOnObject.outgoingConnections,filter)
        _.each(mouseOnObject.incomingConnections,filter)
    }else if(mouseOnObject instanceof AggregationConnection){
        filter(mouseOnObject)
    }else {
      nodes = []
    }
    nodes = _.uniq(nodes.filter((node)=>node.aggregationId).map((node)=>node.aggregationId))
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
          line.material.linewidth  = opacity
        }
    })
  }

  // 节点高亮
  highlightObject() {
    console.log('i am hight in aggregation')  
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
    this.interactiveLineMaterial.dispose()
    this.material.dispose()
    this.cleanLine()
    this.nameTexture.dispose()
    this.nodeView.container.remove(this.container)
   
  }
}

export default AggregationInfo;
