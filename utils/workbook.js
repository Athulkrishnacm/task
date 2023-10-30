const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();

const readWorkbook = (root) => {
    return new Promise(async (resolve, reject) => {
        const data = [];

        try {
            await workbook.xlsx.readFile('public/sheets/samsung.xlsx');

            const worksheet = workbook.getWorksheet(1);
            worksheet.eachRow({ includeEmpty: false }, function (row) {
                const rowData = row.values;
                data.push(rowData);
            });

            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = readWorkbook;




