import { createContext, useState } from "react";

const AuthCtx = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userType: false,
  setUserType: () => {},
});

export function AuthCtxProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ type: "user", userName: "" });

  return (
    <AuthCtx.Provider
      value={{ isLoggedIn, setIsLoggedIn, loginData, setLoginData }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export default AuthCtx;
