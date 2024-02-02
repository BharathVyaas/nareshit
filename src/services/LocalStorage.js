class LocalStorageClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new LocalStorageClass();
    return this.instance;
  }
  constructor() {
    this.data = undefined;
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

  getProgrammingLanguageId() {
    let data = this.programmingLanguageData;
    console.log(data);
    if (data) data = data.TechnologyID;
    return data;
  }
}

export const LocalStorage = LocalStorageClass.getInstance();
