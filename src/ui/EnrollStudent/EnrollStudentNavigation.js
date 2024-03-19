import { Button } from "@mui/material";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";

function EnrollStudentNavigation() {
  return (
    <header className="">
      <Logo />
      <div className="bg-[gray]">
        <nav className="bg-[gray] p-[10px]">
          <ul className="flex justify-center h-10 items-center">
            <li className="">
              <NavLink
                to="/enroll-student"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                    : "text-white font-medium rounded px-6 py-3"
                }
                end
              >
                Student Enrollment
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/enroll-student/tests"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                    : "text-white cursor-default font-medium rounded px-6 py-3"
                }
                end
              >
                List Of Tests
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/enroll-student/batch-selection"
                onClick={(e) => e.preventDefault()}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                    : "text-white cursor-default font-medium rounded px-6 py-3"
                }
              >
                Batch Selection
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/enroll-student/student-selection"
                onClick={(e) => e.preventDefault()}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                    : "text-white cursor-default font-medium rounded px-6 py-3"
                }
              >
                Student Selection
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default EnrollStudentNavigation;
