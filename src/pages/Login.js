import React from "react";
import AdminLogin from "../components/login/AdminLogin";
import UserLogin from "../components/login/UserLogin";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <ul className="flex justify-center">
          <li className="mr-4">
            <NavLink
              to="/login"
              className="text-blue-600 hover:underline font-medium px-4 py-1"
            >
              User
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login/admin"
              className="text-blue-600 hover:underline font-medium px-4 py-1"
            >
              Admin
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}

export default Login;
