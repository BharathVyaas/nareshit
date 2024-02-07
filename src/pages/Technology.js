import { Form } from "react-router-dom";
import { getProgLangs, queryClient } from "../util/http";
import { redirect, useLoaderData } from "react-router";
import { useContext, useEffect, useState } from "react";
import TechnologyService, {
  NatureOfAssessmentService,
  RandomService,
  SelectTechnologyService,
} from "../services/technologyService";
import SelectedTechnology from "../components/SelectedTechnology";
import NatureOfAssessments from "../components/NatureOfAssessments";
import Randoms from "../components/Randoms";
import Button from "../ui/Button";

import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import axios from "axios";

const formNames = ["proglangs", "catogaryType", "assessmentNature", "random"];

function Technology() {
  const { programmingLanguages } = useLoaderData();

  const updatedProgrammingLanguages = [
    {
      TechnologyID: -1,
      TechnologyName:
        BuilderService.technologyService._technology?.programmingLanguage,
    },
    ...programmingLanguages,
  ];

  const [proglang, setProgLang] = useState(
    BuilderService.technologyService._technology?.programmingLanguage
  );

  useEffect(() => {
    setProgLang(
      LocalStorage.programmingLanguageData?.TechnologyName ||
        BuilderService.technologyService._technology?.programmingLanguage
    );
  }, []);

  useEffect(() => {
    LocalStorage.programmingLanguageData = programmingLanguages.find(
      (element) => {
        return proglang === element.TechnologyName;
      }
    );
  }, [proglang]);

  const [nature, setNature] = useState(
    BuilderService.technologyService._technology?.natureOfAssessment
  );

  const [random, setRandom] = useState(
    BuilderService.technologyService._technology?.assessmentNature
  );
  useEffect(() => {
    BuilderService.technologyService = TechnologyService.updateData({
      ...TechnologyService.technology,
      programmingLanguage:
        SelectTechnologyService.updateData(proglang).programmingLanguage,
    });
    LocalStorage.data = BuilderService.getData();
  }, [proglang]);

  useEffect(() => {
    BuilderService.technologyService = TechnologyService.updateData({
      ...TechnologyService.technology,
      natureOfAssessment:
        NatureOfAssessmentService.updateData(nature).natureOfAssessment,
    });

    LocalStorage.data = BuilderService.getData();
  }, [nature]);

  useEffect(() => {
    BuilderService.technologyService = TechnologyService.updateData({
      ...TechnologyService.technology,
      assessmentNature: RandomService.updateData(random).random,
    });
    LocalStorage.data = BuilderService.getData();
  }, [random]);

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%", transition: { duration: 0.3 } }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "100%", transition: { duration: 0.3 } }}
        className="bg-gray-50 min-h-[70vh]"
      >
        <Form method="POST" className="p-5">
          <SelectedTechnology
            proglang={proglang}
            setProgLang={setProgLang}
            programmingLanguages={updatedProgrammingLanguages}
          />
          <NatureOfAssessments nature={nature} setNature={setNature} />
          <Randoms random={random} setRandom={setRandom} />

          {/* <Button link="/categories/assessments" /> */}
          <div className="w-full flex mt-14">
            <button
              className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
            >
              Submit
            </button>
          </div>
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export default Technology;

export async function loader() {
  const result = await queryClient.fetchQuery({
    queryKey: ["technology", "programmingLanguages"],
    queryFn: getProgLangs,
  });

  return result;
}

export async function action() {
  let natureId;

  // NatureID
  if (
    BuilderService.technologyService._technology.natureOfAssessment ===
    "dynamic"
  ) {
    natureId = 1;
  } else if (
    BuilderService.technologyService._technology.natureOfAssessment === "fixed"
  ) {
    natureId = 2;
  } else {
    natureId = 3;
  }

  // RandomID
  let randomId;

  if (
    BuilderService.technologyService._technology.assessmentNature ===
    "completeTest"
  ) {
    randomId = 1;
  }
  if (
    BuilderService.technologyService._technology.assessmentNature ===
    "moduleWiseRandom"
  ) {
    randomId = 2;
  }
  if (
    BuilderService.technologyService._technology.assessmentNature ===
    "topicWiseRandom"
  ) {
    randomId = 3;
  }
  if (
    BuilderService.technologyService._technology.assessmentNature === "noRandom"
  ) {
    randomId = 4;
  }

  let data = {};
  data["TestID"] = BuilderService.id.listOfAssessment;
  data["TechnologyID"] =
    BuilderService.requestData.assessments.technology.TechnologyID;
  data["NatureID"] = natureId;
  data["RandomID"] = randomId;
  data["CreatedBy"] = "Admin";
  data["ModifiedBy"] = "Admin";

  data = {
    TechnologyID: 2,
    TestID: 0,
    AssessmentID: 1,
    NatureID: 2,
    RandomID: 2,
    CreatedBy: "Admin",
    ModifiedBy: "Admin",
  };
  let redirectVar = "/categories/assessments";

  if (data["NatureID"] === "fastTrack") redirectVar = "/questiondb/uploadTopic";

  const res = await axios.post("https://www.nareshit.net/createEditTest", {
    data,
  });
  //
  console.log(data);
  console.log(res);

  return redirect("/categories/assessments");
}
