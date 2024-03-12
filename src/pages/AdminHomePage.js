<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCtx from "../context/auth.context";
=======
import React from "react";
import { Link } from "react-router-dom";
>>>>>>> origin/main

/**
 *    *** Still Under Developement ***
 *
 *
 * Functional component for the Admin Home Page.
 * @returns {JSX.Element} The Admin Home Page component.
 */
function AdminHomePage() {
<<<<<<< HEAD
  const { isLoggedIn } = useContext(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

=======
>>>>>>> origin/main
  return (
    <>
      <header className="p-[0.6rem] bg-[azure]">
        <nav>
          <ul className="flex justify-between bg-red-200 h-16">
            <li className="grid place-content-center mx-10">
              <img alt="Logo" />
            </li>
            <li className="grid place-content-center mx-10">
              <img alt="Side Logo" />
            </li>
          </ul>
        </nav>
      </header>
      <main>
<<<<<<< HEAD
        <section className="w-[70%] h-60 mx-auto grid place-content-center text-center mt-20 shadow-2xl">
=======
        <section className="w-[85%] h-60 mx-auto grid place-content-center text-center mt-20 shadow-2xl">
>>>>>>> origin/main
          <h1 className="text-2xl font-medium p-3">Welcome to Admin Webpage</h1>
          <p className="">This is the Admin to Create for a Test Page</p>
          <aside className="w-[90%] mx-auto">
            <nav>
              <ul className="flex w-full justify-evenly mt-4">
                <li className="text-white  mx-2 bg-sky-400 w-[200px] grid place-content-center h-10 hover:bg-sky-500 rounded-lg">
                  <Link to="/categories/assessmentlist">
                    Test Creation Page
                  </Link>
                </li>
                <li className="text-white mx-2 bg-sky-400 w-[200px] grid place-content-center h-10 hover:bg-sky-500 rounded-lg">
<<<<<<< HEAD
                  <Link
                    onClick={() =>
                      (window.location.href = "http://49.207.10.13:3003")
                    }
                  >
                    Question's DB
                  </Link>
                </li>
                <li className="text-white mx-2 bg-sky-400 w-[200px] grid place-content-center h-10 hover:bg-sky-500 rounded-lg">
                  <Link to="user-management">User Management</Link>
                </li>
                <li className="text-white mx-2 bg-sky-400 w-[200px] grid place-content-center h-10 hover:bg-sky-500 rounded-lg">
                  <Link to="enroll-student">Enroll Student</Link>
=======
                  <Link to="questiondb/uploadTopic">Question's DB</Link>
                </li>
                <li className="text-white mx-2 bg-sky-400 w-[200px] grid place-content-center h-10 hover:bg-sky-500 rounded-lg">
                  <Link>Enroll Student</Link>
>>>>>>> origin/main
                </li>
              </ul>
            </nav>
          </aside>
        </section>
      </main>
    </>
  );
}

export default AdminHomePage;
