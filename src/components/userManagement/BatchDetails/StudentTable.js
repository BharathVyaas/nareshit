import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchStudentListbyTechModule } from "../../../store/root.actions";
import StudentTableRender from "./StudentTableRender";

// styles
const cellStyle = {
  fontFamily: "Roboto",
  fontSize: "1rem",
  color: "#636363",
  fontStyle: "normal",
};
const tableHeight = "500px";
const tableWidth = "1300px";

function StudentTableComponent({
  studentsList,
  isLoading,
  isError,
  technologyId,
  moduleId,
  fetchStudentsList,
}) {
  useEffect(() => {
    fetchStudentsList();
  }, []);

  return (
    <div className="flex justify-center mt-20">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <i>Something went wrong. Please try refreshing.</i>
      ) : (
        <StudentTableRender
          studentsList={studentsList}
          cellStyle={cellStyle}
          tableHeight={tableHeight}
          tableWidth={tableWidth}
        />
      )}
    </div>
  );
}

const mapStateToComponent = (state) => ({
  studentsList: state.studentListByTechModuleReducer.data,
  isLoading: state.studentListByTechModuleReducer.isLoading,
  isError: state.studentListByTechModuleReducer.isError,
  technologyId: state.userManagementPageReducer.technologyId,
  moduleId: state.userManagementPageReducer.moduleId,
});

const mapDispatch = {
  fetchStudentsList: (payload) => fetchStudentListbyTechModule(payload),
};

const StudentTable = connect(mapStateToComponent, mapDispatch)(
  StudentTableComponent,
  mapDispatch
);

export default StudentTable;
