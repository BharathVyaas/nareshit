<<<<<<< HEAD
<<<<<<< HEAD
import { Outlet, useNavigate } from "react-router";

import MainNavigation from "../ui/MainNavigation";
import Logo from "../ui/Logo";
import { useContext, useEffect } from "react";
import AuthCtx from "../context/auth.context";
=======
import { Outlet } from "react-router";

import MainNavigation from "../ui/MainNavigation";
import Logo from "../ui/Logo";
>>>>>>> origin/main
=======
import { Outlet, useNavigate } from "react-router";

import MainNavigation from "../ui/MainNavigation";
import Logo from "../ui/Logo";
import { useContext, useEffect } from "react";
import AuthCtx from "../context/auth.context";
>>>>>>> origin/master

/**
 *
 * Responsibe for rendering Test Creating Page.
 *
 * Functional component for the Categories page.
 * @returns {JSX.Element} The Categories page component.
 */
function Categories() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
  const { isLoggedIn } = useContext(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=/categories/assessmentlist");
  }, [isLoggedIn, navigate]);

<<<<<<< HEAD
  return (
    <>
      {/*  */}
      <header className="bg-gray-100 max-w-full overflow-hidden">
=======
  return (
    <>
      {/*  */}
      <header className="bg-gray-100">
>>>>>>> origin/main
=======
  return (
    <>
      {/*  */}
      <header className="bg-gray-100 max-w-full overflow-hidden">
>>>>>>> origin/master
        <Logo />
        <MainNavigation />
      </header>

      {/* Main Content Outlet */}
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="max-w-full overflow-hidden">
        <Outlet />
      </div>

      {/*  */}
      <footer className="grid place-content-center p-6 w-full max-w-full overflow-hidden">
=======
      <Outlet />

      {/*  */}
      <footer className="grid place-content-center p-6 w-full">
>>>>>>> origin/main
=======
      <div className="max-w-full overflow-hidden">
        <Outlet />
      </div>

      {/*  */}
      <footer className="grid place-content-center p-6 w-full max-w-full overflow-hidden">
>>>>>>> origin/master
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default Categories;
