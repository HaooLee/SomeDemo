import { Vector3 } from './Vector.js';
import  FrameBuffer  from './FrameBuffer.js'
import Color from './Color.js';

export default class Render{
  handlers = {}
  createRender(width, height){
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d');
    this.ctx.translate( this.width / 2 ,this.height / 2);
    document.body.appendChild(this.canvas)
    this.bindEvents()

    return this;
  }

  bindEvents() {
    this.canvas.addEventListener('mousedown',()=>{
      this.mouseDown = true;
    })
    window.addEventListener('mouseup',()=>{
      this.mouseDown = false;
    })
    this.canvas.addEventListener('mousemove', (e)=>{
      if(this.mouseDown){
        this.handlers['mousemove']?.forEach((handle)=>{
          handle?.(e)
        })
      }
    })
  }

  on(eventType, cb){
    if(this.handlers[eventType]){
      this.handlers.push(cb)
    }else {
      this.handlers[eventType] = [cb]
    }
  }

  draw(world){

    const frameBuffer = new FrameBuffer(this.width, this.height, this.width/2,this.height/2)
    world.actors.forEach((model)=>{
        // console.log(model)
      // 光照方向
      const lightDir = new Vector3(0,0, -1)
;      model.triangles.forEach((triangle)=>{
        // 第一版 绘制线框
        // this.drawTriangleLine(triangle,'#000')
          // 第二版 绘制随机颜色的三角形
        // this.drawTriangle(triangle, `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`)
          // 第三版 根据光线方向剔除背面三角形
        // console.log(triangle.normal)
        //
        const intensity = triangle.normal.dot(lightDir);

        frameBuffer.drawTriangleZBuffer(triangle.worldToScreen(this.width,this.height))


        if(intensity > 0){
          frameBuffer.drawTriangleEdge(triangle,
            new Color(intensity * 255,intensity * 255,intensity * 255,255),
            this.width / 2,
            this.height / 2
          )
        }
      })
    })
    console.log(frameBuffer)
    const imagData = frameBuffer.convertToImageData();
    this.ctx.putImageData(imagData,0,0)

    requestAnimationFrame(()=>{
      // this.draw(world)
    })
    // console.timeEnd('draw')
  }

}
