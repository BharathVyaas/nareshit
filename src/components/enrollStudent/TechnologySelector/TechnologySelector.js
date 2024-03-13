import { useReducer } from "react";
import DateDropDown from "./DateDropDown";
import ModuleDropDown from "./ModuleDropDown";
import SubTopicDropDown from "./SubTopicDropDown";
import TechnologyDropDown from "./TechnologyDropDown";
import TopicDropDown from "./TopicDropDown";

function reducerHelper(state, type, data) {
  const copy = { ...state };
  copy[type] = data;

  return copy;
}

function technologyDataReducer(state, action) {
  switch (action.type) {
    case "technologyId": {
      return reducerHelper(state, "technologyId", action.payload);
    }
    case "moduleId": {
      return reducerHelper(state, "moduleId", action.payload);
    }
    default: {
      throw new Error("technologyDataReducer: Not A valied action.type");
    }
  }
}

const initialTechnologyData = {
  technologyId: 0,
  moduleId: 0,
};

function TechnologySelector() {
  // techonlogyData doesn't only contains TechnologyDropDown it contains all data related to DropDowns Sections
  const [technologyData, dispatcher] = useReducer(
    technologyDataReducer,
    initialTechnologyData
  );

  return (
    <div className="w-full text-center mb-6 mt-4 container flex justify-center mx-auto">
      <TechnologyDropDown
        technologyData={technologyData}
        dispatcher={dispatcher}
      />

      <ModuleDropDown technologyData={technologyData} dispatcher={dispatcher} />
    </div>
  );
}

export default TechnologySelector;