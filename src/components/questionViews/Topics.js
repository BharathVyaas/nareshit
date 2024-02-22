import React, { useEffect, useState } from "react";
import ModuleNameRenderer from "./ModuleNameRenderer";
import TopicNameRenderer from "./TopicNameRenderer";
import SubTopicNameRenderer from "./SubTopicNameRenderer";
import axios from "axios";
import { useLocation } from "react-router";

function Topics({ setDataHandler }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const technologyId = queryParams.get("TechnologyID") || 0;

  const [modules, setModules] = useState();
  const [topics, setTopics] = useState();
  const [subTopics, setSubTopics] = useState();

  // selected Data
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedSubTopic, setSelectedSubTopic] = useState(0);

  // Modules
  const fetchModules = async () => {
    const res = await axios.get(`https://www.nareshit.net/fetchModules/${2}`);

    setModules(res.data);
  };

  // Topics
  const fetchTopics = async () => {
    const res = await axios.get(`https://www.nareshit.net/FetchTopics/${2}`);

    setTopics(res.data);
  };

  // SubTopics
  const fetchSubTopics = async () => {
    const res = await axios.get(`https://www.nareshit.net/FetchSubTopics/${2}`);

    setSubTopics(res.data);
  };

  // Modules
  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    if (selectedTopic) setSelectedTopic(0);
    if (selectedSubTopic) setSelectedSubTopic(0);
  }, [selectedModule]);

  // Topics
  useEffect(() => {
    if (selectedModule) fetchTopics(selectedModule);
  }, [selectedModule]);

  useEffect(() => {
    if (selectedSubTopic) {
      setSelectedSubTopic(0);
    }
  }, [selectedTopic]);

  // SubTopics
  useEffect(() => {
    if (selectedTopic) fetchSubTopics();
  }, [selectedTopic]);

  // handler for set Data button
  const onSetData = () => {
    let Module;
    if (selectedModule)
      Module = modules.find((ele) => ele.ModuleID == selectedModule);
    let Topic;
    if (selectedTopic)
      Topic = topics.find((ele) => ele.TopicID == selectedTopic);
    let SubTopic;
    if (selectedSubTopic)
      SubTopic = subTopics.find((ele) => ele.SubTopicID == selectedSubTopic);

    setDataHandler(selectedModule, selectedTopic, selectedSubTopic, {
      Module,
      Topic,
      SubTopic,
    });
  };

  return (
    <>
      {/**  head */}
      <div className="flex justify-between">
        <p className="ms-[20px] pt-5 text-lg font-semibold">
          Selected Technology: DotNet
        </p>
        <button
          onClick={() => {
            if (selectedModule && selectedModule != -1) onSetData();
          }}
          className="mr-[20px] mt-5 px-6 max-h-8 min-h-8 bg-[gray] text-white font-semibold rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:bg-gray-500 focus:ring-opacity-50"
        >
          Set Data
        </button>
      </div>
      <div className="flex my-[20px] w-full">
        <div className="flex justify-between w-full">
          {/** Select Module */}
          <ModuleNameRenderer
            modules={modules}
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
          />

          {/** Select Topic */}
          <TopicNameRenderer
            topics={topics}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />

          {/** Select SubTopic */}
          <SubTopicNameRenderer
            subTopics={subTopics}
            selectedSubTopics={selectedSubTopic}
            setSelectedSubTopic={setSelectedSubTopic}
          />
        </div>
      </div>
    </>
  );
}

export default Topics;
