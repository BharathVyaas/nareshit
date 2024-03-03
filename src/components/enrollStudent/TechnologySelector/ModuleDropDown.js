import { useEffect, useState } from "react";
import Select from "../../../ui/EnrollStudent/Select";

function ModuleDropDown({ dispatcher }) {
  const [moduleId, setModuleId] = useState("0");

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "moduleId", payload: Number(moduleId) });
  }, [moduleId]);

  return (
    <Select
      defaultValue={moduleId}
      setter={setModuleId}
      options={[
        { id: 1, value: 1, option: "DotNet" },
        { id: 2, value: 2, option: "Java" },
      ]}
    />
  );
}

export default ModuleDropDown;
