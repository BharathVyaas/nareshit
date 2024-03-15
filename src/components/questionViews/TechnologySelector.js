import React from "react";
import ModuleDropDown from "./ModuleDropDown";
import TopicDropDown from "./TopicDropDown";
import SubTopicDropDown from "./SubTopicDropDown";

function TechnologySelector() {
  return (
    <div className="flex">
      <ModuleDropDown />
      <TopicDropDown />
      <SubTopicDropDown />
    </div>
  );
}

export default TechnologySelector;
