import React from "react";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import BatchTable from "../../components/enrollStudent/BatchTable/BatchTable";
import { Button } from "@mui/material";

function EnrollStudent() {
  return (
    <main>
      {/**  DropDowns */}
      <section className="flex">
        <TechnologySelector />
      </section>

      {/**  Batch */}
      <section className="text-black mt-5">
        <BatchTable />
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
    </main>
  );
}

export default EnrollStudent;
