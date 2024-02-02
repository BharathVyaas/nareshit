import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";

export const queryClient = new QueryClient();

export const getAllAssessments = async () => {
  const res = await axios.get(
    "http://localhost:4000/assessment/view-assessments"
  );

  return await res.data;
};

export const getProgLangs = async () => {
  const res = await axios.get("https://www.nareshit.net/fetchTechnologies");

  return { programmingLanguages: res.data };
};

export const getModuleNames = async () => {
  try {
    /* console.log("getModuleNames:fetch"); */
    const res = await axios.get(
      `https://www.nareshit.net/fetchModules/${LocalStorage.getProgrammingLanguageById()}`
    );
    /* console.log("fetchedData", res.data); */
    const data = { moduleNames: res.data };
    return data;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};

export const getTopicNames = async () => {
  try {
    const res = await axios.get(
      `https://www.nareshit.net/FetchTopics/${LocalStorage.getModuleDataById()}`
    );

    const data = res.data;
    return data;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};

export const getSubTopicNames = async () => {
  try {
    /* console.log("Topic_ID", LocalStorage._getTopicDataById()); */
    const res = await axios.get(
      `https://www.nareshit.net/FetchSubTopics/${LocalStorage._getTopicDataById()}`
    );

    const data = res.data;
    return data;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};

export const getQuestions = async (DifficultyLevelID, count) => {
  const params = {
    parameter1: "value1",
    parameter2: "value2",
  };

  try {
    const res = await axios.get(
      `http://localhost:4000/query/questions?DifficultyLevelID=${DifficultyLevelID}&count=${count}&excludes='${JSON.stringify(
        LocalStorage.exclude
      )}'&easy=${BuilderService.getEasy()}&medium=${BuilderService.getMedium()}&hard=${BuilderService.getHard()}`
    );

    const data = res.data;

    return data;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};
