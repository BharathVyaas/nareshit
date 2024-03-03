import { useEffect, useState } from "react";
import Select from "../../../ui/EnrollStudent/Select";

function TechnologyDropDown({ dispatcher }) {
  const [technologyId, setTechnologyId] = useState("0");

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "technologyId", payload: Number(technologyId) });
  }, [technologyId]);

  return (
    <Select
      defaultValue={technologyId}
      setter={setTechnologyId}
      options={[
        { id: "1", value: "1", option: "DotNet" },
        { id: "2", value: "2", option: "Java" },
      ]}
    />
  );
}

export default TechnologyDropDown;
