import React, { useContext, useEffect } from "react";
import AuthCtx from "../context/auth.context";
import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=/dashboard");
  }, []);

  const { loginData } = useContext(AuthCtx);
  return (
    <div className="flex flex-col">
      <div className="p-5">
        <h1 className="text-2xl font-bold">
          Welcome &nbsp;{loginData.userName}
        </h1>
      </div>
      <hr className="me-4" />
      <div>
        <h2>Todays Assessments</h2>
      </div>
    </div>
  );
}

export default Dashboard;
