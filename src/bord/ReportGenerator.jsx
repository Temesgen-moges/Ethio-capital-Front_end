import axios from "axios";
import { saveAs } from "file-saver";
import { BOARD } from "../APIRoutes/routes";

const ReportGenerator = () => {
  const generateReport = async () => {
    try {
      const response = await axios.get(BOARD, {
        responseType: "blob", // Ensures correct file format
      });

      saveAs(response.data, "board-report.pdf");
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      onClick={generateReport}
    >
      Generate Report
    </button>
  );
};

export default ReportGenerator;
