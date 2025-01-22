import XLSX from "xlsx";
import { writeFile } from "fs/promises";

// Convert Excel to JSON (including ID column)
const excelToJsonWithId = async () => {
  try {
    const workbook = XLSX.readFile("QuizData.xlsx");
    const worksheet = workbook.Sheets["Quizzes"];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Include the 'ID' from the Excel sheet
    const reconstructedData = jsonData.map(item => ({
      id: item["ID"],  // Pull the ID from the first column
      question: item["Question"],
      category: item["Category"],
      options: [item["Option A"], item["Option B"], item["Option C"], item["Option D"]],
      answer: item["Answer"],
      details: item["Details"],
    }));

    await writeFile("quizData_with_id.json", JSON.stringify(reconstructedData, null, 2));

    console.log("Excel converted back to 'quizData_with_id.json' with IDs from Excel");
  } catch (error) {
    console.error("Error converting Excel to JSON:", error);
  }
};

excelToJsonWithId();
