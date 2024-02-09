import DataHandler from "../util/fetchHandler";
import {
  NavLink,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { getAllAssessments, queryClient } from "../util/http";
import AssessmentTable from "../components/AssessmentTable";

import { AnimatePresence, motion } from "framer-motion";
import BuilderService from "../services/builder";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Component for displaying a list of assessments created by other users.
 * @returns {JSX.Element} The ListOfAssessment component.
 */
function ListOfAssessment() {
  const [titleData, setTitleData] = useState([]);
  const { data } = useQuery({
    queryKey: ["listofAssessment"],
    queryFn: getAllAssessments,
    refetchOnMount: true,
  });

  useEffect(() => {
    setTitleData(data);
  }, [data]);

  console.log("rerender");

  // Get table titles from DataHandler
  const titles = DataHandler.getTitles();

  // Fetch assessments using react-query's useLoaderData
  const { assessments } = useLoaderData();
  let updatedData = assessments;

  const submit = useSubmit();

  const navigate = useNavigate();

  async function handler(data) {
    const res = await axios.get("https://www.nareshit.net/getAllTests");

    navigate("/categories/technology");

    if (res) setTitleData({ assessments: res.data });
    console.log(res.data);
  }

  useEffect(() => {
    setTitleData(updatedData);
  }, [titleData]);

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "100%", transition: { duration: 0.3 } }}
        className="bg-slate-100 min-h-[70vh] min-w-[80vw] py-[20px] shadow-xl max-w-[80vw] mx-auto my-[20px]"
      >
        <section>
          {/* Hidden heading for accessibility and SEO */}
          <h1 className="absolute left-[-9999px]">Assessments</h1>

          {/* NavLink for creating a new assessment */}
          <button
            className="inline-block ms-20 mx-auto mt-3 px-[10px] py-[1px] font-medium rounded bg-[buttonface] hover:bg-gray-300 border-[1px] border-black"
            to="/categories/technology"
          >
            Create New
          </button>
          <button
            className="ms-20 mx-auto mt-3 px-[10px] py-[1px] font-medium rounded bg-[buttonface] hover:bg-gray-300 border-[1px] border-black"
            onClick={handler}
          >
            Show
          </button>
          {/* Render the AssessmentTable component */}
          <AssessmentTable
            titles={titles}
            assessments={updatedData}
            handler={handler}
          />
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
