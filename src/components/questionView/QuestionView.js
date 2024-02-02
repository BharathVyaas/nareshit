import React, { useEffect, useState } from "react";
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
        LocalStorage._getTopicDataById() && (
          <SubTopicDataLoader
            selectedTopic={setSelectedTopic}
            selectedSubTopic={selectedSubTopic}
            setSelectedSubTopic={setSelectedSubTopic}
          />
        )}
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
      (module) => module.moduleName === selectedModuleName
    );

    setSelectedModule(selectedModule);
  };

  return (
    <>
      <Form className="max-w-[20%]">
        <label htmlFor="moduleName">
          Module Name
          <select
            id="moduleName"
            name="moduleName"
            value={selectedModule.moduleName}
            onChange={handleModuleChange}
          >
            {moduleNames.map((element) => (
              <option key={element.moduleId} value={element.moduleName}>
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

  useEffect(() => {
    setSelectedTechnology((prev) => {
      return { ...prev, topic: selectedModule };
    });

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
    <Form className="max-w-[20%]">
      <label htmlFor="topicName">
        Topic Name
        <select
          id="topicName"
          name="topicName"
          value={selectedModule?.topicName}
          onChange={handleModuleChange}
        >
          {topicNames.map((element, index) => (
            <option key={element.moduleId + index} value={element.topicName}>
              {element.topicName}
            </option>
          ))}
        </select>
      </label>
    </Form>
  );
}

function SubTopicDataLoader({ setSelectedSubTopic, selectedTopic }) {
  /* console.log("SubTopicDataLoader:rerender"); */
  const { data } = useQuery({
    queryKey: ["QuestionView", "SubTopicNames"],
    queryFn: getSubTopicNames,
  });

  useEffect(() => {
    /* console.log("selectedTopic:update", selectedTopic); */
  }, [selectedTopic]);

  if (data && typeof data === "object") {
    return (
      <SubTopicName data={data} setSelectedTechnology={setSelectedSubTopic} />
    );
  }
  return <h1>loading</h1>;
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

  useEffect(() => {
    setSelectedTechnology((prev) => {
      return { ...prev, subTopic: selectedModule };
    });

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
    <Form className="max-w-[20%] overflow-hidden">
      <label htmlFor="subtopicName">
        Sub Topic Name
        <select
          id="subtopicName"
          name="subtopicName"
          value={selectedModule.subTopicName}
          onChange={handleModuleChange}
        >
          {subTopicNames.map((element, index) => (
            <option key={element.moduleId + index} value={element.subTopicName}>
              {element.subTopicName}
            </option>
          ))}
        </select>
      </label>
    </Form>
  );
}
