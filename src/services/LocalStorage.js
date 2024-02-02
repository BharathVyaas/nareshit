class LocalStorageClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new LocalStorageClass();
    return this.instance;
  }
  constructor() {
    this.data = undefined;
    this.moduleData = undefined;
    this.programmingLanguageData = undefined;
  }

  get data() {
    const response = localStorage.getItem("data");
    let result;
    if (response === "undefined") result = undefined;
    else result = response;
    if (result) result = JSON.parse(result);
    return result;
  }

  set data(newData) {
    if (newData) localStorage.setItem("data", newData);
  }

  get programmingLanguageData() {
    const response = localStorage.getItem("programmingLanguageData");
    let result;
    if (response === "undefined") result = undefined;
    else result = response;
    if (result) result = JSON.parse(result);
    return result;
  }

  set programmingLanguageData(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("programmingLanguageData", data);
  }

  get moduleData() {
    const response = localStorage.getItem("moduleData");
    let result;
    if (response === "undefined") result = undefined;
    else result = response;
    if (result) result = JSON.parse(result);
    return result;
  }

  set moduleData(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("moduleData", data);
  }

  get topicData() {
    const response = localStorage.getItem("topicData");
    let result;
    if (response === "undefined") result = undefined;
    else result = response;
    if (result) result = JSON.parse(result);
    return result;
  }

  set topicData(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("topicData", data);
  }

  get subTopicData() {
    const response = localStorage.getItem("subTopicData");
    let result;
    if (response === "undefined") result = undefined;
    else result = response;
    if (result) result = JSON.parse(result);
    return result;
  }

  set subTopicData(newData) {
    const data = JSON.stringify(newData);
    if (newData) localStorage.setItem("subTopicData", data);
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
