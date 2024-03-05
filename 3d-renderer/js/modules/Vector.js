import {Matrix} from "./Matrix.js";

class Vector3{
  constructor(x, y, z, ) {
    this.x = x;
    this.y = y;
    this.z = z;
    // this.w = w
  }
  static crossProduct(vec1, vec2){
    let x = vec1.y * vec2.z - vec1.z * vec2.y;
    let y = vec1.z * vec2.x - vec1.x * vec2.z;
    let z = vec1.x * vec2.y - vec1.y * vec2.x;
    return new Vector3(x,y,z)
  }
  static sub(vec1, vec2){
    let x = vec1.x - vec2.x;
    let y = vec1.y - vec2.y;
    let z = vec1.z - vec2.z;
    return new Vector3(x, y, z);
  }
  // get transpose(){
  //
  //   return
  // }
  // 加一个向量
  set(x, y , z){
    this.x = x;
    this.y = y;
    this.z = z;
    // this.w = w
    return this;
  }
  add( vec ){
    this.x += vec.x
    this.y += vec.y
    this.z += vec.z
    // this.w += vec.w
    return this;
  }
  // 加一个标量
  addScalar( scalar ) {
    this.x += scalar;
    this.y += scalar;
    this.z += scalar;
    return this;
  }
  // 减去一个向量
  sub( vec ) {
    this.x -= vec.x;
    this.y -= vec.y;
    this.z -= vec.z;
    return this;
  }
  // 减去一个标量
  subScalar( scalar ) {
    this.x -= scalar;
    this.y -= scalar;
    this.z -= scalar;
    return this;
  }
  // 向量乘以一个向量
  multiply( vec ){
    this.x *= vec.x;
    this.y *= vec.y;
    this.z *= vec.z;
    // this.w *= vec.w;
    return this;
  }
  //
  multiplyScalar( scalar ) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    // this.w *= scalar;
    return this;
  }

  divideScalar( scalar ) {
    return this.multiplyScalar( 1 / scalar );
  }
  // 点乘一个向量 （数量积、内积、点积） 得出向量投影长度(结果为标量)
  dot(vec){
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
  }
  // 叉乘一个向量 （向量积 外积、叉积） 得出垂直于这两个向量的新向量
  cross(vec){
    let x = this.y * vec.z - this.z * vec.y;
    let y = this.z * vec.x - this.x * vec.z;
    let z = this.x * vec.y - this.y * vec.x;
    return new Vector3(x,y,z)
  }
  // 获取向量的模
  norm(){
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
  }
  // 向量归一化
  normalize(){
    return this.divideScalar(this.norm())
  }
  // 获取向量的转置
  transpose(){
      return new Matrix(3, 1).setMatrix(this.x,this.y,this.z)
  }
  // 应用一个矩阵
  applyMatrix(m){
      const res = this.transpose().multiply(m)
      // console.log(res)
      this.x = res.getValue(0,0)
      this.y = res.getValue(1,0)
      this.z = res.getValue(2,0)
     return this
  }

  clone(){
    return new Vector3(this.x, this.y ,this.z)
  }
}

class Vector4 extends Vector3{
  constructor(x,y,z,w) {
    super(x,y,z);
    this.w = w;

  }
}

export { Vector3, Vector4 }
