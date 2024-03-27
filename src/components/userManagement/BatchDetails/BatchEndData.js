import { Input, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEndDate } from "../../../store/slice/userManagement.slice";

function BatchEndData() {
  const dispatch = useDispatch();
  const { endDate } = useSelector((store) => store.userManagementPageReducer);

  return (
    <>
      <InputLabel htmlFor="end-date" className="mr-2">
        End Date
      </InputLabel>
      <Input
        id="end-date"
        type="date"
        className="ps-2"
        value={endDate}
        onChange={(e) => dispatch(setEndDate(e.target.value))}
      />
    </>
  );
}

export default BatchEndData;
