import React from "react";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import BatchTable from "../../components/enrollStudent/BatchTable/BatchTable";
import { Button } from "@mui/material";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
import {useState, useEffect} from 'react'
import axios from 'axios'
import PageLoaderModal from "../../components/enrollStudent/Modal/PageLoaderModal";
import Naresh_IT_Logo from '../../assets/Naresh_IT_Logo.png'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const technologyFetchHandler = async (setter) => {
  const res = await axios.get("https://www.nareshit.net/fetchTechnologies");

  setter([
    ...res.data.map((ele) => {
      return {
        id: ele.TechnologyID,
        value: ele.TechnologyID,
        option: ele.TechnologyName,
      };
    }),
  ]);
};

const moduleFetchHandler = async (technologyId,moduleSetter) => {
  let res = await axios.get(`https://www.nareshit.net/fetchModules/${technologyId}`);

  moduleSetter([
    ...res.data.map((ele) => {
      return {
        id: ele.ModuleID,
        value: ele.ModuleID,
        option: ele.ModuleName,
      };
    }),
  ]);
}

function EnrollStudent() {
  const [technologyList, setTechnologyList] = useState([])
  const [moduleList, setModuleList] = useState([])

  const [selectedTechnology, setSelectedTechnology] = useState(0)
  const [selectedModule, setSelectedModule] = useState(0)


  useEffect(() => {
    technologyFetchHandler(setTechnologyList);
  }, []);

  useEffect(() => {
  if(selectedTechnology)  
    moduleFetchHandler(selectedTechnology, setModuleList);
  }, [selectedTechnology])

  return (
    <>
<header className="py-3 bg-[gray]">
  <nav className="container mx-auto flex justify-between items-center">
    <div><img src={Naresh_IT_Logo} alt="Naresh IT Logo" height="30" width="150" /></div>
    <ul className="flex space-x-4">
      <li><a className="font-medium rounded text-white"><Button sx={{color: 'white'}} variant="text">Test Creation</Button></a></li>
      <li><a className="font-medium rounded text-white"><Button sx={{color: 'white'}} variant="text">QuestionDB</Button></a></li>
      <li><a className="font-medium rounded text-white"><Button sx={{color: 'white'}} variant="text">User Management</Button></a></li>
      <li><a className="bg-gray-500 font-medium rounded text-white"><Button sx={{color: 'white'}} variant="contained" color="secondary">Enroll Student</Button></a></li>
      <li className=""><AccountCircleOutlinedIcon fontSize="large" /></li>
    </ul>
  </nav>
</header>


    <main className="mt-8">
      <PageLoaderModal setSelectedTechnology={setSelectedTechnology} setSelectedModule={setSelectedModule} technologyList={technologyList}
      moduleList={moduleList} />

      {/**  DropDowns */}
      <section className="">
<<<<<<< HEAD
=======
=======

function EnrollStudent() {
  return (
    <main>
      {/**  DropDowns */}
      <section className="flex">
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
>>>>>>> origin/master
        <TechnologySelector />
      </section>

      {/**  Batch */}
      <section className="text-black mt-5">
<<<<<<< HEAD
        <BatchTable selectedTechnology={selectedTechnology}
        selectedModule={selectedModule} />
=======
<<<<<<< HEAD
        <BatchTable selectedTechnology={selectedTechnology}
        selectedModule={selectedModule} />
=======
        <BatchTable />
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
>>>>>>> origin/master
        <div className="mt-10 mx-auto w-4/6">
          <span className="ms-[9%]">
            <Button variant="outlined" color="inherit">
              Show Tests
            </Button>
          </span>
        </div>
      </section>

      {/**  Test Table */}
      <section className="mt-10">
        <TestTable />
        <div className="mt-10 mx-auto w-4/6">
          <span className="ms-[9%]">
            <Button variant="outlined" color="inherit">
              Enroll Students
            </Button>
          </span>
        </div>
      </section>
<<<<<<< HEAD
    </main></>
=======
<<<<<<< HEAD
    </main></>
=======
    </main>
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
>>>>>>> origin/master
  );
}

export default EnrollStudent;
