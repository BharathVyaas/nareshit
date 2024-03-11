import React from "react";
import Modal from "./Modal";
import QuestionModal from "./QuestionModal";

function QuestionModelHandler({ question, setModalData }) {
  return (
    <Modal data={question} setter={setModalData} ModalParam={QuestionModal} />
  );
}

export default QuestionModelHandler;
