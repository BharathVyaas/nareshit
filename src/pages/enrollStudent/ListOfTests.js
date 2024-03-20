import React, { useState, useEffect, useRef } from "react";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import axios from "axios";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBatchList,
  fetchStudentList,
  fetchTestList,
} from "../../store/root.actions";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import {
  enrollStudentSlice,
  setTestIdList,
} from "../../store/slice/enrollStudent.slice";
import { NavLink } from "react-router-dom";

const fetchTestTableHandler = async (technologyId, moduleId, setter) => {
  try {
    const res = await axios.post(
      "https://www.nareshit.net/Listof_AvailableTests",
      {
        TechnologyId: technologyId,
        ModuleId: moduleId,
      }
    );
    setter(res.data.dbresult || []);
  } catch (err) {
    console.error(err);
  }
};

function ListOfTests() {
  const [selectedTechnology, setSelectedTechnology] = useState(0);
  const [selectedModule, setSelectedModule] = useState(0);
  const [testData, setTestData] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const store = useSelector((store) => store);
  const dispatch = useDispatch();

  const onTestSelect = (e, selectedTest_Id) => {
    if (!e.target.checked) {
      if (selectedTests.includes(selectedTest_Id)) {
        const index = selectedTests.indexOf(selectedTest_Id);
        if (index !== -1) {
          const updatedselectedTests = [...selectedTests];
          updatedselectedTests.splice(index, 1);
          setSelectedTests(updatedselectedTests);
        }
      }
    } else {
      if (e.target.checked) {
        setSelectedTests((prev) => {
          const updatedselectedTests = [...prev];
          updatedselectedTests.push(selectedTest_Id);
          return updatedselectedTests;
        });
      }
    }
  };

  useEffect(() => {
    if (selectedTests.length > 0) dispatch(setTestIdList(selectedTests));
  }, [selectedTests]);

  /*
  useEffect(() => {
    dispatch(fetchStudentList(1));
  }, []);*/

  return (
    <>
      {/*  */}
      <header className="bg-gray-100 max-w-full overflow-hidden">
        <EnrollStudentNavigation />
      </header>

      <main className="mt-8">
        {/**  DropDowns */}
        <section className="">
          <TechnologySelector
            setter={setTestData}
            fetchHandler={fetchTestTableHandler}
            selectedTechnology={selectedTechnology}
            selectedModule={selectedModule}
            setSelectedTechnology={setSelectedTechnology}
            setSelectedModule={setSelectedModule}
          />
        </section>

        {/**  Test Table */}
        <section className="mt-10">
          <TestTable testData={testData} onTestSelect={onTestSelect} />
          <div className="w-4/6 mx-auto mt-5">
            <Button variant="contained">
              <NavLink to="/enroll-student/batch-selection">
                Show Batches
              </NavLink>
            </Button>
          </div>
        </section>
      </main>

      {/*  */}
      <footer className="grid place-content-center p-6 w-full max-w-full overflow-hidden absolute bottom-0 bg-gray-100">
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default ListOfTests;
