/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

/**
 * 文件下载，保存csv格式
 * @param content 文件内容
 * @param filename 文件名
 */
const downloadCSV = (content: string, filename: string) => {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.appendChild(link);
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `${filename}.csv`);
    link.click();
};

export default downloadCSV;
