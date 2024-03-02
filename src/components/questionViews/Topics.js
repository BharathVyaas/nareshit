import React, { useEffect, useState } from "react";
import ModuleNameRenderer from "./ModuleNameRenderer";
import TopicNameRenderer from "./TopicNameRenderer";
import SubTopicNameRenderer from "./SubTopicNameRenderer";
import axios from "axios";
import { useLocation } from "react-router";

function Topics({ setDataHandler, combination }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const technologyName = queryParams.get("TechnologyName") || 0;
  const technologyId = queryParams.get("TechnologyID") || 0;
  const testID = queryParams.get("TestID") || 0;
  const testDetailsId = queryParams.get("TestDetailsID") || 0;

  const [modules, setModules] = useState();
  const [topics, setTopics] = useState();
  const [subTopics, setSubTopics] = useState();

  // selected Data
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedSubTopic, setSelectedSubTopic] = useState(0);

  const [warn, setWarn] = useState(false);

  // Modules
  const fetchModules = async () => {
    const res = await axios.get(`https://www.nareshit.net/fetchModules/2`);

    setModules(res.data);
  };

  // Topics
  const fetchTopics = async () => {
    const res = await axios.get(
      `https://www.nareshit.net/FetchTopics/${selectedModule}`
    );

    setTopics(res.data);
  };

  // SubTopics
  const fetchSubTopics = async () => {
    console.log("fetch");
    const res = await axios.get(
      `https://www.nareshit.net/FetchSubTopics/${selectedTopic}`
    );

    setSubTopics(res.data);
  };

  const saveHandler = async () => {
    console.log({
      data: [
        ...Object.values(combination).map((ele) => {
          return {
            EasyCount: ele?.easy || 0,
            MediumCount: ele?.medium || 0,
            HardCount: ele?.hard || 0,
            ModuleId: ele?.ModuleID || null,
            TopicId: ele?.TopicID || null,
            SubtopicId: ele.SubtopicID || null,
            TechnologyName: technologyName || null,
            TechnologyId: technologyId || null,
            ModuleName: ele?.selectedModule || null,
            TopicName: ele?.selectedTopic || null,
            SubtopicName: ele?.selectedSubTopic || null,
            TestDetailsID: testDetailsId || 0,
            TestID: testID || 0,
          };
        }),
      ],
    });

    const res = await axios.post(
      "https://www.nareshit.net/UpdateCombinations",
      {
        data: [
          ...Object.values(combination).map((ele) => {
            return {
              EasyCount: ele?.easy || 0,
              MediumCount: ele?.medium || 0,
              HardCount: ele?.hard || 0,
              ModuleId: ele?.ModuleID || null,
              TopicId: ele?.TopicID || null,
              SubtopicId: ele?.SubTopicID || null,
              TechnologyName: technologyName || null,
              TechnologyId: technologyId || null,
              ModuleName: ele?.selectedModule || null,
              TopicName: ele?.selectedTopic || null,
              SubtopicName: ele?.selectedSubTopic || null,
              TestDetailsID: testDetailsId || 0,
              TestID: testID || 0,
            };
          }),
        ],
      }
    );

    console.log(
      "url",
      "https://www.nareshit.net/UpdateCombinations",
      "data",
      {
        data: [
          ...Object.values(combination).map((ele) => {
            return {
              EasyCount: ele?.easy || 0,
              MediumCount: ele?.medium || 0,
              HardCount: ele?.hard || 0,
              ModuleId: ele?.ModuleID || null,
              TopicId: ele?.TopicID || null,
              SubtopicId: ele?.SubTopicID || null,
              TechnologyName: technologyName || null,
              TechnologyId: technologyId || null,
              ModuleName: ele?.selectedModule || null,
              TopicName: ele?.selectedTopic || null,
              SubtopicName: ele?.selectedSubTopic || null,
              TestDetailsID: testDetailsId || 0,
              TestID: testID || 0,
            };
          }),
        ],
      },
      "res",
      res
    );

    // Post Combinations to Custome table

    const postCombinations = async () => {
      await axios.post(
        "https://www.nareshit.net/Insert_Update_QuestionCombination",
        {
          TestId: testID,
          TestDetailsId: testDetailsId,
          Combinations: JSON.stringify(combination),
        }
      );
    };

    if (Object.keys(combination).length > 0) postCombinations();
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

  useEffect(() => {
    setSubTopics([]);
  }, [topics]);

  // disable warn
  useEffect(() => {
    if (selectedModule && selectedModule != -1 && warn) {
      setWarn(false);
    }
  }, [selectedModule]);

  // handler for set Data button
  const onSetData = () => {
    if (selectedModule && selectedModule != -1) {
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
    } else {
      setWarn(true);
    }
  };

  return (
    <>
      {/**  head */}
      <div className="flex justify-between">
        <p className="ms-[20px] pt-5 text-lg font-semibold">
          Selected Technology: {technologyName}
        </p>
        <div className="flex text-center">
          {warn && (
            <p className="animate-pulse grid place-content-center mr-[20px] mt-5 max-h-8 min-h-8 font-semibold">
              Select one module
            </p>
          )}
          <button
            onClick={onSetData}
            className="mr-[20px] w-[250px] mt-5 px-6 max-h-8 min-h-8 bg-[gray] text-white font-semibold rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:bg-gray-500 focus:ring-opacity-50"
          >
            Set Question Template
          </button>
          <button
            onClick={saveHandler}
            className="mr-[20px] w-[118px] mt-5 px-6 max-h-8 min-h-8 bg-[gray] text-white font-semibold rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:bg-gray-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
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
