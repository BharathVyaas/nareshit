<<<<<<< HEAD
import React from "react";
import Modal from "./Modal";
import QuestionView from "./QuestionView";

function QuestionViewHandler({ modalData, setPopup, handler, styles }) {
  return (
    <Modal
      data={modalData}
      setter={setPopup}
      ModalParam={QuestionView}
      handler={handler}
      styles={styles}
=======
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
>>>>>>> origin/main
    />
  );
}

export default QuestionViewHandler;
