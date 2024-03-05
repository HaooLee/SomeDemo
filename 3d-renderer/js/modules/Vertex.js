import { Vector3 } from './Vector.js';

export default class Vertex{
  constructor(position, normal) {
    // 顶点位置
    this.position = position;
    // 顶点法线
    this.normal = normal;
  }

  worldToScreen(width, height){
    return new Vertex(new Vector3(
      (this.position.x + 1) * width / 2 + 0.5,
      (this.position.y + 1) * height / 2 + 0.5,
      this.position.z
    ), this.normal.clone())
  }
}