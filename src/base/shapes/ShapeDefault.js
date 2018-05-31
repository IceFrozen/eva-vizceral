
import * as THREE from 'three';
import GlobalStyles from '../../globalStyles';
import ShapesFactory from '../ShapesFactory';

class ShapeDefault {
  constructor (node) {
    this.customNode = {};
    this.node = node;
    this.innergeometry = this._createInnerGeometry(13, 32);
    this.outerborder = this._createOuterBorder(15, 32);
    this.innergeometry_material = this._createMaterial(node);
    this.outerborder_material = this._createMaterial(node);
  }

  cleanup () {
    //console.log("shape default clean up")
    this.innergeometry_material.dispose();
    this.outerborder_material.dispose();
    this.innergeometry.dispose()
    this.outerborder.dispose()
  }
  _createInnerGeometry (radius, curveSegments) {
    const circleShape = new THREE.Shape();
    circleShape.moveTo(radius, 0);
    circleShape.absarc(0, 0, radius, 0, 2 * Math.PI, false);
            // const holeShape = new THREE.Shape();
            // holeShape.moveTo(radius, 0);
            // holeShape.absarc(0, 0, radius-2, 0, 2 * Math.PI, false);
            // circleShape.holes.push(holeShape);
    return new THREE.ShapeGeometry(circleShape, curveSegments);
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
ShapesFactory.registerShape('default', ShapeDefault);

export default ShapeDefault;


// import * as THREE from 'three';
// import ShapesFactory from '../ShapesFactory';
// import ShapeParent from './ShapeParent';
// import NodeView from '../nodeView';

// class ShapeDefault extends ShapeParent {

//     _createInnerGeometry () {
//     return ShapeParent.getOrSet(NodeView.innerBorderGeometries, 20, () => {
//             const radius = 20
//             const curveSegments = 32;
//             const circleShape = new THREE.Shape();
//             circleShape.moveTo(radius, 0);
//             circleShape.absarc(0, 0, radius, 0, 2 * Math.PI, false);
//             const holeShape = new THREE.Shape();
//             holeShape.moveTo(radius, 0);
//             holeShape.absarc(0, 0, radius, 0, 2 * Math.PI, false);
//             circleShape.holes.push(holeShape);
//             return new THREE.ShapeGeometry(circleShape, curveSegments);
//         });
//     }
//    _createOuterBorder () {
//     return ShapeParent.getOrSet(NodeView.outerBorderGeometries, 20, () => {
//       const radius = 20
//       const border = new THREE.Shape();
//       const curveSegments = 32;
//       border.absarc(0, 0, radius + 2, 0, Math.PI * 2, false);
//       const borderHole = new THREE.Path();
//       borderHole.absarc(0, 0, radius, 0, Math.PI * 2, true);
//       border.holes.push(borderHole);
//       return new THREE.ShapeGeometry(border,curveSegments);
//     });
//   }
// }
// ShapesFactory.registerShape('default', ShapeDefault);

// export default ShapeDefault;
