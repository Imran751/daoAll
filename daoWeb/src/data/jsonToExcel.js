import * as XLSX from "xlsx";
import { readFile } from "fs/promises";

// Convert JSON to Excel
const jsonToExcel = async () => {
  try {
    const jsonData = JSON.parse(await readFile("dataa.json", "utf-8"));

    // Format data for Excel
    const formattedData = jsonData.map((item, index) => ({
      "S.No": index + 1,
      "Question": item.question || "",
      "Marks": item.marks || "",
      "Category": item.category || "",
      "SubCategory": item.subCategory || "",
      "Topic": item.topic || "",
      "Option A": item.options?.[0] || "",
      "Option B": item.options?.[1] || "",
      "Option C": item.options?.[2] || "",
      "Option D": item.options?.[3] || "",
      "Answer": item.answer || "",
      "Details": item.details || "",
      "Images": Array.isArray(item.images) ? item.images.join(", ") : "", // Safely handle undefined or non-array images
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quizzes");

    XLSX.writeFile(workbook, "Data.xlsx");

    console.log("Excel file created as 'Data.xlsx'");
  } catch (error) {
    console.error("Error converting JSON to Excel:", error);
  }
};

jsonToExcel();
