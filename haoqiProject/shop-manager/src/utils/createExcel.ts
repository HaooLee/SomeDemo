import * as XLSX from 'xlsx';
import path from 'path';
import * as fs from 'fs';
import { getDateForPath } from './date';

XLSX.set_fs?.(fs);
// eslint-disable-next-line import/prefer-default-export
export const createExcel = (data: any[], savePath: string) => {
  const workbook = XLSX.utils.book_new();
  // 店铺名
  // 在售商品数
  // 访客
  // 成交单量
  // 成交金额
  // 客单价
  // 月累计成交金额
  // 年累计成交金额
  // 京准通花费
  // 平均点击成本
  // roi
  // 月度京准通花费
  // 月度平均点击成本
  // 月度roi
  // 店铺星级

  // eslint-disable-next-line camelcase
  const worksheet_data = [
    [
      '店铺名',
      '店铺星级',
      '在售商品数',
      '最新上架时间',
      '访客',
      '成交单量',
      '成交金额',
      '客单价',
      '成交转化率',
      '月累计成交金额',
      '年累计成交金额',
      '京准通花费',
      '平均点击成本',
      'roi',
      '月度京准通花费',
      '月度平均点击成本',
      '月度roi',
    ],
  ];

  // eslint-disable-next-line camelcase
  const finalData = worksheet_data.concat(data);

  const worksheet = XLSX.utils.aoa_to_sheet(finalData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const fileName = path.resolve(savePath, `${getDateForPath()}.xlsx`);
  XLSX.writeFile(workbook, fileName);
  return fileName;
};

export const parseExcel = (filePath: string) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  return data;
};
