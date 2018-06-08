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
import chroma from 'chroma-js';

import * as THREE from 'three';
import BaseView from './baseView';
import GlobalStyles from '../globalStyles';
import Constants from './constants';
import ShapesFactory from './ShapesFactory';
import './shapes/CommonShapes';

class NodeView extends BaseView {
  constructor (node) {
    super(node);
    this.loaded = node.loaded;

    this.depth = 5;

    this.donutInternalColor = GlobalStyles.rgba.colorDonutInternalColor;
    this.donutInternalColorThree = new THREE.Color(this.donutInternalColor.r, this.donutInternalColor.g, this.donutInternalColor.b);
    this.borderColor = GlobalStyles.getColorTrafficRGBA(node.getClass());
    this.shape = ShapesFactory.getShape(node);
    // if(this.shape){
    //   console.log("node.view.shape.material",this.shape.material)
    //   this.borderMaterial = this.shape.bordermaterial
    //   this.innerCircleMaterial = this.shape.material
    // }else{
    //   console.log("not exit")
    //   this.borderMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(this.borderColor.r, this.borderColor.g, this.borderColor.b), transparent: true, opacity: this.borderColor.a });
    //   this.innerCircleMaterial = new THREE.MeshBasicMaterial({ color: this.donutInternalColorThree,transparent :true});
    // }
    this.borderMaterial = this.shape.outerborder_material;
    this.innerCircleMaterial = this.shape.innergeometry_material;
  }

  setOpacity (opacity,focused) {

    if(!focused && this.object && this.object.fixedOpacityValue > 0){
      opacity = this.object.fixedOpacityValue
    }

    super.setOpacity(opacity);
    this.innerCircleMaterial.opacity = opacity * this.borderColor.a;
    this.borderMaterial.opacity = opacity * this.borderColor.a;
    // Fade the inner node color to background color since setting opacity will show the particles hiding behind the node.
    if (!this.highlight) {
      this.innerCircleMaterial.color.setStyle(chroma.mix(GlobalStyles.styles.colorPageBackground, GlobalStyles.styles.colorDonutInternalColor, opacity).css());
      this.borderMaterial.color.setStyle(chroma.mix(GlobalStyles.styles.colorDonutInternalColor, GlobalStyles.styles.colorDonutInternalColor, opacity).css());
      this.meshes.innerCircle.geometry.colorsNeedUpdate = true;
    }
    if (opacity === 1) {
      this.refresh(true);
    }
    if (this.nameView) {
      this.nameView.setOpacity(opacity);
    }
  }

  getOpacity () {
    return this.borderMaterial.opacity;
  }

  getDepth () {
    return this.depth;
  }

  setHighlight (highlight) {
    if (this.highlight !== highlight) {
      this.highlight = highlight;
      if (this.nameView) {
        this.nameView.setHighlight(highlight);
      }
      this.refresh(true);
      this.updatePosition();
    }
    return this.highlight
  }

  // separate refresh just for focused since it's a good subset of refresh
  refreshFocused () {
    if (this.nameView) {
      this.nameView.refresh();
    }
  }

  refresh (force) {
    // Refresh class
    if (this.object.classInvalidated || force) {
      this.object.classInvalidated = false;
      const nodeClass = this.object.getClass();
      const borderColor = GlobalStyles.getColorTrafficRGBA(nodeClass, this.highlight);
      if (this.highlight) {
        this.innerCircleMaterial.color.setRGB(borderColor.r, borderColor.g, borderColor.b);
        this.meshes.innerCircle.geometry.colorsNeedUpdate = true;
        this.borderMaterial.color.setRGB(borderColor.r, borderColor.g, borderColor.b);
        this.meshes.outerBorder.geometry.colorsNeedUpdate = true;
        if (this.meshes.innerBorder) { this.meshes.innerBorder.geometry.colorsNeedUpdate = true; }
      } else {
        if (this.getOpacity() === 1) {
          const borderColorInshape = this.shape.getShapeColor(this.object, this.highlight);
          this.innerCircleMaterial.color.setRGB(borderColorInshape.r, borderColorInshape.g, borderColorInshape.b);
          this.meshes.innerCircle.geometry.colorsNeedUpdate = true;
          this.borderMaterial.color.setRGB(borderColor.r, borderColor.g, borderColor.b);
        }

        if (this.meshes.innerBorder) {
          this.meshes.innerBorder.geometry.colorsNeedUpdate = true;
        }
      }
      if (this.nameView) {
        this.nameView.refresh();
      }
    }
  }

  update () {
    // No default update function for the view...
  }

  updatePosition () {
    if (this.object.position) {
      const x = this.object.position.x;
      const y = this.object.position.y;
      let z = 0;

      if (this.object.depth !== undefined) {
        z = this.dimmed ? Constants.DEPTH.dimmedNode : Constants.DEPTH.normalNode;
        if (this.object.getClass() === 'normal') {
          z -= (this.object.depth * 10);
        } else {
          z += (this.object.depth * 20);
        }
      }

      this.container.position.set(x, y, z);
    }
    this.updateLabelPosition();
  }

