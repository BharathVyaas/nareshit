import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentList } from "../../../store/root.actions";

function BatchRenderer({ batch }) {
  const dispatch = useDispatch();
  const [displayStudents, setDisplayStudents] = useState(false);
  const { data } = useSelector((store) => store.studentListReducer);

  useEffect(() => {
    if (displayStudents) dispatch(fetchStudentList(batch.BatchId));
  }, [displayStudents]);

  return (
    <>
      <div className="flex">
        <p
          onClick={() => {
            setDisplayStudents((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          <ArrowForwardIosIcon fontSize="10" />
        </p>
        <p className="px-3">{batch.BatchName}</p>
      </div>
      {displayStudents && (
        <div className="ms-7">
          <p>hi</p>
        </div>
      )}
    </>
  );
}

export default BatchRenderer;
