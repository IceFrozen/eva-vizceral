
import * as THREE from 'three';
import GlobalStyles from '../../globalStyles';
import ShapesFactory from '../ShapesFactory';
import ShapeParent from './ShapeParent';
import NodeView from '../nodeView';

class ShapeDefault {
  constructor () {
    this.customNode = {};
    this.customNode.innergeometry = this._createInnerGeometry(22, 32);
    this.customNode.outerborder = this._createOuterBorder(22, 32);
    this.customNode.material = this._createMaterial(GlobalStyles.shapesStyles.colorShapeDefault);
    this.customNode.bordermaterial = this._createMaterial(GlobalStyles.shapesStyles.colorShapeBorder);
    return this.customNode;
  }

  _createInnerGeometry (radius, curveSegments) {
       return ShapeParent.getOrSet(NodeView.innerBorderGeometries, radius, () => {
            const circleShape = new THREE.Shape();
            circleShape.moveTo(radius, 0);
            circleShape.absarc(0, 0, radius, 0, 2 * Math.PI, false);
            // const holeShape = new THREE.Shape();
            // holeShape.moveTo(radius, 0);
            // holeShape.absarc(0, 0, radius-2, 0, 2 * Math.PI, false);
            // circleShape.holes.push(holeShape);
            return new THREE.ShapeGeometry(circleShape, curveSegments);
        });
  }

  _createOuterBorder (radius, curveSegments) {
     return ShapeParent.getOrSet(NodeView.outerBorderGeometries, radius, () => {
      const border = new THREE.Shape();
      border.absarc(0, 0, radius + 2, 0, Math.PI * 2, false);
      const borderHole = new THREE.Path();
      borderHole.absarc(0, 0, radius, 0, Math.PI * 2, true);
      border.holes.push(borderHole);
      return new THREE.ShapeGeometry(border,curveSegments);
    });
  }

  _createMaterial (rgb) {
    return new THREE.MeshBasicMaterial({ color: rgb });
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
