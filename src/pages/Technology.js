import { Form } from "react-router-dom";
import { getProgLangs, queryClient } from "../util/http";
import { useLoaderData } from "react-router";
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

  console.log(
    LocalStorage.data?.technologyData._technology.programmingLanguage
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

          <Button link="/categories/assessments" />
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

export async function action({ request }) {
  const formData = await request.formData();
  const requestData = {};
  formNames.forEach((name) => {
    requestData[name] = formData.get(name);
  });

  return 1;
}
