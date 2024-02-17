import React, { useContext, useEffect, useState } from "react";
import AuthCtx from "../../context/auth.context";
import { Form, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  function submitHandler() {
    navigate("/");
  }

  return (
    <div>
      <label htmlFor="username">User Name</label>
      <input id="username" type="text" name="username" className="text-start" />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        className="text-start"
      />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default AdminLogin;
