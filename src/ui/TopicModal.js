import React from "react";
import Modal from "./Modal";
import QuestionModal from "./QuestionModal";

function TopicModal({ question, setModalData, data }) {
  return (
    <>
      <div onClick={() => {}} className="z-20">
        <section>
          <label htmlFor="topiceasy">
            Easy:
            <input id="topiceasy" type="number" />
          </label>
          <label htmlFor="topiceasy">
            Medium:
            <input id="topiceasy" type="number" />
          </label>
          <label htmlFor="topiceasy">
            Hard:
            <input id="topiceasy" type="number" />
          </label>
        </section>
      </div>
    </>
  );
}

export default TopicModal;
