<<<<<<< HEAD
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import TopicTxt from "../assets/TopicTxt.txt";
=======
/* import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import TopicTxt from "../assets/TopicTxt.txt";
import { useNavigate } from "react-router";
>>>>>>> origin/main

const REFERENCE = {
  Technology: "DotNet",
  Module: "C# 10.0",
  Topic: "Inheritance",
  SubTopic: "Syntax of Variable & Field Declarations",
  QuestionDescription: "How do you declare a variable of type int in C#?",
  OptionA: "a. int variableName;",
  OptionB: "b. variableName int;",
  OptionC: "c. str Hello = new string;",
  OptionD: "d. integer variableName;",
  CorrectAnswer: "a. int variableName;",
  Explanation: "",
  DifficultyLevel: 0,
};

function ExcelImport() {
<<<<<<< HEAD
=======
  const navigate = useNavigate();

>>>>>>> origin/main
  async function convertToJson(contents) {
    const keyArr = Object.keys(REFERENCE);
    const contentsArr = contents.split("\n");

    const updatedContentsArr = contentsArr.map((element) => element.split(","));

    const resultArr = updatedContentsArr.map((element) => {
      const data = {};
      element.forEach((item, index) => {
        data[keyArr[index]] = item;
      });
      return data;
    });

    try {
      const res = await axios.post(
<<<<<<< HEAD
        "https://www.nareshit.net/insertQuestionData",
=======
        "https://www.nareshit.net/FastTrackCreateTest",
>>>>>>> origin/main
        {
          data: resultArr,
        }
      );
      console.log("Data uploaded successfully", res);
<<<<<<< HEAD
=======
      if (res.status === 200) {
        navigate("/categories/assessmentlist");
      }
>>>>>>> origin/main
    } catch (err) {
      console.error("Error during POST request:", err);
    }
    console.log(resultArr);
  }

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const contents = reader.result;
        convertToJson(contents);
      };

      reader.readAsText(file);
    });
  };

  const downloadTxtFile = async () => {
    const response = await fetch(TopicTxt);
    const contents = await response.text();

    const element = document.createElement("a");
    const file = new Blob([contents], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = "TopicTxt.txt";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".txt",
  });

  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="bg-gray-100 p-8 rounded-md shadow-md">
        <div
          {...getRootProps()}
          className="flex items-center hover:bg-gray-300 border-b-2 border-gray-300 pb-[3px] space-x-2 mb-4 cursor-pointer"
        >
          <input {...getInputProps()} />
          <button className="btn-primary text-xl font-bold">
            Import .txt File
          </button>
        </div>
        <div className="flex items-center hover:bg-gray-300 border-t-2  border-gray-300 space-x-2 cursor-pointer">
          <button
            className="btn-secondary text-xl font-bold"
            onClick={downloadTxtFile}
          >
            Download .txt File
          </button>
        </div>
      </section>
    </main>
  );
}

export default ExcelImport;
<<<<<<< HEAD
=======
 */

import React from "react";

function ExcelImport() {
  return <div>ExcelImport</div>;
}

export default ExcelImport;
>>>>>>> origin/main
