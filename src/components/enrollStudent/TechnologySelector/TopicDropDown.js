import { useEffect, useState } from "react";
import Select from "../../../ui/EnrollStudent/Select";

function TopicDropDown({ dispatcher }) {
  const [topicId, setTopicId] = useState("0");

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "topicId", payload: Number(topicId) });
  }, [topicId]);

  return (
    <Select
      defaultValue={topicId}
      setter={setTopicId}
      options={[
        { id: 1, value: 1, option: "DotNet" },
        { id: 2, value: 2, option: "Java" },
      ]}
    />
  );
}

export default TopicDropDown;
