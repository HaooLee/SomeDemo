const cron = require('node-cron');
const axios = require('axios');
const LotteryHistory = require('../models/Lottery');
const {Op} = require('sequelize');

const appkey = '045c8bff6b502c38a4a10c311044e4b8';

// 定义一个更新数据库的函数
async function updateDatabase() {
  try {
    // 查询昨天晚上9点之后买的的所有彩票 并通过接口查询是否中奖 查询结束后更新数据库
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(22, 0, 0, 0);
    const list = await LotteryHistory.findAll({
      where: {
        createdAt: {
          [Op.gte]: yesterday,
        },
        checked: 0,
      },
    });

    for (const item of list) {
      // console.log('查询彩票号码:', item.number);

      // `http://api.tanshuapi.com/api/caipiao/v1/winning?key=&caipiaoid=${type}&number=${redBalls}&refernumber=${blueBall}&type=1`

      const {number, type} = item;
      if (type === 11) {
        // 双色球
        try {
          const redBalls = number.split('|')[0].split(',').join(' ');
          const blueBall = number.split('|')[1];
          const url = `http://api.tanshuapi.com/api/caipiao/v1/winning?key=${appkey}&caipiaoid=${type}&number=${redBalls}&refernumber=${blueBall}&type=1`;
          const res = await axios.get(url);
          console.log('查询双色球:', res.data);
          if (res.data.code === 1) {
            item.status = res.data.data.winstatus^1;
          }
          item.checked = 1;
        }catch (e) {
          console.error('查询双色球出错:', e);
        }
      }else if (type === 89) {
        // 快乐8
        try {
          const balls = number.split(',').join(' ');
          const url = `http://api.tanshuapi.com/api/caipiao/v1/winning?key=${appkey}&caipiaoid=${type}&number=${balls}&type=1`;
          const res = await axios.get(url);
          // console.log('查询快乐8:', res.data);
          if (res.data.code === 1) {
            item.status = res.data.data.winstatus^1;
          }
          item.checked = 1;
        }catch (e) {
          console.error('查询快乐8出错:', e);
        }
      }

      item.checked = 1;
      await item.save();
    }
    console.log('数据库更新成功');
  } catch (error) {
    console.error('更新数据库时出错:', error);
  }
}

// 定时任务，每天晚上9点执行一次
cron.schedule('0 22 * * *', () => {
  console.log('执行定时任务: 每天晚上10点');
  updateDatabase();
});

module.exports = updateDatabase;