import { Form } from "react-router-dom";
import { getProgLangs, queryClient } from "../util/http";
import {
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
import TechnologyService, {
  NatureOfAssessmentService,
  RandomService,
  SelectTechnologyService,
} from "../services/technologyService";
import SelectedTechnologyV2 from "../components/technology/SelectedTechnology";
import SelectedTechnology from "../components/SelectedTechnology";
import NatureOfAssessments from "../components/NatureOfAssessments";
import NatureOfAssessmentV2 from "../components/technology/NatureOfAssessment";
import Randoms from "../components/Randoms";
import Button from "../ui/Button";

import { AnimatePresence, motion } from "framer-motion";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import axios from "axios";
import AuthCtx from "../context/auth.context";
import AssessmentV2 from "../components/technology/Assessment";
import RandomV2 from "../components/technology/Random";
import TechnologyNext from "../components/technology/TechnologyNext";

const formNames = ["proglangs", "catogaryType", "assessmentNature", "random"];

function Technology() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=/categories/technology");
  }, []);

  const [checked, setChecked] = useState(false);
  const { programmingLanguages, fetchedData } = useLoaderData();
  const [linkDisabled, setLinkDisabled] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const randomId = queryParams.get("randomId");
  const natureId = queryParams.get("natureId");
  const technologyId = queryParams.get("technologyId");

  const updatedProgrammingLanguages = [...programmingLanguages];

  let editedSelectProgrammingLanguage;
  useEffect(() => {
    if (technologyId) {
      editedSelectProgrammingLanguage = updatedProgrammingLanguages.find(
        (ele) => ele.TechnologyID === Number(technologyId)
      );
    }
  }, []);

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

  function handler(e) {
    if (
      LocalStorage.technology.TechnologyID === -1 ||
      LocalStorage.data.technologyData._technology.programmingLanguage ===
        "Select A Technology"
    ) {
      e.preventDefault();
      setLinkDisabled(true);
      setChecked(true);
    } else {
      setChecked(false);
      setLinkDisabled(false);
    }
  }

  const [fixedDisabled, setFixedDisabled] = useState(
    BuilderService.technologyService._technology.natureOfAssessment === "fixed"
  );

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
            editTechnologyId={technologyId}
            editedSelectProgrammingLanguage={editedSelectProgrammingLanguage}
            programmingLanguages={updatedProgrammingLanguages}
          />
          <NatureOfAssessments
            nature={nature}
            setNature={setNature}
            editNatureId={natureId}
            setFixedDisabled={setFixedDisabled}
          />
          <Randoms
            fixedDisabled={fixedDisabled}
            random={random}
            setRandom={setRandom}
            editRandomId={randomId}
          />
          <div className=" h-20 relative">
            {linkDisabled && checked && (
              <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full">
                Must select a Technology
              </p>
            )}
            {/* <Button link="/categories/assessments" /> */}
            <div className="w-full flex mt-14">
              <button
                onClick={handler}
                className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
              >
                Next
              </button>
            </div>
          </div>
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export default Technology;

export async function loader() {
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

  let resultData = await getProgLangs();
  const result = { programmingLanguages: resultData };

  /* let dataData = { fetchedData: {} };
  const data = { fetchedData: dataData };

  if (BuilderService.id.listOfAssessment) {
    data.fetchedData["TestID"] = BuilderService.id.listOfAssessment;
    data.fetchedData["TechnologyID"] = BuilderService.id.technologyId;
    data.fetchedData["NatureID"] = natureId;
    data.fetchedData["RandomID"] = randomId;
    data.fetchedData["AssessmentID"] = 0;
    data.fetchedData["CreatedBy"] = "Admin";
    data.fetchedData["ModifiedBy"] = "Admin";
  }

  console.log("fetch", data.fetchedData);

  const res = await axios.post("https://www.nareshit.net/createEditTest", {
    data,
  });
  console.log("fetch", res);

  return { result, data }; */

  return result.programmingLanguages;
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
  data["TestID"] = BuilderService.id.testId || 0;
  data["TechnologyID"] =
    BuilderService.id.technologyId || LocalStorage.technology.TechnologyID;

  data["AssessmentID"] = 1;
  data["NatureID"] = natureId;
  data["RandomID"] = randomId;
  data["CreatedBy"] = "Admin";
  data["ModifiedBy"] = "Admin";

  let redirectVar = "/categories/assessments";

  if (data["NatureID"] === 3) redirectVar = "/questiondb/uploadTopic";

  console.log(data);

  const res = await axios.post("https://www.nareshit.net/createEditTest", {
    data: data,
  });
  //testDetailId :15731
  //testId: 15786
  console.log("res", res);
  BuilderService.id.testId = res.data.data[0].TestID;
  /* BuilderService.id.technology = res.data.data[0].TestID;
  console.log(BuilderService.id); */

  const assessmentRes = await axios.post(
    "https://www.nareshit.net/getBasicTestDetailsInfo",
    {
      data: { TestID: BuilderService.id.testId },
    }
  );

  console.log("assessmentRes", assessmentRes);

  if (assessmentRes.data && assessmentRes.data.data) {
    const assessmentObj = assessmentRes.data.data[0];
    const easy = assessmentObj?.NumOfEasy;
    const medium = assessmentObj?.NumOfMedium;
    const hard = assessmentObj?.NumOfHard;

    if (easy || medium || hard)
      redirectVar += `?easy=${easy}&medium=${medium}&hard=${hard}`;
  }

  return redirect(redirectVar);
}

