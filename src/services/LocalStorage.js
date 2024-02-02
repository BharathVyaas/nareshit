class LocalStorageClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new LocalStorageClass();
    return this.instance;
  }
  constructor() {
    this.data = undefined;
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
}

export const LocalStorage = LocalStorageClass.getInstance();
