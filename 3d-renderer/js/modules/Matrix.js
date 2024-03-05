class Matrix{
  matrix = [];
  constructor(row,column) {
    this.row = row;
    this.column = column;
    for(let i = 0; i < row; i++){
      this.matrix[i] = [];
      for (let j = 0; j< column; j++){
        this.matrix[i][j] = i == j ? 1:0;
      }
    }
  }

  setMatrix(...m){
    if(m.length !== this.row * this.column){
      console.error(`matrix length error`)
      return ;
    }
    for(let i = 0; i < this.row; i++){
      for (let j = 0; j< this.column; j++){
        this.matrix[i][j] = m[i * this.column + j]
        // console.log(i * this.column + j)
      }
    }
    return this
  }

  setValue(i,j,val){
    this.matrix[i][j] = val;
    return this;
  }

  getValue(i,j){
    return this.matrix[i][j];
  }

  multiply(m){
    return this.multiplyMatrices(m,this);
  }

  multiplyMatrices( m1, m2 ) {
    if(m1.column !== m2.row){
      m1.print();
      console.log(' X ');
      m2.print();
      console.error(`matrix multiply error`)
      return ;
    }
    const nm = new Matrix(m1.row, m2.column);

    for(let i = 0; i < m1.row; i++){
      for(let j = 0; j < m2.column; j++){
        for(let k = 0; k < m1.row; k++){
          nm.setValue(i,j, nm.getValue(i,j) + m1.getValue(i,k) * m2.getValue(k,j))
        }
      }
    }
    return nm;
  }

  print(){
    let res = '---- Matrix ----\n\n'
    this.matrix.forEach((row)=>{
      res += JSON.stringify(row) + '\n'
    })
    console.log(res)
  }
}

// class Matrix4 extends Matrix3{
//   matrix = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1],
//   ];
//   row = 4
//   column = 4
// }

export { Matrix }