export function TechnologyV2() {
  const [isFormValid, setIsFormValid] = useState();
  const shouldChangeStorage = useRef({ current: true });

  const [technologyID, setTechnologyID] = useState(
    LocalStorage?.technologyPage?.technologyID || -1
  );
  const [assessmentID, setAssessmentID] = useState(
    LocalStorage?.technologyPage?.assessmentID || 1
  );
  const [natureID, setNatureID] = useState(
    LocalStorage?.technologyPage?.natureID || 1
  );
  const [randomID, setRandomID] = useState(
    LocalStorage?.technologyPage?.randomID || 1
  );

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    // set Error message to be desplayed
    if (!technologyID) {
      setErrMsg(errMsg);
    } else {
      setErrMsg("");
    }

    // must be true to enable next button
    setIsFormValid(
      technologyID && assessmentID && natureID && randomID && technologyID != -1
    );

    // localStorage handler
    if (shouldChangeStorage?.current?.value || !LocalStorage.technologyPage) {
      LocalStorage.technologyPage = {
        technologyID,
        assessmentID,
        natureID,
        randomID,
      };
    }

    if (shouldChangeStorage && shouldChangeStorage.current) {
      shouldChangeStorage.current.value = true;
    }
  }, [technologyID, natureID, randomID]);

  return (
    <div>
      <Form method="POST" className="m-5">
        {/**  Technology */}
        <SelectedTechnologyV2
          technologyID={technologyID}
          setTechnologyID={setTechnologyID}
        />

        {/* Assessment radio */}
        <AssessmentV2
          assessmentID={assessmentID}
          setAssessmentID={setAssessmentID}
        />

        {/** Nature of Assessment   */}
        <NatureOfAssessmentV2 natureID={natureID} setNatureID={setNatureID} />

        {/**  Random */}
        <RandomV2 randomID={randomID} setRandomID={setRandomID} />

        {/**  Submit */}
        <TechnologyNext isFormValid={isFormValid} errMsg={errMsg} />
      </Form>
    </div>
  );
}

export async function TechnologyActionV2({ request, params }) {
  const formData = await request.formData();

  const TestID = BuilderService.id.testId || 0;

  const AssessmentID = formData.get("AssessmentID") || "1";
  const TechnologyID = formData.get("TechnologyID") || "1";
  const NatureID = formData.get("NatureID") || "1";
  const RandomID = formData.get("RandomID") || "1";

  const res = await axios.post("https://www.nareshit.net/createEditTest", {
    data: {
      TestID,
      AssessmentID,
      TechnologyID,
      NatureID,
      RandomID,
      CreatedBy: "Admin",
      ModifiedBy: "Admin",
    },
  });

  console.log(
    "url",
    "https://www.nareshit.net/createEditTest",
    "req",
    {
      TestID,
      AssessmentID,
      TechnologyID,
      NatureID,
      RandomID,
      CreatedBy: "Admin",
      ModifiedBy: "Admin",
    },
    "res",
    res
  );

  let redirectVar = "/categories/assessments";
  if (NatureID == 3) redirectVar = "/questiondb/uploadTopic";

  return redirect(redirectVar);
}
