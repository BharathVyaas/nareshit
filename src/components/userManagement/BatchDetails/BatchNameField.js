import { Input, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBatchName } from "../../../store/slice/userManagement.slice";

function BatchNameField() {
  const dispatch = useDispatch();
  const { batchName } = useSelector((store) => store.userManagementPageReducer);

  return (
    <>
      <InputLabel htmlFor="batch-name" className="mr-2">
        Batch Name
      </InputLabel>
      <Input
        id="batch-name"
        className="ps-2"
        value={batchName}
        onChange={(e) => dispatch(setBatchName(e.target.value))}
      />
    </>
  );
}

export default BatchNameField;
