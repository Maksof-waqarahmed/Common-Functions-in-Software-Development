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

export const jsonToCsv = <T = any>(jsonData: T[]): Buffer => {
    const worksheet = xlsx.utils.json_to_sheet(jsonData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    return xlsx.write(workbook, { type: "buffer", bookType: "csv" });
};

const getBase64ImageFromURL = async (url: string): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(
            `Failed to fetch image from ${url}: ${response.statusText}`
        );
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString("base64");
    const mimeType = response.headers.get("content-type") || "image/png";
    return `data:${mimeType};base64,${base64String}`;
};

export const formatDate = (dateInput: string | Date | null): string => {
    if (!dateInput) return "N/A";

    let date: Date;
    if (dateInput instanceof Date) {
        date = dateInput;
    } else {
        date = new Date(dateInput);
    }

    if (isNaN(date.getTime())) return "N/A";

    const day = date.getDate();
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Adding ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (num: number) => {
        if (num > 3 && num < 21) return "th";
        switch (num % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

import QRCode from "qrcode";
async function generateQRCode(text: any) {
    try {
        return await QRCode.toDataURL(text, {
            errorCorrectionLevel: "H",
            margin: 1,
            width: 150,
        });
    } catch (err) {
        console.error("Error generating QR code:", err);
        return "";
    }
}

import { format } from "date-fns";
export const convertToIST = (date: Date, formatStr = "yyyy-MM-dd HH:mm:ss") => {
    // Get the current date in UTC, and then add 5 hours 30 minutes to it
    const istDate = new Date(date.getTime() + (5 * 60 + 30) * 60000);

    // Return the formatted IST date
    return format(istDate, formatStr);
};
