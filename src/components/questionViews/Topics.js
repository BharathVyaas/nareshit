import React, { useEffect, useState } from "react";
import ModuleNameRenderer from "./ModuleNameRenderer";
import TopicNameRenderer from "./TopicNameRenderer";
import SubTopicNameRenderer from "./SubTopicNameRenderer";
import axios from "axios";

function Topics({ setDataHandler }) {
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
        <p>Selected Technology: DotNet</p>
        <button onClick={onSetData}>Set Data</button>
      </div>
      <div className="flex justify-between">
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
    </>
  );
}

export default Topics;