  updateLabelPosition () {
    if (this.nameView) {
      this._showLabel(this.labelDefaultVisible || this.forceLabel || this.object.forceLabel);
      this.nameView.updatePosition();
    }
  }

  updateText () {
    // No text update function for the default view
  }

  resetDefaultLabelPosition () {
    if (this.object.position) {
      this.labelPositionLeft = this.object.position.x < 1;
    } else {
      this.labelPositionLeft = true;
    }
  }

  setDimmed (dimmed, dimmingApplied) {
    // Show/hide nodeLabel if necessary
    if (this.object.isVisible() && !this.labelDefaultVisible) {
      this.forceLabel = !dimmed && dimmingApplied;
    }
    return super.setDimmed(dimmed, dimmingApplied);
  }

  applyLabelPosition () {
    if (this.nameView) {
      this.nameView.applyPosition();
    }
  }

  showLabel (show) {
    if (this.nameView && this.labelDefaultVisible !== show) {
      this.labelDefaultVisible = show;
      this._showLabel(show);
    }
  }

  _showLabel (show) {
    if (this.nameView) {
      if (show) {
        this.labelVisible = true;
        this.addInteractiveChildren(this.nameView.getInteractiveChildren());
        this.container.add(this.nameView.container);
      } else {
        this.labelVisible = false;
        this.removeInteractiveChildren(this.nameView.getInteractiveChildren());
        this.container.remove(this.nameView.container);
      }
    }
  }

  getLabelScreenDimensions () {
    if (!this.nameView) { return undefined; }
    return this.nameView.screenDimensions;
  }

  setLabelScreenDimensions (dimensions) {
    if (this.nameView) {
      this.nameView.screenDimensions = dimensions;
    }
  }

  cleanup () {
    if (this.nameView) { this.nameView.cleanup(); }
    if(this.shape) {this.shape.cleanup()}
    this.borderMaterial.dispose();
    this.innerCircleMaterial.dispose();
  }

  static getOuterBorderGeometry (radius) {
    return getOrSet(NodeView.outerBorderGeometries, radius, () => {
      const border = new THREE.Shape();
      border.absarc(0, 0, radius + 2, 0, Math.PI * 2, false);
      const borderHole = new THREE.Path();
      borderHole.absarc(0, 0, radius, 0, Math.PI * 2, true);
      border.holes.push(borderHole);
      return new THREE.ShapeGeometry(border, NodeView.curveSegments);
    });
  }

  static getInnerCircleGeometry (radius) {
    return getOrSet(NodeView.innerCircleGeometries, radius, () => {
      const circleShape = new THREE.Shape();
      circleShape.moveTo(radius, 0);
      circleShape.absarc(0, 0, radius, 0, 2 * Math.PI, false);
      return new THREE.ShapeGeometry(circleShape, NodeView.curveSegments);
    });
  }

  static getInnerBorderGeometry (radius) {
    return getOrSet(NodeView.innerBorderGeometries, radius, () => {
      const innerBorder = new THREE.Shape();
      innerBorder.absarc(0, 0, radius, 0, Math.PI * 2, false);
      const innerBorderHole = new THREE.Path();
      innerBorderHole.absarc(0, 0, radius - 2, 0, Math.PI * 2, true);
      innerBorder.holes.push(innerBorderHole);
      return new THREE.ShapeGeometry(innerBorder, NodeView.curveSegments);
    });
  }

  static getDonutGeometry (radius, innerRadius) {
    return getOrSet(NodeView.donutGeometries, `${radius}:${innerRadius}`, () => {
      const arcShape = new THREE.Shape();
      arcShape.absarc(0, 0, radius, 0, Math.PI * 2, false);
      const holePath = new THREE.Path();
      holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
      arcShape.holes.push(holePath);
      return new THREE.ShapeGeometry(arcShape, NodeView.curveSegments);
    });
  }

  static getNoticeDotGeometry (radius) {
    return getOrSet(NodeView.noticeDotGeometries, radius, () => {
      const noticeShape = new THREE.Shape();
      const dotRadius = radius * 0.5;
      noticeShape.moveTo(dotRadius, 0);
      noticeShape.absarc(0, 0, dotRadius, 0, 2 * Math.PI, false);
      return new THREE.ShapeGeometry(noticeShape, NodeView.curveSegments);
    });
  }
}

NodeView.curveSegments = 32;
NodeView.outerBorderGeometries = {};
NodeView.innerCircleGeometries = {};
NodeView.innerBorderGeometries = {};
NodeView.donutGeometries = {};
NodeView.noticeDotGeometries = {};


function getOrSet (obj, key, func) {
  let result = obj[key];
  if (result === undefined) {
    result = func();
    obj[key] = result;
  }
  return result;
}

export default NodeView;
