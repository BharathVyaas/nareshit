import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchTechnologyList,
  fetchTechnologyPageDetails,
  userSelectionAction,
} from "../store/root.actions";
import TechnologyDropDown from "../components/technology/TechnologyDropDown";
import Assessment from "../components/technology/Assessment";
import NatureOfAssessment from "../components/technology/NatureOfAssessment";
import Random from "../components/technology/Random";
import TechnologyNext from "../components/technology/TechnologyNext";
import { useParams } from "react-router";

function Technology() {
  const dispatch = useDispatch();
  const { testId } = useParams();

  useEffect(() => {
    dispatch(userSelectionAction.setTestId(testId));
    dispatch(fetchTechnologyList());
    dispatch(fetchTechnologyPageDetails(testId));
  }, []);

  return (
    <div className="container mt-10 m-2">
      <div>
        <div className="w-[20rem]">
          <TechnologyDropDown />
        </div>
        <div>
          <Assessment />
        </div>
        <div className="flex flex-col mb-4">
          <NatureOfAssessment />
        </div>
        <div className="mx-4">
          <Random />
        </div>
        <div>
          <TechnologyNext />
        </div>
      </div>
    </div>
  );
}

export default Technology;
