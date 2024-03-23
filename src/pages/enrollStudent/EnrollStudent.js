import React from "react";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import EnrollListRenderer from "../../components/enrollStudent/EnrollStudent/EnrollListRenderer";

function EnrollStudent() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-100">
          <EnrollStudentNavigation />
        </header>

        <main className="flex-grow mt-8 mb-8">
          <section className="w-4/6 mx-auto mt-5">
            <Button variant="contained">
              <NavLink to="/enroll-student/tests?edit=false&enrollId=0">
                Create New
              </NavLink>
            </Button>
          </section>
          <section className="mt-8">
            <EnrollListRenderer />
          </section>
        </main>

        <footer className="bg-gray-100 p-6">
          <div className="max-w-full overflow-hidden">
            © 2023 Naresh i Technologies | Software Training - Online | All
            Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

export default EnrollStudent;
