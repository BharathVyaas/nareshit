import React, { useState, useEffect, useRef } from "react";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import axios from "axios";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";

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

function EnrollStudent() {
  const [selectedTechnology, setSelectedTechnology] = useState(0);
  const [selectedModule, setSelectedModule] = useState(0);
  const [testData, setTestData] = useState([]);

  return (
    <>
      <EnrollStudentNavigation />

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
          <TestTable testData={testData} />
        </section>
      </main>
    </>
  );
}

export default EnrollStudent;
