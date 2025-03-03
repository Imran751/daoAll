import * as XLSX from "xlsx";
import { readFile } from "fs/promises";

// Convert JSON to Excel
const jsonToExcel = async () => {
  try {
    const jsonData = JSON.parse(await readFile("data.json", "utf-8"));

    // Format data for Excel
    const formattedData = jsonData.map((item, index) => ({
      "S.No": index + 1,
      "Question": item.question,
      "Category": item.category,
      "Option A": item.options[0],
      "Option B": item.options[1],
      "Option C": item.options[2],
      "Option D": item.options[3],
      "Answer": item.answer,
      "Details": item.details,
      "Images": item.images,
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
