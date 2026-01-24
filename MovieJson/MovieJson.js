const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs/promises');

// 1. 路径配置
const EXCEL_FILE_PATH = path.resolve(__dirname, '../movie.xlsx');
const OUTPUT_FILE_PATH = path.resolve(__dirname, './MovieJson.txt');
const FILE_ENCODE = 'utf8';

// 使用xlsx官方自带的日期转换方法 、、 完美兼容所有Excel日期格式
function excelSerialToDate(serial) {
  // XLSX.SSF.format 是xlsx库的官方方法，第二个参数 10 代表格式为 YYYY-MM-DD
  return XLSX.SSF.format('yyyy-mm-dd', serial);
}

async function excelToJsonObj() {
  try {
    // 读取Excel文件
    const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    if (workbook.SheetNames.length === 0) {
      throw new Error('读取失败：Excel无工作表');
    }
    // 获取第一个工作表
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // 工作表转JSON数组（自动识别表头为键名）
    const jsonObjArr = XLSX.utils.sheet_to_json(worksheet);

    const fixedArr = jsonObjArr.map(item => {
      if (item && typeof item.showtime === 'number') {
        item.showtime = excelSerialToDate(item.showtime);
      }
      return item || {}; // 防止item是null/undefined
    });

    // 转为格式化的JSON字符串，缩进2个空格
    const jsonStr = JSON.stringify(fixedArr, null, 2);

    // await fs.writeFile(OUTPUT_FILE_PATH, jsonStr, FILE_ENCODE);
    // console.log(`数据写入成功！文件路径：${OUTPUT_FILE_PATH}`);
    return fixedArr; // 返回JSON对象数组
  } catch (error) {
    console.error(`Excel解析失败：${error.message}`);
    return []; // 异常时返回空数组，避免服务崩溃
  }
}
module.exports = {
  excelToJsonObj,
};