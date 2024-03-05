import { Matrix } from './Matrix';

export default class Camera{
  projectionMatrix = new Matrix(4,4)
  constructor(position, fov, near, far ) {
    this.position = position;
    this.fov = near;
    this.far = far;
  }
}