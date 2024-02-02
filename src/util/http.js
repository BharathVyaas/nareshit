import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LocalStorage } from "../services/LocalStorage";

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
    const res = await axios.get(
      `https://www.nareshit.net/fetchModules/${LocalStorage.getProgrammingLanguageById()}`
    );

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
      `https://www.nareshit.net/mcqCheckQuestions?DifficultyLevelID=${DifficultyLevelID}&count=${count}`
    );

    const data = res.data;

    return data;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};
