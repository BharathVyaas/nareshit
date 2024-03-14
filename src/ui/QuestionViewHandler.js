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
    />
  );
}

export default QuestionViewHandler;
