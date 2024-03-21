import React, { useState, useEffect, useReducer } from "react";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestList } from "../../store/root.actions";
import { Button } from "@mui/material";
import { setTestIdList } from "../../store/slice/enrollStudent.slice";
import { NavLink } from "react-router-dom";

const initialState = {
  selectedTechnology: 0,
  selectedModule: 0,
  testData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "technology": {
      return { ...state, selectedTechnology: action.payload };
    }
    case "module": {
      return { ...state, selectedModule: action.payload };
    }
    case "testData": {
      return { ...state, testData: action.payload };
    }
    default:
      return state;
  }
};

function ListOfTests() {
  const dispatch = useDispatch();
  const [selectedTechnology, setSelectedTechnology] = useState(0);
  const [selectedModule, setSelectedModule] = useState(0);
  const [testData, setTestData] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [isNotSelected, setIsNotSelected] = useState({
    technology: false,
    module: false,
  });
  const { data: testList, isLoading } = useSelector(
    (store) => store.testListReducer
  );

  const [state, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    setTestData(testList || []);
  }, [testList]);

  // To show warnings on Select Tags
  useEffect(() => {
    if (isNotSelected.technology || isNotSelected.module) {
      setIsNotSelected((prev) => {
        const updatedObj = { ...prev };
        if (updatedObj.technology || updatedObj.module) {
          updatedObj.technology = false;
          updatedObj.module = false;
        }
        return updatedObj;
      });
    }
  }, [selectedTechnology, selectedModule, isLoading]);

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

  // To Fetch Test on show tests button
  const fetchTestTableHandler = () => {
    if (selectedTechnology && selectedModule) {
      dispatch(fetchTestList({ selectedTechnology, selectedModule }));
    } else {
      setIsNotSelected((prev) => {
        const updatedObj = { ...prev };
        if (!selectedTechnology) updatedObj.technology = true;
        if (!selectedModule) updatedObj.module = true;
        return updatedObj;
      });
    }
  };

  useEffect(() => {
    dispatch(setTestIdList(selectedTests));
  }, [selectedTests]);

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
            isNotSelected={isNotSelected}
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
