import DataHandler from "../util/fetchHandler";
import { NavLink, useLoaderData } from "react-router-dom";
import { getAllAssessments, queryClient } from "../util/http";
import AssessmentTable from "../components/AssessmentTable";

import { AnimatePresence, motion } from "framer-motion";

function ListOfAssessment() {
  const titles = DataHandler.getTitles();

  const { assessments } = useLoaderData();

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "100%", transition: { duration: 0.3 } }}
        className="bg-slate-100 min-h-[70vh] p-[20px] shadow-xl h-[500px] max-w-[800px] mx-auto my-[20px]"
      >
        <section>
          <h1 className="absolute left-[-9999px]">Assessments</h1>
          <NavLink
            className="inline-block  mx-auto mt-3 px-[10px] py-[1px] font-medium rounded bg-[buttonface] hover:bg-gray-300 border-[1px] border-black"
            to="/categories/technology"
          >
            Create New
          </NavLink>
          <AssessmentTable titles={titles} assessments={assessments} />
        </section>
      </motion.main>
    </AnimatePresence>
  );
}

export default ListOfAssessment;

export async function loader() {
  const result = await queryClient.fetchQuery({
    queryKey: ["assessment", "getAllAssessments"],
    queryFn: getAllAssessments,
  });
  return result;
}
