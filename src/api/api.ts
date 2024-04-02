import axios from "axios";
import envVariables from "../envVariables.ts";

axios.defaults.baseURL = "http://95.217.134.12:4010";
const API_KEY = envVariables.API_KEY;

export const convertToPdf = async (text: string) => {
  const response = await axios.post(
    `/create-pdf?apiKey=${API_KEY}`,
    {
      text,
    },
    { responseType: "blob" },
  );

  return response.data;
};
