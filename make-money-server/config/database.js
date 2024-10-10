// config/database.js

const { Sequelize } = require('sequelize');

// 创建 Sequelize 实例，连接到数据库
const sequelize = new Sequelize('caipiao', 'caipiao', 'anzg61qkia_yqwywiq@q.2', {
  host: '1panel.haoolee.com',
  dialect: 'mysql', // 'mysql' | 'mariadb' | 'postgres' | 'mssql'
  logging: false,   // 关闭日志输出，或者可以设置为 console.log 以输出 SQL 语句
});

// 测试数据库连接
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;