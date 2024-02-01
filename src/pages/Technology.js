import { Form } from "react-router-dom";
import { getProgLangs, queryClient } from "../util/http";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import TechnologyService, {
  NatureOfAssessment,
  Random,
  SelectTechnology,
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
  console.log(
    BuilderService.technologyService._technology.programmingLanguage
      ?.programmingLanguage
  );
  const { programmingLanguages } = useLoaderData();
  const [proglang, setProgLang] = useState(
    BuilderService.technologyService._technology.programmingLanguage
      ?.programmingLanguage || ".net"
  );

  const [nature, setNature] = useState(
    BuilderService.technologyService._technology.natureOfAssessment
      ?.natureOfAssessment || "fixed"
  );

  const [random, setRandom] = useState(
    BuilderService.technologyService._technology?.assessmentNature?.random ||
      "completeTest"
  );
  useEffect(() => {
    TechnologyService.updateData({
      programmingLanguage: SelectTechnology.updateData(proglang),
    });
    LocalStorage.data = BuilderService.getData();
  }, [proglang]);

  useEffect(() => {
    TechnologyService.updateData({
      natureOfAssessment: NatureOfAssessment.updateData(nature),
    });
    LocalStorage.data = BuilderService.getData();
  }, [nature]);

  useEffect(() => {
    TechnologyService.updateData({
      assessmentNature: Random.updateData(random),
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
            programmingLanguages={programmingLanguages}
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
