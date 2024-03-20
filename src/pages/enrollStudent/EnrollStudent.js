import React from "react";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import { Button } from "@mui/material";
import EnrollStudentTable from "../../components/enrollStudent/EnrollStudent/EnrollStudentTable";

function EnrollStudent() {
  return (
    <>
      {/*  */}
      <header className="bg-gray-100 max-w-full overflow-hidden">
        <EnrollStudentNavigation />
      </header>

      <main className="mt-8 flex justify-center">
        <div className="w-4/6">
          <Button variant="contained">Create New</Button>
          <div>
            <EnrollStudentTable />
          </div>
        </div>
      </main>

      {/*  */}
      <footer className="grid place-content-center p-6 w-full max-w-full overflow-hidden absolute bottom-0 bg-gray-100">
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default EnrollStudent;
