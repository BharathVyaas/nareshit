import React from "react";
import AdminLogin from "../components/login/AdminLogin";
import UserLogin from "../components/login/UserLogin";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div>
      <ul className="flex">
        <li>
          <NavLink to="/login">User</NavLink>
        </li>
        <li>
          <NavLink to="/login/admin">Admin</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Login;
