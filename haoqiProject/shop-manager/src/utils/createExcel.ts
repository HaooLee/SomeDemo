import * as XLSX from 'xlsx';
import {getDate} from "./date";

export const createExcel = (data: any[]) => {
  let workbook = XLSX.utils.book_new();
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

  let worksheet_data = [
    ['店铺名', '店铺星级', '在售商品数', '最新上架时间', '访客', '成交单量', '成交金额', '客单价', '月累计成交金额', '年累计成交金额', '京准通花费', '平均点击成本', 'roi', '月度京准通花费', '月度平均点击成本', '月度roi' ],
  ];

  const finalData = worksheet_data.concat(data);

  let worksheet = XLSX.utils.aoa_to_sheet(finalData);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const fileName = `${getDate()}-导出店铺数据.xlsx`
  XLSX.writeFile(workbook, fileName);
  return fileName;
};

