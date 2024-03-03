import { useEffect, useState } from "react";
import Select from "../../../ui/EnrollStudent/Select";

function SubTopicDropDown({ dispatcher }) {
  const [subTopicId, setSubTopicId] = useState("0");

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "subTopicId", payload: Number(subTopicId) });
  }, [subTopicId]);

  return (
    <Select
      defaultValue={subTopicId}
      setter={setSubTopicId}
      options={[
        { id: 1, value: 1, option: "DotNet" },
        { id: 2, value: 2, option: "Java" },
      ]}
    />
  );
}

export default SubTopicDropDown;
