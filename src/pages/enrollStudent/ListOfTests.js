import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { fetchBatchList, fetchTestList } from "../../store/root.actions";
import { setTestIdList } from "../../store/slice/enrollStudent.slice";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import axios from "axios";
import {
  getEnrollmentSubmitData,
  getFormatedExcludes,
} from "../../util/helper";

/**
 * Component for listing tests and selecting them for enrollment.
 * @returns {JSX.Element} ListOfTests component.
 */
function ListOfTests() {
  const dispatch = useDispatch();
  const [selectedTests, setSelectedTests] = useState([]);
  const [testData, setTestData] = useState([]);
  // To validate select fileds on fetch button for tests
  const [isNotSelected, setIsNotSelected] = useState({
    technology: false,
    module: false,
  });

  const { data: testList, isLoading } = useSelector(
    (store) => store.testListReducer
  );
  const { technology: selectedTechnology, module: selectedModule } =
    useSelector((store) => store.enrollStudentReducer);
  const { excludedStudents } = useSelector(
    (store) => store.enrollStudentReducer
  );

  // Update local test data when the API response changes
  useEffect(() => {
    setTestData(testList || []);
  }, [testList]);

  // Reset warning flags when technology or module changes
  useEffect(() => {
    if (isNotSelected.technology || isNotSelected.module) {
      setIsNotSelected((prev) => ({
        ...prev,
        technology: false,
        module: false,
      }));
    }
  }, [selectedTechnology, selectedModule, isLoading]);

  // Handle test selection
  const onTestSelect = (e, selectedTest_Id) => {
    if (!e.target.checked) {
      setSelectedTests((prev) => prev.filter((id) => id !== selectedTest_Id));
    } else {
      setSelectedTests((prev) => [...prev, selectedTest_Id]);
    }
  };

  // Fetch test data based on selected technology and module
  const fetchTestTableHandler = () => {
    if (selectedTechnology && selectedModule) {
      dispatch(
        fetchTestList({
          technologyId: selectedTechnology,
          moduleId: selectedModule,
        })
      );

      dispatch(
        fetchBatchList({
          technologyId: selectedTechnology,
          moduleId: selectedModule,
        })
      );
    } else {
      setIsNotSelected((prev) => ({
        ...prev,
        technology: !selectedTechnology,
        module: !selectedModule,
      }));
    }
  };

  // Update Redux store with selected test IDs
  useEffect(() => {
    dispatch(setTestIdList(selectedTests));
  }, [selectedTests]);

  const submitHandler = async () => {
    try {
      const enrollmentId = 0;

      let filteredExcludedStudents = getFormatedExcludes(excludedStudents);
      let result = getEnrollmentSubmitData({
        enrollmentId,
        selectedTechnology,
        selectedModule,
        filteredExcludedStudents,
      });

      const response = await axios.post(
        "https://www.nareshit.net/EnrollTest",
        result
      );

      console.log(
        "url",
        "https://www.nareshit.net/EnrollTest",
        "req",
        result,
        "res",
        response
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className="bg-gray-100 max-w-full overflow-hidden">
        <EnrollStudentNavigation />
      </header>

      <main className="mt-8">
        <section className="">
          {/* Technology & Module selection */}
          <TechnologySelector
            fetchHandler={fetchTestTableHandler}
            isNotSelected={isNotSelected}
          />
        </section>

        <section className="mt-10">
          {/* Test table component */}
          <TestTable testData={testData} onTestSelect={onTestSelect} />
          <div className="w-4/6 mx-auto mt-5">
            {/*  */}
            <Button variant="contained" onClick={submitHandler}>
              Submit
            </Button>
          </div>
        </section>
      </main>

      <footer className="grid place-content-center p-6 w-full max-w-full overflow-hidden absolute bottom-0 bg-gray-100">
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default ListOfTests;
