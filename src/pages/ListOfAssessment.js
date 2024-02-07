import DataHandler from "../util/fetchHandler";
import { NavLink, useLoaderData, useSubmit } from "react-router-dom";
import { getAllAssessments, queryClient } from "../util/http";
import AssessmentTable from "../components/AssessmentTable";

import { AnimatePresence, motion } from "framer-motion";
import BuilderService from "../services/builder";

/**
 * Component for displaying a list of assessments created by other users.
 * @returns {JSX.Element} The ListOfAssessment component.
 */
function ListOfAssessment() {
  // Get table titles from DataHandler
  const titles = DataHandler.getTitles();
  console.log(titles);

  // Fetch assessments using react-query's useLoaderData
  const { assessments } = useLoaderData();

  const submit = useSubmit();

  function handler(data) {
    BuilderService.setId("listOfAssessment", data.TestID);
    console.log(BuilderService.id);
  }

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
  const result = await queryClient.fetchQuery({
    queryKey: ["assessment", "getAllAssessments"],
    queryFn: getAllAssessments,
    staleTime: 30000, // 30 seconds
    gcTime: 60000, // 1 minute
  });
  return result;
}
