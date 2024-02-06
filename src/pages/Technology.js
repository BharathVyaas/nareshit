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
  const requestData = {};
  requestData["requestDataBody"] = LocalStorage.data;
  requestData["TestID"] = 123;
  requestData["TestDetailsID"] = 0;
  requestData["QuestionTypeID"] = 1;
  requestData["Technology"] =
    LocalStorage.data.technologyData._technology.programmingLanguage;
  requestData["SubTopic"] = LocalStorage.data.technologyData._technology;
  requestData["Module"] = LocalStorage.data.technologyData._technology;
  requestData["Topic"] = LocalStorage.data.technologyData._technology;
  requestData["CreatedBy"] = "Admin";
  requestData["ModifiedBy"] = "Admin";

  let redirectVar = "/categories/assessments";

  if (requestData.Topic.natureOfAssessment === "fixed")
    redirectVar = "/questiondb/uploadTopic";

  console.log(requestData);

  return redirect(redirectVar);
}
