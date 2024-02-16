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
import { AssessmentClass } from "../services/assessmentsService";
import { QueryViewClass } from "../services/questionViewService";
import { TechnologyClass } from "../services/technologyService";
import { ScheduleTimeClass } from "../services/scheduleTimeService";
import { LocalStorage } from "../services/LocalStorage";

/**
 * Component for displaying a list of assessments created by other users.
 * @returns {JSX.Element} The ListOfAssessment component.
 */
function ListOfAssessment() {
  const [titleData, setTitleData] = useState([]);
  const { data } = useQuery({
    queryKey: ["listofAssessment"],
    queryFn: getAllAssessments,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    setTitleData(data);
  }, [data]);

  // Get table titles from DataHandler
  const titles = DataHandler.getTitles();

  // Fetch assessments using react-query's useLoaderData
  const { assessments } = useLoaderData();
  let updatedData = assessments;

  const submit = useSubmit();

  function createNewHandler(e) {
    localStorage.clear();
    LocalStorage.technologyPage = true;
    BuilderService.assessmentService = AssessmentClass.getInstance();
    BuilderService.id = { testId: 0, technologyId: 0, testDetailsId: 0 };
    BuilderService.questionCount = {
      easy: 0,
      exclude: 0,
      hard: 0,
      include: 0,
      medium: 0,
      total: 0,
    };
    BuilderService.questionService = QueryViewClass.getInstance();
    BuilderService.technologyService = TechnologyClass.getInstance();
    BuilderService.scheduleTimeService = ScheduleTimeClass.getInstance();
    window.location.href = "https://nareshit.netlify.app/categories/technology";
  }

  const navigate = useNavigate();

  async function handler(data) {
    console.log("handler");
    LocalStorage.technologyPage = true;
    const res = await axios.post("https://www.nareshit.net/getBasicTestInfo", {
      data: { TestID: data.TestID },
    });
    console.log(data.TestID);
    console.log("create", res);

    navigate(
      `/categories/technology?randomId=${res.data.data[0]?.RandomID}&natureId=${res.data.data[0]?.NatureID}&technologyId=${res.data.data[0]?.TechnologyID}`
    );

    if (res) setTitleData({ assessments: res.data });
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
        className="bg-slate-100 min-h-[70vh] min-w-[80vw]  overflow-scroll py-[20px] shadow-xl mx-auto my-[20px]"
      >
        <section>
          {/* Hidden heading for accessibility and SEO */}
          <h1 className="absolute left-[-9999px]">Assessments</h1>

          {/* NavLink for creating a new assessment */}
          <div className="flex flex-col">
            <NavLink
              className="inline-block ms-[15%] max-w-40 text-center mt-3 px-[10px] py-[1px] font-medium rounded bg-[buttonface] hover:bg-gray-300 border-[1px] border-black"
              to="/categories/technology"
              onClick={createNewHandler}
            >
              Create New
            </NavLink>
            {/* Render the AssessmentTable component */}
            <AssessmentTable
              titles={titles}
              assessments={updatedData}
              handler={handler}
            />
          </div>
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
