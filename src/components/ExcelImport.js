import React from "react";

function ExcelImport({ onFileChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  const openFileDialog = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  return (
    <div className="flex items-center space-x-2">
      <button className=" font-medium cursor-pointer" onClick={openFileDialog}>
        Import xlsx
      </button>
      <input
        type="file"
        accept=".xlsx, .xls"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ExcelImport;
