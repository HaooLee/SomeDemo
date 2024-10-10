const router = require('koa-router')()
const Lottery = require('../models/lottery')
const {Op} = require('sequelize');
const updateDatabase = require('../tasks/update')

router.post('/record', async (ctx, next) => {
  const {type, number} = ctx.request.body
  if (!number) {
    ctx.body = {
      code: 1,
      message: '号码不能为空',
    }
    return
  }
  if (!type) {
    ctx.body = {
      code: 1,
      message: '类型不能为空',
    }
    return
  }
  try {
    await Lottery.create({
      type,
      number,
    })
  }catch (e) {
    ctx.body = {
      code: 1,
      message: '记录失败',
    }
    return
  }
  ctx.body = {
    code: 0,
    message: '记录成功',
  }
})

router.get('/list', async (ctx, next) => {
  // 获取前7天的数据 按日期倒序排列 并把数据处理成
  const today = new Date()
  const last10Day = new Date(today.getTime() - 10 * 24 * 3600 * 1000)
  const list = await Lottery.findAll({
    where: {
      createdAt: {
        [Op.gte]: last10Day,
      },
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  })

  const result = []
  list.forEach(item => {
    const date = item.createdAt.toISOString().split('T')[0]
    const data = result.find(d => d.date === date)
    if (data) {
      data.data[item.type === 11 ? 'ssq' : 'kl8'].push(item.number)
    } else {
      result.push({
        date,
        data: {
          ssq: item.type === 11 ? [item.number] : [],
          kl8: item.type === 89 ? [item.number] : [],
        },
      })
    }
  })

  ctx.body = {
    code: 0,
    data: result,
  }
})

router.get('/task', async (ctx, next) => {
  await updateDatabase()

  ctx.body = {
    code: 0,
    message: '任务执行成功',
  }
})

router.get('/delete', async (ctx, next) => {
  if (!ctx.query.id) {
    ctx.body = {
      code: 1,
      message: 'id不能为空',
    }
    return
  }
  await Lottery.destroy({
    where: {
      id: ctx.query.id,
    },
  })
  ctx.body = {
    code: 0,
    message: '删除成功',
  }
})

module.exports = router
