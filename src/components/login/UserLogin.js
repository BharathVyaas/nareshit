import React, { useContext, useEffect, useRef, useState } from "react";
import AuthCtx from "../../context/auth.context";
import { useNavigate } from "react-router";

function UserLogin() {
  const navigate = useNavigate();

  const firstSubmitRef = useRef(true);
  const userNameRef = useRef();
  const passwordRef = useRef();

  const { isLoggedIn, setIsLoggedIn, setLoginData, loginData } =
    useContext(AuthCtx);

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    if (userName) setIsUserNameValid(true);
  }, [userName]);

  useEffect(() => {
    if (password) setIsPasswordValid(true);
  }, [password]);

  function submitHandler() {
    if (isUserNameValid && isPasswordValid) {
      setIsLoggedIn(true);
      setLoginData({ type: "user", userName: userNameRef.current.value });
      navigate("/dashboard");
    }

    firstSubmitRef.current = false;
  }

  return (
    <div>
      <label htmlFor="username">User Name</label>
      <input
        id="username"
        type="text"
        name="username"
        ref={userNameRef}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="text-start"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        ref={passwordRef}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-start"
      />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default UserLogin;
