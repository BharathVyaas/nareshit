import DataHandler from "../util/fetchHandler";
<<<<<<< HEAD
<<<<<<< HEAD
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { getAllAssessments } from "../util/http";
import AssessmentTable from "../components/AssessmentTable";

import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LocalStorage } from "../services/LocalStorage";
import AuthCtx from "../context/auth.context";
=======
import { NavLink, useLoaderData, useSubmit } from "react-router-dom";
import { getAllAssessments, queryClient } from "../util/http";
=======
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { getAllAssessments } from "../util/http";
>>>>>>> origin/master
import AssessmentTable from "../components/AssessmentTable";

import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
<<<<<<< HEAD
>>>>>>> origin/main
=======
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LocalStorage } from "../services/LocalStorage";
import AuthCtx from "../context/auth.context";
>>>>>>> origin/master

/**
 * Component for displaying a list of assessments created by other users.
 * @returns {JSX.Element} The ListOfAssessment component.
 */
function ListOfAssessment() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=categories/assessmentlist");
  }, [isLoggedIn, navigate]);

  const [titleData, setTitleData] = useState([]);
<<<<<<< HEAD
  const { data } = useQuery({
    queryKey: ["listofAssessment"],
    queryFn: getAllAssessments,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    setTitleData(data);
  }, [data]);
=======
=======
>>>>>>> origin/master
  const { data } = useQuery({
    queryKey: ["listofAssessment"],
    queryFn: getAllAssessments,
    staleTime: Infinity,
    gcTime: Infinity,
  });

<<<<<<< HEAD
  console.log("rerender");
>>>>>>> origin/main
=======
  useEffect(() => {
    setTitleData(data);
  }, [data]);
>>>>>>> origin/master

  // Get table titles from DataHandler
  const titles = DataHandler.getTitles();

  // Fetch assessments using react-query's useLoaderData
  const { assessments } = useLoaderData();

<<<<<<< HEAD
<<<<<<< HEAD
  function createNewHandler(e) {
    LocalStorage.clear();

    navigate("/categories/technology");
  }

  async function handler(data) {
    const res = await axios.post("https://www.nareshit.net/getBasicTestInfo", {
      data: { TestID: data.TestID },
    });
    console.log(
      "data",
      data.TestID,
      "url",
      "https://www.nareshit.net/getBasicTestInfo",
      "create",
      res
    );

    navigate(
      `/categories/technology?edit=true&TestID=${res.data.data[0]?.TestID}&randomId=${res.data.data[0]?.RandomID}&natureId=${res.data.data[0]?.NatureID}&technologyId=${res.data.data[0]?.TechnologyID}`
    );

    if (res) setTitleData({ assessments: res.data });
  }

  useEffect(() => {
    setTitleData(assessments);
  }, [titleData, assessments]);

=======
  const submit = useSubmit();
=======
  function createNewHandler(e) {
    LocalStorage.clear();
>>>>>>> origin/master

    navigate("/categories/technology");
  }

<<<<<<< HEAD
>>>>>>> origin/main
=======
  async function handler(data) {
    const res = await axios.post("https://www.nareshit.net/getBasicTestInfo", {
      data: { TestID: data.TestID },
    });
    console.log(
      "data",
      data.TestID,
      "url",
      "https://www.nareshit.net/getBasicTestInfo",
      "create",
      res
    );

    navigate(
      `/categories/technology?edit=true&TestID=${res.data.data[0]?.TestID}&randomId=${res.data.data[0]?.RandomID}&natureId=${res.data.data[0]?.NatureID}&technologyId=${res.data.data[0]?.TechnologyID}`
    );

    if (res) setTitleData({ assessments: res.data });
  }

  useEffect(() => {
    setTitleData(assessments);
  }, [titleData, assessments]);

>>>>>>> origin/master
  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
<<<<<<< HEAD
<<<<<<< HEAD
        exit={{ x: "-100%", transition: { duration: 0.3 } }}
        className="container bg-slate-100 min-h-[70vh] min-w-[80vw]  overflow-scroll py-[20px] shadow-xl mx-auto my-[20px]"
      >
        <section className="flex align-middle">
=======
        exit={{ x: "100%", transition: { duration: 0.3 } }}
        className="bg-slate-100 min-h-[70vh] min-w-[80vw] py-[20px] shadow-xl max-w-[80vw] mx-auto my-[20px]"
      >
        <section>
>>>>>>> origin/main
=======
        exit={{ x: "-100%", transition: { duration: 0.3 } }}
        className="container bg-slate-100 min-h-[70vh] min-w-[80vw]  overflow-scroll py-[20px] shadow-xl mx-auto my-[20px]"
      >
        <section className="flex align-middle">
>>>>>>> origin/master
          {/* Hidden heading for accessibility and SEO */}
          <h1 className="absolute left-[-9999px]">Assessments</h1>

          {/* NavLink for creating a new assessment */}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
          <div className="flex flex-col mx-auto">
            <NavLink
              className="inline-block max-w-40 text-center mt-3 px-[10px] py-[1px] font-medium rounded bg-[buttonface] hover:bg-gray-300 border-[1px] border-black"
              to="/categories/technology"
              onClick={createNewHandler}
            >
              Create New
            </NavLink>
            {/* Render the AssessmentTable component */}
            <AssessmentTable
              titles={titles}
              assessments={assessments}
              handler={handler}
            />
          </div>
<<<<<<< HEAD
=======
          <NavLink
            className="inline-block ms-20 mx-auto mt-3 px-[10px] py-[1px] font-medium rounded bg-[buttonface] hover:bg-gray-300 border-[1px] border-black"
            to="/categories/technology"
          >
            Create New
          </NavLink>

          {/* Render the AssessmentTable component */}
          <AssessmentTable
            titles={titles}
            assessments={assessments}
            handler={handler}
          />
>>>>>>> origin/main
=======
>>>>>>> origin/master
        </section>
      </motion.main>
    </AnimatePresence>
  );
}

export default ListOfAssessment;

/**
 * Loader function to fetch all assessments.
 * @returns {Promise} A promise that resolves to the fetched assessment data.
 */
export async function loader() {
  // Fetch assessments with specific stale time and garbage collection time
  const result = await getAllAssessments();

  return result;
}
