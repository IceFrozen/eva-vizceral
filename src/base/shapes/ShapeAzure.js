
import * as THREE from 'three';
import GlobalStyles from '../../globalStyles';
import ShapesFactory from '../ShapesFactory';
import ShapesUtils from '../ShapesUtils';

class ShapeAzure {
  constructor (node) {
    this.customNode = {};
    this.node = node;
    this.customNode.innergeometry = this._createInnerGeometry(18, 32);
    this.customNode.outerborder = this._createOuterBorder(25, 32);
    this.customNode.innergeometry_material = this._createMaterial(node);
    this.customNode.outerborder_material = this._createMaterial(node);
    this.customNode.getShapeColor = this.getShapeColor;
    this.customNode.cleanup = this.cleanup
    return this.customNode;
  }

  _createInnerGeometry (radius, curveSegments) {
    const polyPath = [
      '0,3,14,35,23,42,14,3,0,3',
      '20,23,24,42,42,0,10,1,35,5,20,23'
    ];
    const newShapes = ShapesUtils.getShapeFromPolyPointsArray(polyPath, ',', -19, -17);
    return new THREE.ShapeGeometry(newShapes, curveSegments);

    // const polyShape = ShapesUtils.get(rawPolyString, ' ', -20, -20);
    // const holeShape = new THREE.Shape();
    // holeShape.moveTo(radius / 2, 0);
    // holeShape.absarc(6, -9, radius / 2, 0, 2 * Math.PI, false);
    // polyShape.holes.push(holeShape);
    // return new THREE.ShapeGeometry(polyShape, curveSegments);
  }

  _createOuterBorder (radius, curveSegments) {
    const border = new THREE.Shape();
    border.absarc(0, 0, radius + 2, 0, Math.PI * 2, false);
    const borderHole = new THREE.Path();
    borderHole.absarc(0, 0, radius, 0, Math.PI * 2, true);
    border.holes.push(borderHole);
    return new THREE.ShapeGeometry(border, curveSegments);
  }

  _createMaterial (node) {
    const materialColor = GlobalStyles.styles.colorTraffic[node.getClass()];
    return new THREE.MeshBasicMaterial({ color: materialColor });
  }
  getShapeColor (node, highlight) {
    const borderColor = GlobalStyles.getColorTrafficRGBA(node.getClass(), highlight);
    return borderColor;
  }

}
ShapesFactory.registerShape('azure', ShapeAzure);
export default ShapeAzure;

