import React, { useContext } from "react";
import AuthCtx from "../context/auth.context";

function Dashboard() {
  const { loginData } = useContext(AuthCtx);
  return <div>Welcome &nbsp;{loginData.userName}</div>;
}

export default Dashboard;
