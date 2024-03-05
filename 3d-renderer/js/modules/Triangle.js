import { Vector3 } from './Vector.js';

// 定义三角形类 包含三个定点以及三角形朝向
export default class Triangle{
  constructor(v1,v2,v3, normal) {
    this.vertexes= [v1, v2, v3];
    if(normal){
      this.normal= normal;
    }else {
      //错误!!! 计算三角形的一条边需要两个顶点向量相减 得出一条边！！
      // const normal = Vector3.crossProduct(v1.position, v2.position)
      // 正确
      const edge1 = Vector3.sub(v3.position, v1.position)
      const edge2 = Vector3.sub(v2.position, v1.position)
      const normal = Vector3.crossProduct(edge1, edge2)
      normal.normalize()
      this.normal = normal
    }
  }

  getBBox(){
    const v = [this.vertexes[0].position, this.vertexes[1].position, this.vertexes[2].position]
    const minX = Math.floor(Math.min(v[0].x,v[1].x,v[2].x))
    const minY = Math.floor(Math.min(v[0].y,v[1].y,v[2].y))
    const maxX = Math.ceil( Math.max(v[0].x,v[1].x,v[2].x))
    const maxY = Math.ceil( Math.max(v[0].y,v[1].y,v[2].y))

    return {
      min:new Vector3(minX,minY,0),
      max: new Vector3(maxX,maxY, 0)
    }
  }

  worldToScreen(width,height){
    return new Triangle(
      this.vertexes[0].worldToScreen(width, height),
      this.vertexes[1].worldToScreen(width, height),
      this.vertexes[2].worldToScreen(width, height),
    )
  }

  getBarycentric(x, y) {
    let v = [this.vertexes[0].position, this.vertexes[1].position, this.vertexes[2].position]
    let c1 =
      (x * (v[1].y - v[2].y) + (v[2].x - v[1].x) * y + v[1].x * v[2].y - v[2].x * v[1].y)
      /
      (v[0].x * (v[1].y - v[2].y) + (v[2].x - v[1].x) * v[0].y + v[1].x * v[2].y - v[2].x * v[1].y);
    let c2 = (x * (v[2].y - v[0].y) + (v[0].x - v[2].x) * y + v[2].x * v[0].y - v[0].x * v[2].y)
      /
      (v[1].x * (v[2].y - v[0].y) + (v[0].x - v[2].x) * v[1].y + v[2].x * v[0].y - v[0].x * v[2].y);
    // let c3 = 1 - c1 - c2;
    let c3 = (x * (v[0].y - v[1].y) + (v[1].x - v[0].x) * y + v[0].x * v[1].y - v[1].x * v[0].y)
      /
      (v[2].x * (v[0].y - v[1].y) + (v[1].x - v[0].x) * v[2].y + v[0].x * v[1].y - v[1].x * v[0].y);
    return { alpha: c1, beta: c2, gamma: c3 }
  }

  isPointInTriangle(x, y){
    const {alpha, beta, gamma} = this.getBarycentric(x, y)
    return {alpha, beta, gamma, isInside:!(alpha < 0 || beta < 0 || gamma < 0)}
  }
}