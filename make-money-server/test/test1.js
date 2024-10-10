const axios = require('axios');

(async () => {
  const appkey = '045c8bff6b502c38a4a10c311044e4b8';
  const type = 11;
  const number = '03,10,11,19,27,28|07';

  const redBalls = number.split('|')[0].split(',').join(' ');
  const blueBall = number.split('|')[1];
  const url = `http://api.tanshuapi.com/api/caipiao/v1/winning?key=${appkey}&caipiaoid=${type}&number=${redBalls}&refernumber=${blueBall}&type=1`;
  const res = await axios.get(url);
  console.log('查询双色球:', res.data);
  //{
  //   code: 1,
  //   msg: '操作成功',
  //   data: {
  //     caipiaoid: 11,
  //     number: '03 10 11 19 27 28',
  //     refernumber: '07',
  //     issueno: '2024115',
  //     winstatus: 0
  //   }
  // }
})()