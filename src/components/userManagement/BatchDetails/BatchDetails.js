import { Button } from "@mui/material";
import StudentTable from "./StudentTable";
import BatchSelector from "./BatchSelector";
import { useSelector } from "react-redux";

function BatchDetails() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  console.log(useSelector((store) => store.userManagementPageReducer));
  return (
    <div>
      <form>
        <div className="flex flex-wrap gap-4 justify-between">
          <BatchSelector />
        </div>
        <div>
          <StudentTable />
        </div>

        <Button variant="contained" onClick={onSubmit}>
          Create Batch
        </Button>
      </form>
    </div>
  );
}

export default BatchDetails;
