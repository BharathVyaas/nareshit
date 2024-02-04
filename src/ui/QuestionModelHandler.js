import React from "react";
import Modal from "./Modal";

function QuestionModelHandler({ question, setModalData }) {
  return <Modal data={question} setter={setModalData} />;
}

export default QuestionModelHandler;
