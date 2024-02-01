class LocalStorageClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new LocalStorageClass();
    return this.instance;
  }
  constructor() {
    this.moduleName = undefined;
    this.data = undefined;
  }

  get moduleName() {
    const response = localStorage.getItem("moduleName");
    let result;
    if (response === "undefined") result = undefined;
    else result = response;
    return result;
  }

  set moduleName(newData) {
    localStorage.setItem("moduleName", newData);
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
    console.log("setting data");
    if (newData) localStorage.setItem("data", newData);
  }
}

export const LocalStorage = LocalStorageClass.getInstance();
