import XLSX from "xlsx";
import { writeFile } from "fs/promises";

// Convert Excel to JSON
const excelToJson = async () => {
  try {
    const workbook = XLSX.readFile("Data.xlsx");
    const worksheet = workbook.Sheets["Quizzes"];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Reconstruct original JSON format
    const reconstructedData = jsonData.map(item => ({
      question: item["Question"] || "",
      category: item["Category"] || "",
      options: [
        item["Option A"] || "",
        item["Option B"] || "",
        item["Option C"] || "",
        item["Option D"] || ""
      ],
      answer: item["Answer"] || "",
      details: item["Details"] || "",
      images: item["Images"] ? item["Images"].split(", ").map(url => url.trim()) : [], // Split and trim images into an array
      videos: item["Videos"] ? item["Videos"].split(", ").map(url => url.trim()) : [] // Split and trim videos into an array
    }));

    await writeFile("quizData_reconstructed.json", JSON.stringify(reconstructedData, null, 2));

    console.log("Excel converted back to 'quizData_reconstructed.json'");
  } catch (error) {
    console.error("Error converting Excel to JSON:", error);
  }
};

excelToJson();
