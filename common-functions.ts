// Format a number to currency
export const formatCurrency = (amount: number, locale: string = 'en-US', currency: string = 'USD'): string => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
};

// Capitalize the first letter of a string
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// excelToJson function to convert Excel file to JSON
import xlsx from "xlsx";
const excelToJson = (buffer: Buffer) => {
    const workbook = xlsx.read(buffer, { type: "buffer" }); // Read XLSX from buffer
    const sheetName = workbook.SheetNames[0];
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
};
