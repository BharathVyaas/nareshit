import { Outlet } from "react-router";

import userLogo from "../assets/adminlogo.jpg";
import { NavLink } from "react-router-dom";

function Categories() {
  return (
    <>
      <header className="bg-gray-100">
        <ul className="flex justify-between h-10">
          <li className="grid place-content-center mx-10">
            <img alt="Logo" />
          </li>
          <li className="grid place-content-center mx-10">
            <img src={userLogo} width="30" height="30" alt="userLogo" />
          </li>
        </ul>
        <nav className="bg-[gray] p-[10px]">
          <ul className="flex justify-center h-10 items-center">
            <li className="">
              <NavLink
                to="assessmentlist"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                    : "text-white font-medium rounded px-6 py-3"
                }
                end
              >
                List Of Assessment
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="technology"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                    : "text-white font-medium rounded px-6 py-3"
                }
                end
              >
                Technology
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="assessments"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                    : "text-white font-medium rounded px-6 py-3"
                }
                end
              >
                Assessment
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="questionview"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                    : "text-white font-medium rounded px-6 py-3"
                }
                end
              >
                Question Views
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="scheduletime"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                    : "text-white font-medium rounded px-6 py-3"
                }
                end
              >
                SheduleTime
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />

      <footer className=" grid place-content-center p-6 w-full">
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default Categories;
