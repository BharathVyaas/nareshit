import { Form, Link } from "react-router-dom";
import { getProgLangs, queryClient } from "../util/http";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import TechnologyService, {
  NatureOfAssessment,
  Random,
  SelectTechnology,
} from "../services/technologyService";

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
    <>
      <Form method="POST" className="p-5">
        <div className="flex mb-5">
          <label htmlFor="proglangs">Select Technology:</label>
          <select
            id="proglangs"
            name="proglangs"
            className="mx-5"
            value={proglang}
            onChange={(e) => setProgLang(e.target.value)}
          >
            {programmingLanguages.map(({ id, language }) => (
              <option key={id} value={language}>
                {language}
              </option>
            ))}
          </select>
          <label htmlFor="catogaryType">
            <input id="catogaryType" type="radio" name="catogaryType" />
            <span className="p-2">Assessment</span>
          </label>
        </div>
        <div>
          <fieldset className="mx-4">
            <legend>Nature of Assessment:</legend>
            <div className="mt-2 mb-5">
              <label className="p-5">
                <input
                  type="radio"
                  name="assessmentNature"
                  value="dynamic"
                  checked={nature === "dynamic"}
                  onChange={(e) => setNature(e.target.value)}
                />
                <span className="p-2">Dynamic</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="assessmentNature"
                  checked={nature === "fixed"}
                  value="fixed"
                  onChange={(e) => setNature(e.target.value)}
                />
                <span className="p-2">Fixed</span>
              </label>
            </div>
          </fieldset>
        </div>
        <div className="mx-4">
          <fieldset>
            <legend>Random:</legend>
            <div className="mt-2">
              <label className="p-5">
                <input
                  type="radio"
                  name="random"
                  value="completeTest"
                  checked={random === "completeTest"}
                  onChange={(e) => setRandom(e.target.value)}
                />
                <span className="ps-2">Complete Test</span>
              </label>
              <label className="p-5">
                <input
                  type="radio"
                  name="random"
                  value="moduleWiseRandom"
                  checked={random === "moduleWiseRandom"}
                  onChange={(e) => setRandom(e.target.value)}
                />
                <span className="ps-2">Module Wise Random</span>
              </label>
              <label className="p-5">
                <input
                  type="radio"
                  name="random"
                  value="topicWiseRandom"
                  checked={random === "topicWiseRandom"}
                  onChange={(e) => setRandom(e.target.value)}
                />
                <span className="ps-2">Topic Wise Random</span>
              </label>
              <label className="p-5">
                <input
                  type="radio"
                  name="random"
                  value="noRandom"
                  checked={random === "noRandom"}
                  onChange={(e) => setRandom(e.target.value)}
                />
                <span className="ps-2">No Random</span>
              </label>
            </div>
          </fieldset>
        </div>
        <div className="w-full flex mt-14">
          <Link
            to="/categories/assessments"
            className="inline-block px-10 py-2 mx-auto mt-3 bg-green-200"
          >
            Next
          </Link>
        </div>
      </Form>
    </>
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

  console.log(requestData);

  return 1;
}
