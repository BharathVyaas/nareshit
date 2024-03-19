import { useReducer } from "react";
import DateDropDown from "./DateDropDown";
import ModuleDropDown from "./ModuleDropDown";
import SubTopicDropDown from "./SubTopicDropDown";
import TechnologyDropDown from "./TechnologyDropDown";
import TopicDropDown from "./TopicDropDown";
import { Button } from "@mui/material";

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

function TechnologySelector({setter, fetchHandler,selectedTechnology, selectedModule, setSelectedTechnology, setSelectedModule}) {
  // techonlogyData doesn't only contains TechnologyDropDown it contains all data related to DropDowns Sections
  const [technologyData, dispatcher] = useReducer(
    technologyDataReducer,
    initialTechnologyData
  );

  return (
    <div className="w-4/6 text-center mb-6 mt-4 container flex justify-between mx-auto">
      <TechnologyDropDown
        technologyData={technologyData}
        dispatcher={dispatcher}
        setSelectedTechnology={setSelectedTechnology}
      />

      <ModuleDropDown technologyData={technologyData} dispatcher={dispatcher} setSelectedModule={setSelectedModule} />

      
      <Button variant="contained" sx={{width: '8rem'}} onClick={() => fetchHandler(selectedTechnology, selectedModule, setter)}>Fetch</Button>
    </div>
  );
}

export default TechnologySelector;