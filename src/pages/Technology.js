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

const formNames = ["proglangs", "catogaryType", "assessmentNature", "random"];

function Technology() {
  const { programmingLanguages } = useLoaderData();

  const [proglang, setProgLang] = useState(programmingLanguages[0].language);

  const [nature, setNature] = useState("dynamic");

  const [random, setRandom] = useState("completeTest");

  useEffect(() => {
    TechnologyService.updateData({
      programmingLanguage: SelectTechnology.updateData(proglang),
    });
  }, [proglang]);

  useEffect(() => {
    TechnologyService.updateData({
      assessmentNature: NatureOfAssessment.updateData(nature),
    });
  }, [nature]);

  useEffect(() => {
    TechnologyService.updateData({
      assessmentNature: Random.updateData(random),
    });
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
