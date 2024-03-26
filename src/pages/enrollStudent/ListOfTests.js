import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  fetchBatchList,
  fetchTestList,
  retriveTestSelectionPageDetails,
  submitEnrollStudentPage,
} from "../../store/root.actions";
import {
  resetEnrollStudentDetailsSlice,
  setBatchIdList,
  setExcludedArray,
  setIncludedStudents,
  setModule,
  setTechnology,
  setTestIdList,
} from "../../store/slice/enrollStudent.slice";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import {
  getEnrollmentSubmitData,
  getEnrollmentSubmitDataFromExcludes,
  getFilteredEnrollStudentSlice,
  getFormatedExcludes,
} from "../../util/helper";
import { useLocation, useNavigation } from "react-router";
import { testListSlice } from "../../store/root.slice";
import SubmitModal from "../../ui/EnrollStudent/modal/SubmitModal";
import Modal from "../../ui/Modal";

function ListOfTests() {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const edit = queryParams.get("edit") === "true" ? true : false;
  const enrollId = queryParams.get("enrollId") || 0;
  const [selectedTests, setSelectedTests] = useState([]);
  const [testData, setTestData] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(true);
  const [isNotSelected, setIsNotSelected] = useState({
    technology: false,
    module: false,
  });

  const { data: testList, isLoading } = useSelector(
    (store) => store.testListReducer
  );
  const { technology: selectedTechnology, module: selectedModule } =
    useSelector((store) => store.enrollStudentReducer);
  const { excludedStudents, testIdList, batchIdList } = useSelector(
    (store) => store.enrollStudentReducer
  );

  const { TechnologyId: retrivedTechnologyId, ModuleId: retrivedModuleId } =
    useSelector((store) => store.testSelectionPageReducer).data?.[0] || {};

  const { data: retrivedData } = useSelector(
    (store) => store.testSelectionPageReducer
  );

  const {
    data: submitResponse,
    isLoading: isSubmitting,
    isError: isErrorSubmitting,
    state: submittionState,
    isSuccess: isSubmittionSuccess,
  } = useSelector((store) => store.submitEnrollStudentPageReducer);

  useEffect(() => {
    if (isSubmittionSuccess && submittionState === "resloved") {
      navigate("/enroll-student");
    }
  }, []);

  // Reset Data if id is 0
  useEffect(() => {
    if (enrollId === "0") {
      dispatch(resetEnrollStudentDetailsSlice());
      dispatch(testListSlice.actions.resetState());
    }
  }, [enrollId]);

  useEffect(() => {
    if (edit === true) {
      if (
        (!retrivedTechnologyId || !retrivedModuleId) &&
        retrivedTechnologyId === undefined &&
        retrivedModuleId === undefined
      ) {
        console.error(
          `Must pass both retriveTechnologyId ${retrivedTechnologyId}, retriveModuleId ${retrivedModuleId} tobe able to fetch testlist`
        );
      } else {
        dispatch(setTechnology(retrivedTechnologyId));
        dispatch(setModule(retrivedModuleId));
        dispatch(
          fetchTestList({
            technologyId: retrivedTechnologyId,
            moduleId: retrivedModuleId,
          })
        );
        dispatch(
          fetchBatchList({
            technologyId: retrivedTechnologyId,
            moduleId: retrivedModuleId,
          })
        );
      }
    }
  }, [retrivedTechnologyId, retrivedModuleId]);

  useEffect(() => {
    if (retrivedData && enrollId !== "0") {
      const { testIdList, batchIdList, studentIdList } =
        getFilteredEnrollStudentSlice(retrivedData);

      dispatch(
        setExcludedArray(
          Array.from(
            new Set(
              retrivedData.flatMap((_batch) => {
                const studentIds = _batch.StudentName?.split(",") || [];

                return studentIds.map(
                  (student) =>
                    _batch.TestID + ":" + _batch.BatchID + ":" + student
                );
              })
            )
          )
        )
      );
      // dispatch(setIncludedStudents(studentIdList));
      setSelectedTests(testIdList);
      dispatch(setTestIdList(testIdList));
      dispatch(setBatchIdList(batchIdList));
    }
  }, [retrivedData]);

  useEffect(() => {
    if (enrollId && edit === true)
      dispatch(retriveTestSelectionPageDetails(enrollId));
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
      let result = getEnrollmentSubmitDataFromExcludes({
        enrollId,
        selectedTechnology,
        selectedModule,
        testIdList,
        batchIdList,
        excludedStudents,
      });

      dispatch(submitEnrollStudentPage({ ...result }));
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
              {isErrorSubmitting
                ? "Error Submitting retry?"
                : isSubmitting
                ? "Loading..."
                : "Submit"}
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

function SubmitModalHandler({
  submitResponse,
  setShowSubmitModal,
  SubmitModal,
  handler,
}) {
  return (
    <Modal
      data={submitResponse}
      setter={setShowSubmitModal}
      ModalParam={SubmitModal}
      handler={handler}
      styles={"w-[34rem]"}
    />
  );
}
