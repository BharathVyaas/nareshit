<<<<<<< HEAD
<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
import ExcelImport from "../components/ExcelImport";
import { useNavigate } from "react-router";
import AuthCtx from "../context/auth.context";

function UploadTopic() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

=======
import React from "react";
=======
import React, { useContext, useEffect } from "react";
>>>>>>> origin/master
import ExcelImport from "../components/ExcelImport";
import { useNavigate } from "react-router";
import AuthCtx from "../context/auth.context";

function UploadTopic() {
<<<<<<< HEAD
>>>>>>> origin/main
=======
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

>>>>>>> origin/master
  return <ExcelImport />;
}

export default UploadTopic;
