import React from "react";
import { Link } from "react-router-dom";

function AdminHomePage() {
  return (
    <>
      <header className="p-[0.6rem] bg-[azure] border-[1px] border-[gray]">
        <nav>
          <ul className="flex bg-red-300 ">
            <li>
              <img alt="Logo" />
            </li>
            <li>
              <img alt="Side Logo" />
            </li>
          </ul>
        </nav>
        <main>
          <section>
            <h1>Welcome to Admin Webpage</h1>
            <p>This is the Admin to Create for a Test Page</p>
            <aside>
              <nav>
                <ul>
                  <li>
                    <Link>Test Creation Page</Link>
                  </li>
                  <li>
                    <Link>Question's DB</Link>
                  </li>
                  <li>
                    <Link>Enroll Student</Link>
                  </li>
                </ul>
              </nav>
            </aside>
          </section>
        </main>
      </header>
    </>
  );
}

export default AdminHomePage;
