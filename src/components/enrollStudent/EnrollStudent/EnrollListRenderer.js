import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchEnrollList } from "../../../store/root.actions";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";

function EnrollListRendererComponent({ enrollList, fetchEnrollListAction }) {
  const [enrollData, setEnrollData] = useState([]);

  useEffect(() => {
    setEnrollData(enrollList || []);
  }, [enrollList]);

  useEffect(() => {
    fetchEnrollListAction();
  }, []);

  return (
    <div>
      <div className="max-h-[60vh] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-300">
              <th className="py-3 px-4 text-left">EnrollmentId</th>
              <th className="py-3 px-4 text-left">No_Of_Batches</th>
              <th className="py-3 px-4 text-left">No_Of_Students</th>
              <th className="py-3 px-4 text-left">No_Of_Tests</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollData.map((enrollRecord) => (
              <EnrollRecordRenderer
                key={enrollRecord.EnrollmentId}
                enrollRecord={enrollRecord}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToRendererProps = (state) => ({
  enrollList: state.enrollListReducer.data,
});

const mapDispatchToRendererProps = {
  fetchEnrollListAction: fetchEnrollList,
};

const EnrollListRenderer = connect(
  mapStateToRendererProps,
  mapDispatchToRendererProps
)(EnrollListRendererComponent);

export default EnrollListRenderer;

function EnrollRecordRenderer({ enrollRecord }) {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      <td className="py-3 px-4 text-left">{enrollRecord.EnrollmentId}</td>
      <td className="py-3 px-4 text-left">{enrollRecord.No_Of_Batches}</td>
      <td className="py-3 px-4 text-left">{enrollRecord.No_Of_Students}</td>
      <td className="py-3 px-4 text-left">{enrollRecord.No_Of_Tests}</td>
      <td className="py-3 px-4 text-left">
        <NavLink
          to={`/enroll-student/tests?edit=true&enrollId=${enrollRecord.EnrollmentId}`}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </NavLink>
      </td>
    </tr>
  );
}
