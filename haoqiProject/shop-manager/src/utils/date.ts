function getDate(timestamp?: number) {
  const date = timestamp ? new Date(timestamp) : new Date();

  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份，注意月份是从 0 开始的，所以需要加 1
  const day = date.getDate(); // 获取日期
  const hour = date.getHours(); // 获取小时
  const minute = date.getMinutes(); // 获取分钟
  const second = date.getSeconds(); // 获取秒

  // 将月份、日期、小时、分钟、秒格式化为两位数
  const monthStr = month < 10 ? `0${month}` : month;
  const dayStr = day < 10 ? `0${day}` : day;
  const hourStr = hour < 10 ? `0${hour}` : hour;
  const minuteStr = minute < 10 ? `0${minute}` : minute;
  const secondStr = second < 10 ? `0${second}` : second;

  // let formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return `${year}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}:${secondStr}`;
}

function getDateForPath(timestamp?: number) {
  const date = timestamp ? new Date(timestamp) : new Date();

  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份，注意月份是从 0 开始的，所以需要加 1
  const day = date.getDate(); // 获取日期
  const hour = date.getHours(); // 获取小时
  const minute = date.getMinutes(); // 获取分钟
  const second = date.getSeconds(); // 获取秒

  // 将月份、日期、小时、分钟、秒格式化为两位数
  const monthStr = month < 10 ? `0${month}` : month;
  const dayStr = day < 10 ? `0${day}` : day;
  const hourStr = hour < 10 ? `0${hour}` : hour;
  const minuteStr = minute < 10 ? `0${minute}` : minute;
  const secondStr = second < 10 ? `0${second}` : second;

  // let formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return `${year}-${monthStr}-${dayStr} ${hourStr}点${minuteStr}分${secondStr}`;
}

function getDateDiffDay(date1: string, date2: string) {
  const timestamp1 = Date.parse(date1);
  const timestamp2 = Date.parse(date2);

  return Math.abs(timestamp2 - timestamp1) / (1000 * 60 * 60 * 24);
}

function getYesterday235959Timestamp() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(23, 59, 59, 0);
  return date.getTime();
}

function getCurrentMonthFirstDayTimestamp() {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export {
  getDate,
  getDateDiffDay,
  getYesterday235959Timestamp,
  getCurrentMonthFirstDayTimestamp,
  getDateForPath,
};
