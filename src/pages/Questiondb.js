<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import AuthCtx from "../context/auth.context";

function Questiondb() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

=======
import React from "react";
import { Outlet } from "react-router";

function Questiondb() {
>>>>>>> origin/main
  return <Outlet />;
}

export default Questiondb;
