import vue from "@/main";
// 根据日期计算周数
let getYearWeek = (date1, flag) => {
  let dateStart = `${date1.getFullYear()}/${date1.getMonth() +
  1}/${date1.getDate()} 00:00:00`;
  let date = new Date(dateStart);
  var date2 = new Date(date.getFullYear(), 0, 1);
  var day1 = date.getDay();
  if (day1 == 0) day1 = 7;
  var day2 = date2.getDay();
  if (day2 == 0) day2 = 7;
  let d = Math.round(
    (date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) /
    86400000
  );
  // 周日作为一周的开始
  // let returnV = Math.ceil(d /7) + (day1==7 ? 2 : 1);
  // 周一作为一周的开始
  let returnV = Math.ceil(d / 7) + 1;
  // return `${date.getFullYear()}年第${returnV}周`;
  let result = flag && flag == "num" ? returnV : `第${returnV}周`;
  return result;
};
// 根据日期对象计算那一周的时间段
let getPeriod = (e) => {
  // 周一到周日算一周
  let nLeft = e.getDay() == 0 ? 6 : e.getDay() - 1;
  let nRight = e.getDay() == 0 ? 0 : 7 - e.getDay();
  // 周日到周六算一周
  // let nLeft = e.getDay();
  // let nRight = 6-e.getDay();
  let weekFirstDay = formatCurrDateMonthDate(
    new Date(e.getTime() - nLeft * 24 * 60 * 60 * 1000)
  );
  let weekLastDay = formatCurrDateMonthDate(
    new Date(e.getTime() + nRight * 24 * 60 * 60 * 1000)
  );
  let period = `${weekFirstDay}至${weekLastDay}`;
  return period;
};
// 返回年月日格式字符串  年-月-日
let formatCurrDate = (date) => {
  if (date && typeof date == "number") {
    date = new Date(date);
  } else if (!date || typeof date == "string") {
    return date;
  }
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d;
};
// 返回年月日格式字符串  20211202
let formatCurrDateNoLine = (date) => {
  if (date && typeof date == "number") {
    date = new Date(date);
  } else if (!date || typeof date == "string") {
    return date;
  }
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "" + m + "" + d;
};
// 返回年月格式字符串  年-月
let formatCurrMonth = (date) => {
  if (date && typeof date == "number") {
    date = new Date();
  } else if (!date || typeof date == "string") {
    return date;
  }
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  return y + "-" + m;
};
// 返回月日格式字符串  月-日
let formatCurrDateMonthDate = (date) => {
  if (date && typeof date == "number") {
    date = new Date(date);
  } else if (!date || typeof date == "string") {
    return date;
  }
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return m + "-" + d;
};
// 后台返回的时间  格式是2021-05-06T12:45:26.234，要转化成2021-05-06 12:45:26
let modifyTimeFormat = (date) => {
  if (typeof date == "string") {
    let n = date.indexOf(".");
    let str = n > -1 ? date.substring(0, n) : date;
    return str.replace("T", " ");
  } else if (typeof date == "object") {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let mm = date.getMinutes();
    mm = mm < 10 ? "0" + mm : mm;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    return `${y}-${m}-${d}T${h}:${mm}:${s}`;
  }
};
let flexColumnWidth = (str, tableData, flag = "max", columnTitle) => {
  // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
  // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
  // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
  // 如果没有数据，或该列没有数据：取标题的长度*18作为该列的最小宽度
  let columnMinWidth = (columnTitle && columnTitle.length > 6) ? columnTitle.length * 18 : 100;
  str = str + "";
  let columnContent = "";
  if (
    !tableData ||
    !tableData.length ||
    tableData.length === 0 ||
    tableData === undefined
  ) {
    return columnMinWidth;
  }
  if (!str || !str.length || str.length === 0 || str === undefined) {
    return;
  }
  if (flag === "equal") {
    // 获取该列中第一个不为空的数据(内容)
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i][str].length > 0) {
        // console.log('该列数据[0]:', tableData[0][str])
        columnContent = tableData[i][str] ? tableData[i][str].toString() : "";
        break;
      }
    }
  } else {
    // 获取该列中最长的数据(内容)
    let index = 0;
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i][str] === null) {
        // return columnMinWidth;
        tableData[i][str] = "";
      }
      const now_temp = tableData[i][str] + "";
      const max_temp = tableData[index][str] + "";
      if (now_temp.length > max_temp.length) {
        index = i;
      }
    }
    columnContent = tableData[index][str] ? tableData[index][str].toString() : "";
  }
  // console.log('该列数据[i]:', columnContent)
  // 以下分配的单位长度可根据实际需求进行调整
  let flexWidth = 0;
  for (const char of columnContent) {
    if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
      // 如果是英文字符，为字符分配10个单位宽度
      flexWidth += 10;
    } else if (char >= "\u4e00" && char <= "\u9fa5") {
      // 如果是中文字符，为字符分配15个单位宽度
      flexWidth += 13;
    } else {
      // 其他种类字符，为字符分配10个单位宽度
      flexWidth += 10;
    }
  }
  // 获取最小宽度：防止因为表格数据很窄，导致表头换行
  if (flexWidth < columnMinWidth) {
    flexWidth = columnMinWidth;
  } else if (flexWidth > 300) {
    // 设置最大宽度
    flexWidth = 300;
  }
  return flexWidth + "px";
};
let downloadFile = (data, fileName) => {
  if (!data) {
    return false;
  }
  // 下面就是DOM操作 1.添加一个a标签 2.给a标签添加了属性 3.给他添加了点击事件(点击后移除)
  debugger
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
// 公共的错误提示
let showModalTips = (me, tip, title = "温馨提示", confirmButtonText = "我知道了") => {
  // 兼容如果是只传了一个参数并且是字符串，那就作为文案显示
  if (typeof (me) == "string") {
    vue.$alert(me, "温馨提示", {
      confirmButtonText: "我知道了",
      dangerouslyUseHTMLString: true,
      customClass: "error-tip-box"
    });
  } else {
    if (!tip) {
      return false;
    }
    vue.$alert(tip, title, {
      confirmButtonText,
    });
  }
}
/**
 * 拆分中/英逗号、空格分隔的字符串
 * @param {string} str 传入的字符串
 * @returns 拆分后的数组 分隔后的数组
 */
let getSplitArray = (str) => {
  return str.trim() == "" ? [] : str.trim().split(/[,，\s]+/g);
}
/**
 * 保留两位小数
 * @param {number} decimal 传入的小数
 * @returns 保留2位小数的结果
 */
let keepTwoDecimalPlaces = (decimal) => {
  return Number(((decimal) * 100).toFixed(2)) + "%";
}
/**
 * 根据年份和月份获取该月有多少天
 */
let getMaxDateInMonth = (yearMonth) => {
  // 截至月份的最后一天
  let year = new Date(`${yearMonth}-01`).getFullYear();
  let month = new Date(`${yearMonth}-01`).getMonth() + 1;
  let monthsHave31Dates = [1, 3, 5, 7, 8, 10, 12], monthsHave30Dates = [4, 6, 9, 11];
  let lastDate = monthsHave31Dates.indexOf(month) > -1 ? 31 :
    monthsHave30Dates.indexOf(month) > -1 ? 30 :
      year % 4 == 0 && year % 100 != 0 ? 29 :
        year % 400 == 0 ? 29 : 28;
  return lastDate;
}
// 数额千分位显示
let stateFormat = (row, column, cellValue, index) => {
  cellValue += '';
  if (!cellValue.includes('.')) cellValue += '.';
  return cellValue.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
    return $1 + ',';
  }).replace(/\.$/, '');
}
let publicFuncObj = {
  getYearWeek,
  getPeriod,
  formatCurrDate,
  formatCurrDateNoLine,
  formatCurrMonth,
  modifyTimeFormat,
  flexColumnWidth,
  downloadFile,
  showModalTips,
  getSplitArray,
  getMaxDateInMonth,
  keepTwoDecimalPlaces,
  stateFormat
};
export default publicFuncObj;
