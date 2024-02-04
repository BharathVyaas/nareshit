import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

/**
 *
 * Reference
 */
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
  async function convertToJson(contents) {
    const keyArr = Object.keys(REFERENCE);
    const contentsArr = contents.split("\n");

    const updatedContentsArr = contentsArr.map((element) =>
      element.split(",")
    )[0];
    console.log(updatedContentsArr);
    const result = {};

    for (let i = 0; i < updatedContentsArr.length; i++) {
      result[keyArr[i]] = updatedContentsArr[i];
    }

    console.log("res", result);
    try {
      await axios.post("https://www.nareshit.net/insertQuestionData", {
        data: JSON.stringify(result),
      });
    } catch (err) {
      console.error(err);
    }
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".txt",
  });

  return (
    <div {...getRootProps()} className="flex items-center space-x-2">
      <input {...getInputProps()} />
      <button className="font-medium cursor-pointer">Import .txt</button>
    </div>
  );
}

export default ExcelImport;

/**
 * 
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
    let res;
    try {
      res = await axios.post("https://www.nareshit.net/insertQuestionData", {
        data: resultArr,
      });
    } catch (err) {
      console.error(err);
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".txt",
  });

  return (
    <div {...getRootProps()} className="flex items-center space-x-2">
      <input {...getInputProps()} />
      <button className="font-medium cursor-pointer">Import .txt</button>
    </div>
  );
}

export default ExcelImport;

 */
