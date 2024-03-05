import Model from './Model.js';
import Vertex from './Vertex.js';
import Triangle from './Triangle.js';
import { Vector3 } from './Vector.js';

export default class ObjLoader{
  constructor() {
    this.model = new Model();
    // 单纯的解析出来的顶点向量集合 还没有法线
    this.points = [];
    // 单纯的法线向量集合
    this.normals = [];
  }
  /**
   *
   * V：代表顶点。格式为V X Y Z，V后面的X Y Z表示三个顶点坐标。浮点型
   * VT：表示纹理坐标。上面的立方体有24个纹理坐标，因为每个三角形面的三个顶点，都需要指定一个纹理坐标。格式为VT TU TV。浮点型
   * VN：法向量 因为每个三角形的三个顶点都要指定一个法向量。格式为VN NX NY NZ。浮点型
   * F：面, 面后面跟着的整型值分别是属于这个面的顶点、纹理坐标、法向量的索引。面的格式为：
   * f Vertex1/Texture1/Normal1 Vertex2/Texture2/Normal2 Vertex3/Texture3/Normal3
   * 比如这样一行索引f 7/9/21 1/10/22 5/11/23，包含三组索引，构成了一个面。
   * **/
  load(str){

    const lines = str.split('\n')
    lines.forEach((line)=>{
      if(!line){
        return ;
      }
      const items = line.split(/\s+/g)
      switch (items[0].toLowerCase()){
        case '#':
          break
        case 'v':
          this.createVertex(items)
          break
        case 'vn':
          this.createNormals(items)
          break
        case 'f':
          this.createTriangle(items)
          break
      }
    })

    console.log(this)
  }
  createTriangle(items){
    const vIndexes = []
    items.forEach((item, index)=>{
      // 第一个item为 f  不包含数据
      if(index == 0){
        return ;
      }
      const indexes = item.split('/');
      // obj索引从1开始 所以要减1
      const v_index = parseInt(indexes[0]) - 1
      // TODO 前期纹理坐标先不管了  先能绘制出来再说
      const n_index = parseInt(indexes[2]) - 1
      vIndexes.push([v_index, n_index])
    })
    // console.log(vIndexes)
    if(vIndexes.length === 3){
      this.createTriangleByIndex(vIndexes)
    }else if(vIndexes.length === 4){
      //TODO 暂时先这么写吧 先最多支持四边形 等后面研究明白Obj再加
      let newVIndexes = [vIndexes[0], vIndexes[1], vIndexes[2]]
      this.createTriangleByIndex(newVIndexes)
      let newVIndexes1 = [vIndexes[0], vIndexes[2], vIndexes[3]]
      this.createTriangleByIndex(newVIndexes1)
    }
  }

  createTriangleByIndex(vIndexes){
    const p1 = this.points[vIndexes[0][0]]
    const n1 = this.normals[vIndexes[0][1]]
    // 构建一个三角形顶点
    const vertex1 = new Vertex(p1,n1);

    const p2 = this.points[vIndexes[1][0]]
    const n2 = this.normals[vIndexes[1][1]]
    // 构建一个三角形顶点
    const vertex2 = new Vertex(p2,n2);

    const p3 = this.points[vIndexes[2][0]]
    const n3 = this.normals[vIndexes[2][1]]
    // 构建一个三角形顶点
    const vertex3 = new Vertex(p3,n3);

    this.model.addFace(
      new Triangle(vertex1,vertex2,vertex3)
    )
  }
  createVertex(items){
    const x = parseFloat(items[1])
    const y = parseFloat(items[2])
    const z = parseFloat(items[3])
    this.points.push(new Vector3(x,y,z))
  }
  createNormals(items){
    const x = parseFloat(items[1])
    const y = parseFloat(items[2])
    const z = parseFloat(items[3])
    // console.log(items);
    const normal = new Vector3(x,y,z)
    this.normals.push(normal.normalize())
  }
  getModel(){
    return this.model;
  }
}