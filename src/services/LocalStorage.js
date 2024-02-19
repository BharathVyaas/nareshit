import BuilderService from "./builder";

class LocalStorageClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new LocalStorageClass();
    return this.instance;
  }
  constructor() {
    this._technologyPage = {
      technologyID: -1,
      natureID: 1,
      randomID: 1,
      assessmentID: 1,
    };
    this._currentTechnology = {
      TechnologyID: -1,
      TechnologyName: -1,
    };
  }

  clear() {
    localStorage.removeItem("moduleData");
    localStorage.removeItem("programmingLanguageData");
    localStorage.removeItem("data");
    localStorage.removeItem("questionView");
    localStorage.removeItem("technologyPage");
    localStorage.removeItem("topicData");
    localStorage.removeItem("technology");
  }

  get auth() {
    return JSON.parse(localStorage.getItem("auth"));
  }

  set auth(newData) {
    localStorage.setItem("auth", newData);
  }

  get technologyPage() {
    const rawData = localStorage.getItem("technologyPage");
    const parsedData = JSON.parse(rawData);
    return parsedData;
  }

  set technologyPage(newTechnology) {
    const stringifiedData = JSON.stringify(newTechnology);
    return localStorage.setItem("technologyPage", stringifiedData);
  }

  get currentTechnology() {
    const rawData = localStorage.getItem("currentTechnology");
    const parsedData = JSON.parse(rawData);
    return parsedData;
  }

  set currentTechnology(newTechnology) {
    const stringifiedData = JSON.stringify(newTechnology);
    return localStorage.setItem("currentTechnology", stringifiedData);
  }

  get programmingLanguageFirstVisit() {
    const result = localStorage.getItem("programmingLanguageFirstVisit");
    console.log("result", result);
    this.programmingLanguageFirstVisit = false;
    return result;
  }

  set programmingLanguageFirstVisit(flag) {
    localStorage.setItem("programmingLanguageFirstVisit", flag);
  }

  get questionViewSelectedData() {
    const result = localStorage.getItem("questionViewSelectedData");
    return result;
  }

  set questionViewSelectedData(newData) {
    localStorage.setItem("questionViewSelectedData", newData);
  }

  get data() {
    const result = this.parse("data");

    return result;
  }

  set data(newData) {
    if (newData) localStorage.setItem("data", newData);
  }

  get programmingLanguageData() {
    const result = this.parse("programmingLanguageData");

    return result;
  }

  set programmingLanguageData(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("programmingLanguageData", data);
  }

  get moduleData() {
    const result = this.parse("moduleData");

    return result;
  }

  set moduleData(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("moduleData", data);
  }

  get topicData() {
    const result = this.parse("topicData");

    return result;
  }

  set topicData(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("topicData", data);
  }

  get subTopicData() {
    const result = this.parse("subTopicData");

    return result;
  }

  set subTopicData(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("subTopicData", data);
  }

  get questionViewFixedModal() {
    const data = localStorage.getItem("questionViewFixedModal");
    const result = JSON.parse(data) || {};
    return result;
  }

  set questionViewFixedModal({ _id, questionId: newData }) {
    if (newData) {
      let obj = this.questionViewFixedModal;
      if (!obj) obj = {};
      if (!obj[_id]) obj[_id] = [];
      if (typeof newData === "object") obj[_id] = newData;
      else {
        obj[_id].push(newData);
      }
      obj = JSON.stringify(obj);
      localStorage.setItem("questionViewFixedModal", obj);
    }
  }

  get exclude() {
    let result = this.parse("exclude");
    if (!result) result = [];
    return result;
  }

  set exclude(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("exclude", data);
  }

  get questionView() {
    let result = this.parse("questionView");
    if (!result) result = [];
    return result;
  }

  set questionView(newData) {
    const data = JSON.stringify(newData);

    if (newData) localStorage.setItem("questionView", data);
  }

  get technology() {
    let result = this.parse("technology");
    if (!result) result = [];
    return result;
  }

  set technology(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("technology", data);
  }

  get includes() {
    let result = localStorage.getItem("include");
    if (result) result = JSON.parse(result);
    if (!result) result = [];
    return result;
  }

  set includes(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("include", data);
  }

  parse(key) {
    const response = localStorage.getItem(key);
    let result;
    if (response === "undefined") result = undefined;
    else result = response;
    if (result) result = JSON.parse(result);
    return result;
  }

  pullExclude(x) {
    const arr = this.exclude;
    let result;
    if (arr) result = arr.filter((element) => element !== x);

    this.exclude = result;
  }

  pullIncludes(x) {
    const arr = this.includes;

    let result;
    if (arr) result = arr.filter((element) => element !== x);

    this.includes = result;
  }

  pushExclude(x) {
    let arr = this.exclude;

    if (arr) arr.filter((element) => element !== x);
    if (!arr) arr = [];

    arr.push(x);
    this.exclude = arr;
  }

  _getTopicDataById() {
    let data = this.topicData;

    if (data) data = data.topicId;

    return data;
  }

  getModuleDataById() {
    let data = this.moduleData;

    if (data) data = data.moduleId;

    return data;
  }

  getProgrammingLanguageById() {
    let data = this.programmingLanguageData;

    if (data) data = data.TechnologyID;
    return data;
  }
}

export const LocalStorage = LocalStorageClass.getInstance();
