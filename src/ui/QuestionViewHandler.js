<<<<<<< HEAD
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
=======
import React from "react";
>>>>>>> origin/master
import Modal from "./Modal";
import QuestionView from "./QuestionView";

function QuestionViewHandler({ modalData, setPopup, handler, styles }) {
  return (
    <Modal
      data={modalData}
      setter={setPopup}
      ModalParam={QuestionView}
      handler={handler}
<<<<<<< HEAD
>>>>>>> origin/main
=======
      styles={styles}
>>>>>>> origin/master
    />
  );
}

export default QuestionViewHandler;
