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
  const [selectedModule, setSelectedModule] = useState("-1");
  const [selectedTopic, setSelectedTopic] = useState("-1");
  const [selectedSubTopic, setSelectedSubTopic] = useState("-1");

  const [warn, setWarn] = useState(false);

  // Modules
  const fetchModules = async () => {
    const res = await axios.get(
      `https://www.nareshit.net/fetchModules/${technologyId}`
    );

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
      TestId: testID,
      TestDetailsId: testDetailsId,
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
        TestId: testID,
        TestDetailsId: testDetailsId,
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
      const res = await axios.post(
        "https://www.nareshit.net/Insert_Update_QuestionCombination",
        {
          TestId: testID,
          TestDetailsId: testDetailsId,
          Combinations: JSON.stringify(combination),
        }
      );
      return res;
    };

    let insertRes;

    if (Object.keys(combination).length > 0) insertRes = postCombinations();
    console.log(
      "url",
      "https://www.nareshit.net/Insert_Update_QuestionCombination",
      {
        TestId: testID,
        TestDetailsId: testDetailsId,
        Combinations: JSON.stringify(combination),
      },
      "res",
      insertRes
    );
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
    /* let subTopicArr = combination;
    subTopicArr = Object.values(combination).map((ele) => ele.SubTopicID);

    let topicArr = combination;
    topicArr = Object.values(combination).map((ele) => ele.TopicID);

    let moduleArr = combination;
    moduleArr = Object.values(combination).map((ele) => ele.ModuleID);

    console.log(moduleArr, selectedModule, moduleArr.includes(selectedModule));
    console.log(topicArr, selectedTopic, topicArr.includes(selectedTopic));
    console.log(
      subTopicArr,
      selectedSubTopic,
      subTopicArr.includes(selectedSubTopic)
    );

    // Validation 1
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

      const callModal = () => {
        setDataHandler(selectedModule, selectedTopic, selectedSubTopic, {
          Module,
          Topic,
          SubTopic,
        });
      };

      // Validation 2
      if (!topicArr.includes(selectedTopic)) {
        callModal();
      } else {
        if (
          (subTopicArr.includes(selectedSubTopic) &&
            topicArr.includes(selectedTopic) &&
            moduleArr.includes(selectedModule)) ||
          ((selectedTopic == -1 || selectedTopic == 0) &&
            moduleArr.includes(selectedModule))
        ) {
          window.alert(
            "A row with this combination already exists in the table, if you wish to edit values go through table."
          );
        } else {
          console.log(selectedTopic);

          let userResponse = true;

          // Validation 3
          if (selectedTopic == 0 || selectedTopic == -1) {
          } else {
            userResponse = window.confirm(
              `Combination with the same ${
                selectedTopic == -1 || selectedTopic == 0 ? "module" : "topic"
              } already exists. still want to create new question template`
            );
          }

          if (userResponse) {
            callModal();
          }
        }
      }
    } else {
      setWarn(true);
    } */
    test();
  };

  const test = () => {
    let valid = false;
    const obj = Object.values(combination);

    let Module;
    let Topic;
    let SubTopic;

    let moduleArr = combination;
    moduleArr = Object.values(combination).map((ele) => ele.ModuleID);

    let topicArr = combination;
    topicArr = Object.values(combination).map((ele) => ele.TopicID);

    let subTopicArr = combination;
    subTopicArr = Object.values(combination).map((ele) => ele.SubTopicID);

    if (selectedModule && selectedModule != -1) {
      if (selectedModule)
        Module = modules.find((ele) => ele.ModuleID == selectedModule);

      if (selectedTopic)
        Topic = topics.find((ele) => ele.TopicID == selectedTopic);

      if (selectedSubTopic)
        SubTopic = subTopics.find((ele) => ele.SubTopicID == selectedSubTopic);
    }
    const callModal = () => {
      setDataHandler(selectedModule, selectedTopic, selectedSubTopic, {
        Module,
        Topic,
        SubTopic,
      });
      valid = true;
    };

    if (obj.length == 0) {
      callModal();
    } else {
      obj.forEach((ele) => {
        if (!valid) {
          if (
            selectedModule == ele.ModuleID &&
            selectedTopic == ele.TopicID &&
            selectedSubTopic == ele.SubTopicID
          ) {
            console.log("cought");
            window.alert(
              "A row with this combination already exists in the table, if you wish to edit values go through table."
            );
            valid = true;
          } else if (
            selectedModule == ele.ModuleID &&
            selectedTopic == ele.TopicID &&
            subTopicArr.includes(selectedSubTopic)
          ) {
            console.log("cought");
            window.alert(
              "A row with this combination already exists in the table, if you wish to edit values go through table."
            );
            valid = true;
          } else if (
            selectedModule == ele.ModuleID &&
            selectedTopic == ele.TopicID
          ) {
            let userResponse = false;
            console.log(selectedSubTopic, ele.SubTopicID);
            if (selectedSubTopic != ele.SubTopicID) {
              console.log("cought");
              userResponse = window.confirm(
                `Combination with the same topic already exists. still want to create new question template`
              );
              valid = true;
            }

            if (userResponse) {
              callModal();
            }
          } else if (
            selectedModule == ele.ModuleID &&
            !topicArr.includes(selectedTopic) &&
            (selectedSubTopic == 0 || selectedSubTopic == 1)
          ) {
            console.log("cought");
            callModal();
            valid = true;
          } else if (
            selectedModule != ele.ModuleID &&
            !moduleArr.includes(selectedModule) &&
            (selectedTopic == 0 || selectedTopic == -1)
          ) {
            console.log("cought");
            callModal();
            valid = true;
          }
        }

        // Validation 2
        if (!valid) {
          console.log(
            (selectedModule != 0 || selectedModule != -1) &&
              (selectedTopic != 0 || selectedTopic != -1) &&
              !subTopicArr.includes(selectedSubTopic)
          );
        }
      });
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
