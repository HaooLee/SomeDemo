import {Matrix} from "./Matrix.js";

export default class Model {
  triangles=[];
  matrix = new Matrix(3,3);
  scale(sx, sy, sz){
      this.matrix.setValue(0,0, sx)
      this.matrix.setValue(1,1, sy)
      this.matrix.setValue(2,2, sz)
      // this.matrix.print()
      this.triangles.forEach((triangle)=>{
          triangle.vertexes[0].position.applyMatrix(this.matrix)
          triangle.vertexes[1].position.applyMatrix(this.matrix)
          triangle.vertexes[2].position.applyMatrix(this.matrix)
      })
  }
  setRotationByX(angle){
   const radian = angle / 180 * Math.PI;
   const cos = Math.cos(radian);
    const sin = Math.sin(radian);
   const matrix = new Matrix(3,3).setMatrix(
     1, 0,0,
     1, cos, -sin,
    1,sin, cos,
     )
    this.triangles.forEach((triangle)=>{
      triangle.vertexes[0].position.applyMatrix(matrix)
      triangle.vertexes[1].position.applyMatrix(matrix)
      triangle.vertexes[2].position.applyMatrix(matrix)
    })
  }

  addFace(face){
    this.triangles.push(face)
  }
}
