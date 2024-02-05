import React, { useContext } from "react";
import Modal from "./Modal";
import TopicsContext from "../context/topicsContext";
import TopicModal from "./TopicModal";

function TopicModalHandlar({ topicData, setTopics }) {
  return <Modal data={topicData} setter={setTopics} ModalParam={TopicModal} />;
}

export default TopicModalHandlar;
