import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  fetchBatchList,
  fetchTestList,
  retriveTestSelectionPageDetails,
} from "../../store/root.actions";
import {
  setModule,
  setTechnology,
  setTestIdList,
} from "../../store/slice/enrollStudent.slice";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import axios from "axios";
import {
  getEnrollmentSubmitData,
  getFormatedExcludes,
} from "../../util/helper";
import { useLocation } from "react-router";

function ListOfTests() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const enrollId = queryParams.get("enrollId") || 0;
  const [selectedTests, setSelectedTests] = useState([]);
  const [testData, setTestData] = useState([]);
  const [isNotSelected, setIsNotSelected] = useState({
    technology: false,
    module: false,
  });

  const { data: testList, isLoading } = useSelector(
    (store) => store.testListReducer
  );
  const { technology: selectedTechnology, module: selectedModule } =
    useSelector((store) => store.enrollStudentReducer);
  const { includedStudents, testIdList, batchIdList } = useSelector(
    (store) => store.enrollStudentReducer
  );

  const { TechnologyId: retrivedTechnologyId, ModuleId: retrivedModuleId } =
    useSelector((store) => store?.testSelectionPageReducer?.data?.[0] || {});

  useEffect(() => {
    dispatch(setTechnology(retrivedTechnologyId || 0));
    dispatch(setModule(retrivedModuleId || 0));
  }, [retrivedTechnologyId, retrivedModuleId]);

  useEffect(() => {
    if (enrollId) dispatch(retriveTestSelectionPageDetails(enrollId));
  }, []);

  useEffect(() => {
    setTestData(testList || []);
  }, [testList]);

  useEffect(() => {
    if (isNotSelected.technology || isNotSelected.module) {
      setIsNotSelected((prev) => ({
        ...prev,
        technology: false,
        module: false,
      }));
    }
  }, [selectedTechnology, selectedModule, isLoading]);

  const onTestSelect = (e, selectedTest_Id) => {
    if (!e.target.checked) {
      setSelectedTests((prev) => prev.filter((id) => id !== selectedTest_Id));
    } else {
      setSelectedTests((prev) => [...prev, selectedTest_Id]);
    }
  };

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

  useEffect(() => {
    dispatch(setTestIdList(selectedTests));
  }, [selectedTests]);

  const submitHandler = async () => {
    try {
      let filteredIncludedStudents = getFormatedExcludes(includedStudents);
      let result = getEnrollmentSubmitData({
        enrollId,
        selectedTechnology,
        selectedModule,
        filteredIncludedStudents,
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
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100">
        <EnrollStudentNavigation />
      </header>

      <main className="flex-grow mt-8 mb-8">
        <section>
          <TechnologySelector
            fetchHandler={fetchTestTableHandler}
            isNotSelected={isNotSelected}
          />
        </section>

        <section className="mt-10 flex-grow">
          <TestTable testData={testData} onTestSelect={onTestSelect} />
          <div className="w-4/6 mx-auto mt-5">
            <Button variant="contained" onClick={submitHandler}>
              Submit
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 p-6">
        <div className="max-w-full overflow-hidden">
          © 2023 Naresh i Technologies | Software Training - Online | All Rights
          Reserved.
        </div>
      </footer>
    </div>
  );
}

export default ListOfTests;
