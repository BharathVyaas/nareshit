import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getModuleNames,
  getSubTopicNames,
  getTopicNames,
  queryClient,
} from "../../util/http";
import BuilderService from "../../services/builder";
import { LocalStorage } from "../../services/LocalStorage";
import TopicsContext, {
  TopicsContextProvider,
} from "../../context/topicsContext";
import axios from "axios";
import Modal from "../../ui/Modal";
import TopicModelHandlar from "../../ui/TopicModalHandlar";

function QusetionViewTechnlogy({
  selectedModule,
  setSelectedModule,
  selectedTopic,
  setSelectedTopic,
  selectedSubTopic,
  setSelectedSubTopic,
}) {
  useEffect(() => {
    /* console.log("selectedModule:update"); */
  }, [selectedModule]);
  useEffect(() => {
    /* console.log("selectedTopic", selectedTopic); */
  }, [selectedTopic]);
  useEffect(() => {
    /* console.log("selectedSubTopic:update"); */
  }, [selectedSubTopic]);

  return (
    <>
      <TopicsContextProvider>
        <ModuleDataLoader
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
        />
        {selectedModule && (
          <TopicDataLoader
            selectedModule={selectedModule}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        )}
        {selectedTopic &&
        LocalStorage.topicData &&
        LocalStorage._getTopicDataById() ? (
          <SubTopicDataLoader
            selectedTopic={setSelectedTopic}
            selectedSubTopic={selectedSubTopic}
            setSelectedSubTopic={setSelectedSubTopic}
          />
        ) : (
          <div className="max-w-[30%] overflow-hidden flex flex-col">
            <span>
              <label htmlFor="subtopicName">Sub Topic Name:</label>
            </span>
            <select id="subtopicName" name="subtopicName" className="">
              <option value="selectsubtopic">Select A Subtopic</option>
            </select>
          </div>
        )}
      </TopicsContextProvider>
    </>
  );
}

export default QusetionViewTechnlogy;

function ModuleDataLoader({ selectedModule, setSelectedModule }) {
  /* console.log("ModuleDataLoader:rerender"); */
  const { data: moduleData } = useQuery({
    queryKey: ["QuestionView", "ModuleNames"],
    queryFn: getModuleNames,
  });

  if (moduleData && typeof moduleData === "object") {
    return (
      <ModuleName
        moduledata={moduleData.moduleNames}
        selectedModule={selectedModule}
        setSelectedTechnology={setSelectedModule}
      />
    );
  }
  return <h1>loading</h1>;
}

function ModuleName({ setSelectedTechnology, moduledata }) {
  const moduleNames = moduledata.map((element) => ({
    moduleName: element.ModuleName,
    moduleId: element.ModuleID,
    technologyId: element.TechnologyID,
    description: element.Description,
    topicCount: element.TopicsCount,
    isActive: element.IsActive,
    createdAt: element.CreatedAt,
    modifiedAt: element.ModifiedAt,
    modifiedBy: element.ModifiedBy,
    createdBy: element.CreatedBy,
  }));

  const [selectedModule, setSelectedModule] = useState(
    BuilderService.questionService.selectedTechnology.module || moduleNames[0]
  );

  useEffect(() => {
    setSelectedTechnology((prev) => {
      return { ...prev, module: selectedModule };
    });
    LocalStorage.moduleData = selectedModule;
    BuilderService.questionService.selectedTechnology.module = selectedModule;
  }, [setSelectedTechnology, selectedModule]);

  const handleModuleChange = (event) => {
    const selectedModuleName = event.target.value;
    const selectedModule = moduleNames.find(
      (module) => module?.moduleName === selectedModuleName
    );

    setSelectedModule(selectedModule);
  };

  return (
    <>
      <Form className="max-w-[20%] me-6">
        <label htmlFor="moduleName">
          Module Name:
          <select
            id="moduleName"
            name="moduleName"
            value={selectedModule?.moduleName}
            onChange={handleModuleChange}
          >
            {moduleNames.map((element, index) => (
              <option
                key={element?.moduleId || "" + index}
                value={element.moduleName}
              >
                {element.moduleName}
              </option>
            ))}
          </select>
        </label>
      </Form>
    </>
  );
}

function TopicDataLoader({ selectedTopic, setSelectedTopic, selectedModule }) {
  /* console.log("TopicDataLoader:rerender"); */
  const { data } = useQuery({
    queryKey: ["QuestionView", "TopicNames"],
    queryFn: getTopicNames,
  });

  useEffect(() => {
    if (data) setSelectedTopic(data[0]);
    if (data) LocalStorage.topicData = data[0];
  }, [data]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["QuestionView", "TopicNames"],
      exact: true,
    });
  }, [selectedModule]);

  if (data && typeof data === "object") {
    return (
      <TopicName
        data={data}
        selectedTopic={selectedTopic}
        setSelectedTechnology={setSelectedTopic}
      />
    );
  }
  return <h1>loading</h1>;
}

