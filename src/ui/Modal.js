import React from "react";
import { createPortal } from "react-dom";
import QuestionModal from "./QuestionModal";

function Modal({ data, setter, ModalParam }) {
  return createPortal(
    <div
      onClick={() => setter(false)}
      className="fixed top-0 left-0 w-full h-full bg-sky-200 bg-opacity-50 z-10 flex justify-center items-center"
    >
      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 z-50">
        <div className="p-8">
          <ModalParam data={data} setter={setter} />
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
