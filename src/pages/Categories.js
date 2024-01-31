import { Outlet } from "react-router";

import userLogo from "../assets/adminlogo.jpg";
import { NavLink } from "react-router-dom";

function Categories() {
  return (
    <>
      <header className="bg-gray-100">
        <ul className="flex justify-between ">
          <li>
            <img alt="Logo" />
          </li>
          <li>
            <img src={userLogo} width="30" height="30" alt="userLogo" />
          </li>
        </ul>
        <nav className="bg-[gray] p-[10px]">
          <ul className="flex justify-center h-10 items-center">
            <li className="">
              <NavLink
                to="assessmentlist"
                className={({ isActive }) =>
                  isActive ? "bg-gray-700 px-6 py-3" : "px-6 py-3"
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
                  isActive ? "bg-gray-700 px-6 py-3" : "px-6 py-3"
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
                  isActive ? "bg-gray-700 px-6 py-3" : "px-6 py-3"
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
                  isActive ? "bg-gray-700 px-6 py-3" : "px-6 py-3"
                }
                end
              >
                Question Views
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="sheduletime"
                className={({ isActive }) =>
                  isActive ? "bg-gray-700 px-6 py-3" : "px-6 py-3"
                }
                end
              >
                SheduleTime
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="bg-gray-50 min-h-[70vh]">
        <Outlet />
      </main>
      <footer className=" grid place-content-center p-6 w-full">
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default Categories;
