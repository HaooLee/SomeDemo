import Color from './Color.js';

export default class FrameBuffer{
  constructor(width, height, translateX = 0, translateY = 0) {
    this.width = width;
    this.height = height;
    this.translateX = translateX;
    this.translateY = translateY;
    this.buffer = []
    this.zBuffer = []
  }

  setTranslate(x,y){
    this.translateX = x;
    this.translateY = y
  }

  setPixel(x, y, color){
    x += this.translateX;
    y += this.translateY;
    if( x >= 0 && x < this.width && y >= 0 && y < this.height){
      this.buffer[ x + y * this.width ] = color;
    }
  }

  drawLine(p1, p2, color, scaleX = 1, scaleY = 1){
    let x1 = Math.round(p1.x * scaleX);
    let x2 = Math.round(p2.x * scaleX);
    let y1 = -Math.round(p1.y * scaleY);
    let y2 = -Math.round(p2.y * scaleY);

    let steep = false
    if (Math.abs(x1 - x2) < Math.abs(y1 - y2)) {
      [x1, y1] = [y1, x1];
      [x2, y2] = [y2, x2];
      steep = true;
    }
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
      [y1, y2] = [y2, y1];
    }
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let derr = dy * 2;
    let dis = (y1 < y2) ? 1 : -1;
    let error = 0;
    for (let x = x1, y = y1; x <= x2; x++) {
      if (!steep) {
        this.setPixel(x, y, color)
      } else {
        this.setPixel(y, x, color)
      }
      error += derr;
      if (error > dx) {
        y += dis;
        error -= 2 * dx;
      }
    }
  }

  drawTriangleEdge(triangle, color, scaleX, scaleY){
    this.drawLine(triangle.vertexes[0].position, triangle.vertexes[1].position, color, scaleX, scaleY);
    this.drawLine(triangle.vertexes[1].position, triangle.vertexes[2].position, color, scaleX, scaleY);
    this.drawLine(triangle.vertexes[2].position, triangle.vertexes[0].position, color, scaleX, scaleY);
  }

  drawTriangleZBuffer(triangle){
    const BBox = triangle.getBBox();
    for (let x = BBox.min.x; x <= BBox.max.x; x++){
      for (let y = BBox.min.y; y <= BBox.max.y; y++){
        const {alpha, beta, gamma, isInside} = triangle.isPointInTriangle(x,y)
        if(isInside){
          const z = alpha * triangle.vertexes[0].position.z + beta * triangle.vertexes[1].position.z + gamma * triangle.vertexes[2].position.z
          if(z > this.zBuffer[x + y * this.width]){
            this.zBuffer[x + y * this.width] = z
            this.setPixel(x,y,new Color(z * 255,z * 255,z * 255,255))
          }
        }
      }
    }

  }

  convertToImageData(){
    const imageData = new ImageData(this.width, this.height);
    for (let i = 0; i < this.width * this.height; i++) {
      const index = i * 4;
      const color = this.buffer[i];
      if(color){
        imageData.data[index] = color.r
        imageData.data[index + 1] = color.g
        imageData.data[index + 2] = color.b
        imageData.data[index + 3] = color.a
      }
    }
    return imageData
  }
}