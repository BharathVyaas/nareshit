import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";

export const queryClient = new QueryClient();

export const getAllAssessments = async () => {
  const res = await axios.get("https://www.nareshit.net/getAllTests");
<<<<<<< HEAD
<<<<<<< HEAD
  console.log(res.data);
=======

  console.log("res", res.data);

>>>>>>> origin/main
=======
  console.log(res.data);
>>>>>>> origin/master
  return await { assessments: res.data };
};

export const getProgLangs = async () => {
  const res = await axios.get("https://www.nareshit.net/fetchTechnologies");

  return { programmingLanguages: res.data };
};

<<<<<<< HEAD
<<<<<<< HEAD
export const getModuleNames = async (id) => {
  console.log(id);
  try {
    /* console.log("getModuleNames:fetch"); */
    const res = await axios.get(`https://www.nareshit.net/fetchModules/${id}`);
=======
export const getModuleNames = async () => {
  try {
    /* console.log("getModuleNames:fetch"); */
    const res = await axios.get(
      `https://www.nareshit.net/fetchModules/${LocalStorage.getProgrammingLanguageById()}`
    );
>>>>>>> origin/main
=======
export const getModuleNames = async (id) => {
  console.log(id);
  try {
    /* console.log("getModuleNames:fetch"); */
    const res = await axios.get(`https://www.nareshit.net/fetchModules/${id}`);
>>>>>>> origin/master
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
  console.log("_getTopicDataById", LocalStorage._getTopicDataById());
  try {
    if (LocalStorage._getTopicDataById()) {
      const res = await axios.get(
        `https://www.nareshit.net/FetchSubTopics/${LocalStorage._getTopicDataById()}`
      );

      const data = res.data;

      return data;
    }
    return 1;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};

export const getQuestions = async (easy, medium, hard) => {
  try {
    const res = await axios.get(
      `https://www.nareshit.net/fetchDynamicQuestions/?McqAll=${
        LocalStorage.exclude.length
      }&Hardcount=${BuilderService.getHard()}&MediumCount=${BuilderService.getMedium()}&EasyCount=${BuilderService.getEasy()}`
    );

    const data = res.data;

    return data;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};
