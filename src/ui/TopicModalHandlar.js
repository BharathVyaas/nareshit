import React, { useContext } from "react";
import Modal from "./Modal";
import TopicsContext from "../context/topicsContext";
import TopicModal from "./TopicModal";

function TopicModalHandlar({ topicData, setTopics, setPopup, handler }) {
  return (
    <Modal
      data={topicData}
      setter={setPopup}
      ModalParam={TopicModal}
      handler={handler}
    />
  );
}

export default TopicModalHandlar;
