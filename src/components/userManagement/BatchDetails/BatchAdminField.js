import { Input, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBatchAdmin } from "../../../store/slice/userManagement.slice";

function BatchAdminField() {
  const dispatch = useDispatch();
  const { batchAdmin } = useSelector(
    (store) => store.userManagementPageReducer
  );

  return (
    <>
      <InputLabel htmlFor="batch-admin" className="mr-2">
        Batch Admin
      </InputLabel>
      <Input
        id="batch-admin"
        className="ps-2"
        value={batchAdmin}
        onChange={(e) => dispatch(setBatchAdmin(e.target.value))}
      />
    </>
  );
}

export default BatchAdminField;
