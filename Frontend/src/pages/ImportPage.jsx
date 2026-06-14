import { useState } from "react";
import api from "../services/api";

function ImportPage() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();

    formData.append("file", file);

    const res = await api.post(
      "/import/csv",
      formData
    );

    alert(
      `Rows: ${res.data.totalRows}
Issues: ${res.data.totalIssues}`
    );
  };

  const processImport = async () => {
    const res = await api.post(
      "/import/process"
    );

    alert(
      `Imported ${res.data.importedCount} expenses`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          CSV Import
        </h2>

        <p className="text-gray-500 mb-6">
          Upload your expense CSV file and import it into the system.
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="w-full text-gray-600"
          />

          {file && (
            <p className="mt-3 text-sm text-green-600 font-medium">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <button
            onClick={uploadFile}
            disabled={!file}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Upload CSV
          </button>

          <button
            onClick={processImport}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Process Import
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportPage;