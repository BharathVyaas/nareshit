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
    case "topicId": {
      return reducerHelper(state, "topicId", action.payload);
    }
    case "subTopicId": {
      return reducerHelper(state, "subTopicId", action.payload);
    }
    case "startDate": {
      return reducerHelper(state, "startDate", action.payload);
    }
    case "endDate": {
      return reducerHelper(state, "endDate", action.payload);
    }
    default: {
      throw new Error("technologyDataReducer: Not A valied action.type");
    }
  }
}

const initialTechnologyData = {
  technologyId: 0,
  moduleId: 0,
  topicId: 0,
  subTopicId: 0,
  startDate: "",
  endDate: "",
};

function TechnologySelector() {
  const [technologyData, dispatcher] = useReducer(
    technologyDataReducer,
    initialTechnologyData
  );

  console.log(technologyData);

  return (
    <div>
      <div className="mx-auto">
        <TechnologyDropDown
          technologyData={technologyData}
          dispatcher={dispatcher}
        />
        <ModuleDropDown
          technologyData={technologyData}
          dispatcher={dispatcher}
        />
      </div>
    </div>
  );
}

export default TechnologySelector;
