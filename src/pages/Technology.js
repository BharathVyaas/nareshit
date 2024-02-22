import { Form } from "react-router-dom";
import { redirect, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";

import SelectedTechnologyV2 from "../components/technology/SelectedTechnology";
import NatureOfAssessmentV2 from "../components/technology/NatureOfAssessment";

import BuilderService from "../services/builder";
import axios from "axios";
import AssessmentV2 from "../components/technology/Assessment";
import RandomV2 from "../components/technology/Random";
import TechnologyNext from "../components/technology/TechnologyNext";

export function TechnologyV2() {
  /**
   *
   * Default Data
   */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const randomId = queryParams.get("randomId");
  const natureId = queryParams.get("natureId");
  const technologyId = queryParams.get("technologyId");

  const [isFormValid, setIsFormValid] = useState();

  const [technologyID, setTechnologyID] = useState(
    technologyId === "null" ? -1 : technologyId || -1
  );
  const [assessmentID, setAssessmentID] = useState(1);
  const [natureID, setNatureID] = useState(
    natureId === "null" ? 1 : natureId || 1
  );
  const [randomID, setRandomID] = useState(
    randomId === "null" ? 1 : randomId || 1
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

  let TestID = params.TestID || 0;

  let AssessmentID = formData.get("AssessmentID") || "1";
  let TechnologyName = formData.get("TechnologyName") || "None Selected";
  let TechnologyID = formData.get("TechnologyID") || "1";
  let NatureID = formData.get("NatureID") || "1";
  let RandomID = formData.get("RandomID") || "1";

  let res = await axios.post("https://www.nareshit.net/createEditTest", {
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

  TestID = res.data.data[0]?.TestID;
  TestID = 15901;

  // Get Data to make add Default values
  res = await axios.post("https://www.nareshit.net/getBasicTestDetailsInfo", {
    data: { TestID: TestID },
  });

  console.log("getBasicTestDetailsInfo response:", res);

  TestID = res.data.data[0]?.TestID || 0;

  let TestDetailsID = res.data.data[0]?.TestDetailsID;
  let NumOfEasy = res.data.data[0]?.NumOfEasy;
  let NumOfMedium = res.data.data[0]?.NumOfMedium;
  let NumOfHard = res.data.data[0]?.NumOfHard;

  console.log("req", params);

  let redirectVar = "/categories/assessments";

  if (TestID) {
    redirectVar = `/categories/assessments?edit=true&TestID=${TestID}&TestDetailsID=${TestDetailsID}&TechnologyName=${TechnologyName}&TechnologyID=${TechnologyID}&NumOfEasy=${NumOfEasy}&NumOfMedium=${NumOfMedium}&NumOfHard=${NumOfHard}`;
  }

  if (NatureID == 3) redirectVar = "/questiondb/uploadTopic";

  return redirect(redirectVar);
}
