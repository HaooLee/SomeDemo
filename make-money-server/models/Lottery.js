const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // 导入配置好的 Sequelize 实例

// 定义 tb_lottery_history 模型
const LotteryHistory = sequelize.define('LotteryHistory', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING(80),
    allowNull: true,
    comment: '彩票号码 例如双色球: 01,02,03,04,05,06|07  快乐8: 01,02,03,04,05,06,07,08,09,10',
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 11,
    comment: '彩票类型 11 双色球  89 快乐8',
  },
  checked: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '彩票查询状态 0 未查询 1 已查询',
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '彩票中奖状态 0 未中奖 1 已中奖',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'tb_lottery_history',  // 指定表名
  timestamps: false,  // 自动创建 `createdAt` 和 `updatedAt`
});


module.exports = LotteryHistory;