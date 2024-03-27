import { Input, InputLabel, TextField } from "@mui/material";
import ModuleDropDown from "./ModuleDropDown";
import TechnologyDropDown from "./TechnologyDropDown";
import FacultyDropDown from "./FacultyDropDown";
import MentoreDropDown from "./MentoreDropDown";
import BatchNameField from "./BatchNameField";
import BatchAdminField from "./BatchAdminField";
import BatchStartDate from "./BatchStartDate";
import BatchEndData from "./BatchEndData";

function BatchSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <TechnologyDropDown />
      </div>

      <div>
        <ModuleDropDown />
      </div>

      <div className="flex items-center">
        <BatchNameField />
      </div>

      <div className="flex items-center">
        <BatchAdminField />
      </div>

      <div>
        <FacultyDropDown />
      </div>

      <div>
        <MentoreDropDown />
      </div>

      <div className="flex items-center">
        <BatchStartDate />
      </div>

      <div className="flex items-center">
        <BatchEndData />
      </div>
    </div>
  );
}

export default BatchSelector;
