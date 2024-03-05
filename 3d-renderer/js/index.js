import Color from './modules/Color.js';
import { Matrix } from './modules/Matrix.js';
import ObjLoader from './modules/ObjLoader.js';
import Render from './modules/Render.js';
import World from './modules/World.js';

// const m = new Matrix(4,1);
//
// const m1 = new Matrix(4,4);
// m.print()
// m.setMatrix(
//   1,
//   2,
//   3,
//   4,
// )
//
// m1.setMatrix(
//   2,0,0,0,
//   0,2,0,0,
//   0,0,2,0,
//   0,0,0,2,
// )

// m.print();
// m1.print();
// const m2 = m.multiply(m1);
//
// m2.print();
const loadModelDom = document.getElementById('model');
loadModelDom.addEventListener('change',(e)=>{
  const reader = new FileReader();
  reader.readAsText(loadModelDom.files[0])
  reader.onload = function(){
    const loader = new ObjLoader()
    loader.load(reader.result)
    // console.log(loader.model)
    const world = new World();
    // loader.model.scale(1.2, 1.1,1.1);
    world.addActor(loader.model);
    const render = new Render().createRender(800,800);
    render.on('mousemove',(e)=>{
      loader.model.setRotationByX(e.movementY)
    })
    render.draw(world)
  }
})

