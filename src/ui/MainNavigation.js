import { NavLink } from "react-router-dom";
import { LocalStorage } from "../services/LocalStorage";

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
            ScheduleTime
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
