import { Input, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate } from "../../../store/slice/userManagement.slice";

function BatchStartDate() {
  const dispatch = useDispatch();
  const { startDate } = useSelector((store) => store.userManagementPageReducer);

  return (
    <>
      <InputLabel htmlFor="start-date" className="mr-2">
        Start Date
      </InputLabel>
      <Input
        id="start-date"
        type="date"
        className="ps-2"
        value={startDate}
        onChange={(e) => dispatch(setStartDate(e.target.value))}
      />
    </>
  );
}

export default BatchStartDate;
