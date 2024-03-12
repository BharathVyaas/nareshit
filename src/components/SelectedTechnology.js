import React, { useEffect } from "react";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";

<<<<<<< HEAD
function SelectedTechnology({
  proglang,
  setProgLang,
  programmingLanguages,
  editTechnologyId,
  editedSelectProgrammingLanguage,
}) {
=======
function SelectedTechnology({ proglang, setProgLang, programmingLanguages }) {
>>>>>>> origin/main
  useEffect(() => {
    const data = programmingLanguages.find(
      (element) => element.TechnologyName === proglang
    );

    BuilderService.requestData.assessments.technology = data;
    LocalStorage.technology = data;
<<<<<<< HEAD
    BuilderService.id.technologyId = data?.TechnologyID;
=======
    BuilderService.id.technologyId = data.TechnologyID;
>>>>>>> origin/main
  }, [proglang]);

  return (
    <div className="flex flex-col mb-5">
      <div className=" mx-4">
        <label htmlFor="proglang">Select Technology:</label>
        <select
          id="proglang"
          name="proglang"
          className="mx-6 w-[200px]"
<<<<<<< HEAD
          defaultChecked={
            editedSelectProgrammingLanguage?.TechnologyName || editTechnologyId
          }
          defaultValue={
            editedSelectProgrammingLanguage?.TechnologyName || editTechnologyId
          }
          value={proglang}
          onChange={(e) => setProgLang(e.target.value)}
        >
          <option value={"Select A Technology"}>Select A Technology</option>
=======
          value={proglang}
          onChange={(e) => setProgLang(e.target.value)}
        >
>>>>>>> origin/main
          {programmingLanguages.map(({ TechnologyID, TechnologyName }) => (
            <option key={TechnologyID} value={TechnologyName}>
              {TechnologyName}
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
