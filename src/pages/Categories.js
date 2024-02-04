import { Outlet } from "react-router";

import MainNavigation from "../ui/MainNavigation";
import Logo from "../ui/Logo";

/**
 *
 * Responsibe for rendering Test Creating Page.
 *
 * Functional component for the Categories page.
 * @returns {JSX.Element} The Categories page component.
 */
function Categories() {
  return (
    <>
      {/*  */}
      <header className="bg-gray-100">
        <Logo />
        <MainNavigation />
      </header>

      {/* Main Content Outlet */}
      <Outlet />

      {/*  */}
      <footer className="grid place-content-center p-6 w-full">
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default Categories;