function TopicName({ setSelectedTechnology, data }) {
  const topicNames = data.map((element) => ({
    topicName: element.TopicName,
    moduleId: element.ModuleID,
    topicId: element.TopicID,
    parentTopicId: element.ParentTopicID,
    description: element.Description,
    subTopicCount: element.SubTopicCount,
    isActive: element.IsActive,
    createdAt: element.CreatedAt,
    modifiedAt: element.ModifiedAt,
    modifiedBy: element.ModifiedBy,
    createdBy: element.CreatedBy,
  }));

  const [selectedModule, setSelectedModule] = useState(
    BuilderService.questionService.selectedTechnology.topic || topicNames[0]
  );
  const { setShouldLoad } = useContext(TopicsContext);
  useEffect(() => {
    setSelectedTechnology((prev) => {
      return { ...prev, topic: selectedModule };
    });
    setShouldLoad(true);
    LocalStorage.topicData = selectedModule;
    BuilderService.questionService.selectedTechnology.topic = selectedModule;
  }, [setSelectedTechnology, selectedModule]);

  const handleModuleChange = (event) => {
    const selectedModuleName = event.target.value;
    const selectedModule = topicNames.find(
      (module) => module?.topicName === selectedModuleName
    );

    setSelectedModule(selectedModule);
  };
  return (
    <Form className="max-w-[45%] overflow-hidden me-6 flex flex-col">
      <span>
        <label htmlFor="topicName">Topic Name:</label>
      </span>

      <select
        id="topicName"
        name="topicName"
        value={selectedModule?.topicName}
        onChange={handleModuleChange}
      >
        {topicNames.map((element, index) => (
          <option
            className=""
            key={element.moduleId + index}
            value={element?.topicName || ""}
          >
            {element.topicName}
          </option>
        ))}
      </select>
    </Form>
  );
}

function SubTopicDataLoader({ setSelectedSubTopic, selectedTopic, stale }) {
  /* console.log("SubTopicDataLoader:rerender"); */
  const [data, setData] = useState([
    { subTopicName: "Select A Topic", subTopicId: -1 },
  ]);

  const { shouldLoad, setShouldLoad } = useContext(TopicsContext);

  if (LocalStorage._getTopicDataById && (!data || shouldLoad))
    axios
      .get(
        `https://www.nareshit.net/FetchSubTopics/${LocalStorage._getTopicDataById()}`
      )
      .then((res) => {
        //console.log(res);
        setShouldLoad(false);
        setData([
          { subTopicName: "Select SubTopic", subTopicId: -1 },
          ...res.data,
        ]);
      });

  useEffect(() => {
    /* console.log("selectedTopic:update", selectedTopic); */
  }, [selectedTopic]);

  return (
    <>
      {data && data[0].subTopicId === -1 ? (
        <SubTopicName data={data} setSelectedTechnology={setSelectedSubTopic} />
      ) : (
        <div className="max-w-[30%] overflow-hidden flex flex-col">
          <span>
            <label htmlFor="subtopicName">Sub Topic Name:</label>
          </span>
          <select id="subtopicName" name="subtopicName" className="">
            <option value="selectsubtopic">Select A Subtopic</option>
          </select>
        </div>
      )}
    </>
  );
}

function SubTopicName({ setSelectedTechnology, data }) {
  const subTopicNames = data.map((element) => ({
    subTopicName: element.SubTopicName,
    moduleId: element.ModuleID,
    subTopicId: element.SubTopicID,
    parentTopicId: element.ParentTopicID,
    MCQCheckCount: element.MCQCheckCount,
    MCQRadioCount: element.MCQRadioCount,
    matchingCount: element.MatchingCount,
    codeCount: element.CodeCount,
    freeTextCount: element.FreeTextCount,
    isActive: element.IsActive,
    createdAt: element.CreatedAt,
    createdBy: element.CreatedBy,
    modifiedAt: element.ModifiedAt,
    modifiedBy: element.ModifiedBy,
  }));

  const [selectedModule, setSelectedModule] = useState(
    BuilderService.questionService.selectedTechnology.subTopic ||
      subTopicNames[0]
  );

  let topicData = {
    selectedSubTopic: LocalStorage.subTopicData,
    selectedTopic: LocalStorage.topicData,
    selectedModule: LocalStorage.moduleData,
  };

  const { topics, setTopics } = useContext(TopicsContext);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setSelectedTechnology((prev) => {
      return { ...prev, subTopic: selectedModule };
    });
    if (selectedModule.moduleId && selectedModule.moduleId !== -1) {
      setPopup(topicData);
    }
    LocalStorage.subTopicData = selectedModule;
    BuilderService.questionService.selectedTechnology.subTopic = selectedModule;
  }, [setSelectedTechnology, selectedModule]);

  const handleModuleChange = (event) => {
    const selectedModuleName = event.target.value;
    const selectedModule = subTopicNames.find(
      (module) => module?.subTopicName === selectedModuleName
    );

    setSelectedModule(selectedModule);
  };

  return (
    <>
      {false && (
        <TopicModelHandlar topicData={topicData} setTopics={setTopics} />
      )}
      <Form className="max-w-[30%] overflow-hidden relative">
        {popup && (
          <section
            onClick={() => setPopup(false)}
            className="absolute top-2 left-[80%] w-[10rem] h-[20rem] bg-green-600"
          >
            <h1>hi</h1>
          </section>
        )}
        <label htmlFor="subtopicName">
          Sub Topic Name:
          <select
            id="subtopicName"
            name="subtopicName"
            value={selectedModule.subTopicName}
            onChange={handleModuleChange}
          >
            {subTopicNames.map((element, index) => (
              <option
                key={element.moduleId + index}
                value={element?.subTopicName || ""}
              >
                {element.subTopicName || "Selecte A SubTopic"}
              </option>
            ))}
          </select>
        </label>
      </Form>
    </>
  );
}
