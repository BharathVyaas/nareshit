import React, { useState, useEffect, useRef } from "react";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import BatchTable from "../../components/enrollStudent/BatchTable/BatchTable";
import { Button } from "@mui/material";
import axios from "axios";
import PageLoaderModal from "../../components/enrollStudent/Modal/PageLoaderModal";
import Naresh_IT_Logo from "../../assets/Naresh_IT_Logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Modal from '../../ui/Modal'
import StudentModal from '../../ui/EnrollStudent/StudentModal'

const technologyFetchHandler = async (setter) => {
  try {
    const res = await axios.get("https://www.nareshit.net/fetchTechnologies");
    setter(
      res.data.map((ele) => ({
        id: ele.TechnologyID,
        value: ele.TechnologyID,
        option: ele.TechnologyName,
      }))
    );
  } catch (err) {
    console.error(err);
  }
};

const moduleFetchHandler = async (technologyId, moduleSetter) => {
  try {
    const res = await axios.get(
      `https://www.nareshit.net/fetchModules/${technologyId}`
    );
    moduleSetter(
      res.data.map((ele) => ({
        id: ele.ModuleID,
        value: ele.ModuleID,
        option: ele.ModuleName,
      }))
    );
  } catch (err) {
    console.error(err);
  }
};

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

const fetchBatchTableHandler = async (test_Id, setter) => {
  try {
    const res = await axios.post(
      "https://www.nareshit.net/GetBatchesByTestId",
      {
        TestId: test_Id,
      }
    );
    setter(res.data.dbresult || []);
  } catch (err) {
    console.error(err);
  }
};

const fetchstudentsHandler = async (batchId, setter) => {
  try {
    const res = await axios.post(
      "https://www.nareshit.net/GetStudentNameByBatchId",
      {
        BatchId: batchId,
      }
    );
    setter({batchId: batchId, modalData: res.data.dbresult || []})
  } catch (err) {
    console.error(err);
  }
};

function EnrollStudent() {
  const [technologyList, setTechnologyList] = useState([]);
  const [moduleList, setModuleList] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState(0);
  const [selectedModule, setSelectedModule] = useState(0);
  const [batchData, setBatchData] = useState([]);
  const [testData, setTestData] = useState([]);
  const batchTableRef = useRef(null);
  const [modal, setModal] = useState(false)

  const studentSubmitHandler = (excludedArr) => {

  }

  const fetchBatchData = (testId) => {
    fetchBatchTableHandler(testId, setBatchData, setModal);
  }

  useEffect(() => {
    technologyFetchHandler(setTechnologyList);
  }, []);

  useEffect(() => {
    if (batchTableRef.current && batchData && batchData.length > 0) {
      batchTableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [batchData]);

  useEffect(() => {
    if (selectedTechnology)
      moduleFetchHandler(selectedTechnology, setModuleList);
  }, [selectedTechnology]);

  return (
    <>
    {modal && <StudentModalHandler data={modal} setter={setModal} submitHandler={studentSubmitHandler} />}
      <EnrollStudentNavigation />

      <main className="mt-8">
        {/**  DropDowns */}
        <section className="">
          <TechnologySelector setter={setTestData} fetchHandler={fetchTestTableHandler} selectedTechnology={selectedTechnology} selectedModule={selectedModule} setSelectedTechnology={setSelectedTechnology} setSelectedModule={setSelectedModule} />
        </section>

        {/**  Test Table */}
        <section className="mt-10">
          <TestTable testData={testData} fetchBatchData={fetchBatchData}/>
        </section>

        {/**  Batch */}
        <section className="text-black mt-5">
          <div ref={batchTableRef}>
            <BatchTable
              selectedTechnology={selectedTechnology}
              selectedModule={selectedModule}
              batchData={batchData}
              fetchstudentsHandler={fetchstudentsHandler}
              setModal={setModal}
            />
          </div>
          <div className="mt-10 mx-auto w-4/6">
            <span className="ms-[9%]">
              <Button variant="outlined" color="inherit">
                Enroll Students
              </Button>
            </span>
          </div>
        </section>
      </main>
    </>
  );
}

export default EnrollStudent;

function StudentModalHandler({data ,setter, submitHandler}){
  return <Modal data={data} setter={setter} ModalParam={StudentModal} handler={submitHandler} />
}

function EnrollStudentNavigation() {
  return (
    <header className="py-3 bg-[gray]">
        <nav className="container mx-auto flex justify-between items-center">
          <div>
            <img
              src={Naresh_IT_Logo}
              alt="Naresh IT Logo"
              height="30"
              width="150"
            />
          </div>
          <ul className="flex space-x-4">
            <li>
              <a className="font-medium rounded text-white">
                <Button sx={{ color: "white" }} variant="text">
                  Test Creation
                </Button>
              </a>
            </li>
            <li>
              <a className="font-medium rounded text-white">
                <Button sx={{ color: "white" }} variant="text">
                  QuestionDB
                </Button>
              </a>
            </li>
            <li>
              <a className="font-medium rounded text-white">
                <Button sx={{ color: "white" }} variant="text">
                  User Management
                </Button>
              </a>
            </li>
            <li>
              <a className="bg-gray-500 font-medium rounded text-white">
                <Button
                  sx={{ color: "white" }}
                  variant="contained"
                  color="secondary"
                >
                  Enroll Student
                </Button>
              </a>
            </li>
            <li className="">
              <AccountCircleOutlinedIcon fontSize="large" />
            </li>
          </ul>
        </nav>
      </header>
  )
}
