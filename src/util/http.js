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
  const res = await axios.get("https://www.nareshit.net/fetchModules/2");
  console.log(res);

  return res;
};
