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

/**
 *
 * Responsibe for rendering Test Creating Page.
 *
 * Functional component for the Categories page.
 * @returns {JSX.Element} The Categories page component.
 */
function Categories() {
<<<<<<< HEAD
  const { isLoggedIn } = useContext(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=/categories/assessmentlist");
  }, [isLoggedIn, navigate]);

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
        <Logo />
        <MainNavigation />
      </header>

      {/* Main Content Outlet */}
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
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default Categories;
