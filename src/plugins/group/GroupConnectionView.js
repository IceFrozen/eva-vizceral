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

import ConnectionView from '../../base/connectionView';
import GlobalStyles from '../../globalStyles';

class GroupConnectionView extends ConnectionView {
  constructor (connection) {
    super(connection, 650, false);

    // Add the connection line
    this.lineColor = GlobalStyles.rgba.colorConnectionLine;
    this.connectionLineGeometry = new THREE.Geometry();
    this.connectionLineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(this.lineColor.r, this.lineColor.g, this.lineColor.b),
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      opacity: this.lineColor.a
    });
    this.lineType = "line"
    this.connectionLineDashedMaterial = new THREE.LineDashedMaterial({ 
        dashSize: 10, 
        gapSize: 10, 
        color: new THREE.Color(this.lineColor.r, this.lineColor.g, this.lineColor.b),
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        opacity: this.lineColor.a
    })
    //this.connectionLine = new THREE.LineSegments( this.connectionLineGeometry, new THREE.LineDashedMaterial( { color: 0xffaa00, dashSize: 30, gapSize: 10, linewidth: 2 } ) );
    this.connectionLine = new THREE.LineSegments(this.connectionLineGeometry, this.connectionLineMaterial);
    this.container.add(this.connectionLine);
    this.updatePosition();
    this.updateVolume();
    this.dashedLine()
  }

  positionConnectingLine () {
    const positon = this.getPosition()
    const start = new THREE.Vector3(positon.startPosition.x, positon.startPosition.y, this.depth - 1);
    const end = new THREE.Vector3(positon.endPosition.x, positon.endPosition.y, this.depth - 1);

    this.connectionLine.geometry.vertices[0] = start;
    this.connectionLine.geometry.vertices[1] = end;
    this.connectionLine.geometry.verticesNeedUpdate = true;
    this.connectionLine.computeLineDistances();
  }

  updatePosition (depthOnly) {
    super.updatePosition(depthOnly);
    if (this.connectionLine) {
      this.positionConnectingLine();
    }
  }

  refresh () {
    super.refresh()
    this.dashedLine()

  }

  dashedLine () {
    let total = this.object.getVolumeTotal()
    if(this.lineType == "line" && total ==0) {
       if (this.connectionLine) {
          this.connectionLine.material = this.connectionLineDashedMaterial
          this.lineType = "Dashed"
          this.connectionLine.computeLineDistances();
        }
    }else if(this.lineType == "Dashed" && total > 0){
      if (this.connectionLine) {
          this.connectionLine.material = this.connectionLineMaterial
          this.lineType = "line"
          this.connectionLine.computeLineDistances();
        }
    }

   
    const targetTotal = this.object.target.getVolumeTotal()
    const sourceTotal = this.object.source.getVolumeTotal()
    const fixedOpacity = 0.4
    if(!targetTotal){
      this.object.target.fixedOpacity(fixedOpacity)
      this.object.target.view.setOpacity(fixedOpacity)
    }else{
      this.object.target.fixedOpacity(-1)
      this.object.target.view.setOpacity(1)
    }
    if(!sourceTotal) {
      this.object.source.fixedOpacity(fixedOpacity)
      this.object.source.view.setOpacity(fixedOpacity)
    }else{
      this.object.source.fixedOpacity(-1)
      this.object.source.view.setOpacity(1)
    }
  }

  setOpacity (opacity) {
    super.setOpacity(opacity);
    this.connectionLine.material.opacity = opacity * this.lineColor.a;
  }

  cleanup () {
    super.cleanup();
    this.connectionLineGeometry.dispose();
    this.connectionLineMaterial.dispose();
    this.connectionLineDashedMaterial.dispose()
  }

  setParticleLevels () {
    super.setParticleLevels();
    this.minAvgTicksBetweenRelease = 120;
  }
}

export default GroupConnectionView;
