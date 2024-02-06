import React, { useContext } from "react";
import Modal from "./Modal";
import TopicsContext from "../context/topicsContext";
import QuestionView from "./QuestionView";

function QuestionViewHandler({ topicData, setTopics, setPopup, handler }) {
  return (
    <Modal
      data={topicData}
      setter={setPopup}
      ModalParam={QuestionView}
      handler={handler}
    />
  );
}

export default QuestionViewHandler;
