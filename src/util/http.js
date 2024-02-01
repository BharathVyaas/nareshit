import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export const getAllAssessments = async () => {
  const res = await axios.get(
    "http://localhost:4000/assessment/view-assessments"
  );

  return await res.data;
};

export const getProgLangs = async () => {
  const res = await axios.get(
    "http://localhost:4000/query/programminglanguages"
  );

  return await res.data;
};

export const getModuleNames = async () => {
  try {
    const res = await axios.get("http://localhost:4000/query/view-moduleNames");

    const data = res.data;
    return data;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};

export const getTopicNames = async () => {
  try {
    const res = await axios.get("http://localhost:4000/query/view-topicNames", {
      body: 2,
    });

    const data = res.data;
    return data;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};

export const getSubTopicNames = async () => {
  try {
    const res = await axios.get(
      "http://localhost:4000/query/view-subTopicNames",
      {
        body: 2,
      }
    );

    const data = res.data;
    return data;
  } catch (err) {
    console.log("getModuleNames", err);
  }
};
