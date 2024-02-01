import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import topicdata from "../../util/topicNames.json";
import subtopicdata from "../../util/subTopic.json";
import { useQuery } from "@tanstack/react-query";
import {
  getModuleNames,
  getSubTopicNames,
  getTopicNames,
} from "../../util/http";

function QusetionViewTechnlogy({ setSelectedTechnology }) {
  return (
    <>
      <ModuleDataLoader setSelectedTechnology={setSelectedTechnology} />
      <TopicDataLoader setSelectedTechnology={setSelectedTechnology} />
      <SubTopicDataLoader setSelectedTechnology={setSelectedTechnology} />
    </>
  );
}

export default QusetionViewTechnlogy;

function ModuleDataLoader({ setSelectedTechnology }) {
  const { data: moduleData, isLoading: isModuleDataLoading } = useQuery({
    queryKey: ["QuestionView", "ModuleName"],
    queryFn: getModuleNames,
  });

  if (moduleData && typeof moduleData === "object") {
    return (
      <ModuleName
        moduledata={moduleData.moduleNames}
        setSelectedTechnology={setSelectedTechnology}
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

  const [selectedModule, setSelectedModule] = useState(moduleNames[0]);

  useEffect(() => {
    setSelectedTechnology((prev) => {
      return { ...prev, module: selectedModule };
    });
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

function TopicDataLoader({ setSelectedTechnology }) {
  const { data: topicData, isLoading: isModuleDataLoading } = useQuery({
    queryKey: ["QuestionView", "TopicName"],
    queryFn: getTopicNames,
  });

  if (topicData && typeof topicData === "object") {
    return (
      <TopicName
        topicData={topicData.moduleNames}
        setSelectedTechnology={setSelectedTechnology}
      />
    );
  }
  return <h1>loading</h1>;
}

function TopicName({ setSelectedTechnology }) {
  const topicNames = topicdata.map((element) => ({
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

  const [selectedModule, setSelectedModule] = useState(topicNames[0]);

  useEffect(
    () =>
      setSelectedTechnology((prev) => {
        return { ...prev, topic: selectedModule };
      }),
    [setSelectedTechnology, selectedModule]
  );

  const handleModuleChange = (event) => {
    const selectedModuleName = event.target.value;
    const selectedModule = topicNames.find(
      (module) => module.topicName === selectedModuleName
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
          value={selectedModule.topicName}
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

function SubTopicDataLoader({ setSelectedTechnology }) {
  const { data: topicData, isLoading: isModuleDataLoading } = useQuery({
    queryKey: ["QuestionView", "SubTopicName"],
    queryFn: getSubTopicNames,
  });

  if (topicData && typeof topicData === "object") {
    return (
      <SubTopicName
        topicData={topicData.moduleNames}
        setSelectedTechnology={setSelectedTechnology}
      />
    );
  }
  return <h1>loading</h1>;
}

function SubTopicName({ setSelectedTechnology }) {
  const subTopicNames = subtopicdata.map((element) => ({
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

  const [selectedModule, setSelectedModule] = useState(subTopicNames[0]);

  useEffect(
    () =>
      setSelectedTechnology((prev) => {
        return { ...prev, subTopic: selectedModule };
      }),
    [setSelectedTechnology, selectedModule]
  );

  const handleModuleChange = (event) => {
    const selectedModuleName = event.target.value;
    const selectedModule = subTopicNames.find(
      (module) => module.subTopicName === selectedModuleName
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
