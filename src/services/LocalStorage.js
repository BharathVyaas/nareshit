<<<<<<< HEAD
<<<<<<< HEAD
import BuilderService from "./builder";

=======
>>>>>>> origin/main
=======
import BuilderService from "./builder";

>>>>>>> origin/master
class LocalStorageClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new LocalStorageClass();
    return this.instance;
  }
<<<<<<< HEAD
<<<<<<< HEAD

  #auth;
  #main;
  constructor() {
    this.#auth = { isLoggedIn: false, type: "user | admin", userName: "dude" };
    this.#main = {};
  }

  /** Utility */

  clear() {
    localStorage.removeItem("main");
  }

  /** End Utility */

  get auth() {
    return JSON.parse(localStorage.getItem("auth"));
  }

  set auth(newData) {
    localStorage.setItem("auth", newData);
=======
=======

  #auth;
  #main;
>>>>>>> origin/master
  constructor() {
    this.#auth = { isLoggedIn: false, type: "user | admin", userName: "dude" };
    this.#main = {};
  }

  /** Utility */

  clear() {
    localStorage.removeItem("main");
  }

  /** End Utility */

  get auth() {
    return JSON.parse(localStorage.getItem("auth"));
  }

<<<<<<< HEAD
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
>>>>>>> origin/main
=======
  set auth(newData) {
    localStorage.setItem("auth", newData);
>>>>>>> origin/master
  }
}

export const LocalStorage = LocalStorageClass.getInstance();
