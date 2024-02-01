import React from "react";

function SelectedTechnology({ proglang, setProgLang, programmingLanguages }) {
  return (
    <div className="flex flex-col mb-5">
      <div className=" mx-4">
        <label htmlFor="proglang">Select Technology:</label>
        <select
          id="proglang"
          name="proglang"
          className="mx-6 w-[100px]"
          value={proglang}
          onChange={(e) => setProgLang(e.target.value)}
        >
          {programmingLanguages.map(({ id, language }) => (
            <option key={id} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      {/* Assessment radio */}
      <label htmlFor="catogaryType" className="mt-4 ml-4 pl-5">
        <input
          id="catogaryType"
          type="radio"
          checked
          disabled
          name="catogaryType"
        />
        <span className="p-2">Assessment</span>
      </label>
    </div>
  );
}

export default SelectedTechnology;
