import React, { useEffect, useState } from "react";
import ModuleNameRenderer from "./ModuleNameRenderer";
import TopicNameRenderer from "./TopicNameRenderer";
import SubTopicNameRenderer from "./SubTopicNameRenderer";
import axios from "axios";

function Topics() {
  const [modules, setModules] = useState();
  const [topics, setTopics] = useState();
  const [subTopics, setSubTopics] = useState();

  // Modules
  const fetchModules = async () => {
    const res = await axios.get(`https://www.nareshit.net/fetchModules/${2}`);
    console.log(res.data);
    setModules(res.data);
  };

  // Topics
  const fetchTopics = async () => {
    const res = await axios.get(`https://www.nareshit.net/FetchTopics/${2}`);
    console.log(res.data);
    setTopics(res.data);
  };

  // SubTopics
  const fetchSubTopics = async () => {
    const res = await axios.get(`https://www.nareshit.net/FetchSubTopics/${2}`);
    console.log(res.data);
    setSubTopics(res.data);
  };

  // Modules
  useEffect(() => {
    fetchModules();
  }, []);

  // Topics
  useEffect(() => {
    fetchTopics();
  }, [modules]);

  useEffect(() => {
    fetchSubTopics();
  }, [modules, topics]);

  return (
    <div className="flex justify-between">
      {/** Select Module */}
      <ModuleNameRenderer modules={modules} />

      {/** Select Topic */}
      <TopicNameRenderer topics={topics} />

      {/** Select SubTopic */}
      <SubTopicNameRenderer subTopics={subTopics} />
    </div>
  );
}

export default Topics;
