import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
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
<<<<<<< HEAD
<<<<<<< HEAD
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
=======
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white font-medium rounded px-6 py-3"
>>>>>>> origin/main
=======
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
>>>>>>> origin/master
            }
            end
          >
            Technology
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="assessments"
<<<<<<< HEAD
<<<<<<< HEAD
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
=======
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white font-medium rounded px-6 py-3"
>>>>>>> origin/main
=======
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
>>>>>>> origin/master
            }
            end
          >
            Assessment
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="questionview"
<<<<<<< HEAD
<<<<<<< HEAD
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
=======
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white font-medium rounded px-6 py-3"
>>>>>>> origin/main
=======
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
>>>>>>> origin/master
            }
            end
          >
            Question Views
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="scheduletime"
<<<<<<< HEAD
<<<<<<< HEAD
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
            }
            end
          >
            ScheduleTime
=======
=======
            onClick={(e) => e.preventDefault()}
>>>>>>> origin/master
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
            }
            end
          >
<<<<<<< HEAD
            SheduleTime
>>>>>>> origin/main
=======
            ScheduleTime
>>>>>>> origin/master
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
