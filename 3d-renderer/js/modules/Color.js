export default class Color {
  constructor(r = 255, g = 255 , b = 255, a = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  add(color){
    let r = this.r + color.r;
    let g = this.g + color.g;
    let b = this.b + color.b;
    let a = this.a + color.a;
    return new Color(r, g, b, a)
  }
}