import AssessmentService from "./assessmentsService";
import TechnologyService from "./technologyService";
import QuestionViewService from "./questionViewService";

import { LocalStorage } from "./LocalStorage";

class Builder {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new Builder();
    return this.instance;
  }
  constructor() {
    this.assessmentService = AssessmentService;
    this.technologyService = TechnologyService;
    this.questionService = QuestionViewService;
  }

  init() {
    const data = LocalStorage.data;

    if (data) {
      this.assessmentService.options = data.assessmentData;
      this.technologyService.options = data.technologyData;
      this.questionService.options = data.questionData;
      console.log("options", this.technologyService.options);
    }
  }

  getDifficulty() {
    const optionValues = Object.values(this.assessmentService.options);
    //const difficultyValues = Object.values(optionValues.difficulty);
    const difficultyValues = [];

    optionValues.forEach((element) => {
      difficultyValues.push(element.difficulty);
    });

    return difficultyValues;
  }

  getDifficultyByTitle(title) {
    const titleValues = this.assessmentService.options[title];
    return titleValues.difficulty;
  }

  getTotal() {
    const difficulty = this.getDifficulty();
    const easy = difficulty
      .map((element) => element.easy)
      .reduce((data, acc) => Number(data) + acc, 0);
    const medium = difficulty
      .map((element) => element.medium)
      .reduce((data, acc) => Number(data) + acc, 0);
    const hard = difficulty
      .map((element) => element.hard)
      .reduce((data, acc) => Number(data) + acc, 0);
    const total = easy + medium + hard;

    return total;
  }

  setData({ assessmentService, technologyService, questionService }) {
    this.assessmentService.options = assessmentService;
    this.technologyService.options = technologyService;
    this.questionService.options = questionService;
  }

  getData() {
    const data = {};

    data.assessmentData = this.assessmentService.options;
    data.technologyData = this.technologyService;
    data.questionData = this.questionService;

    const returnValue = JSON.stringify(data);

    return returnValue;
  }
}

const BuilderService = Builder.getInstance();

export default BuilderService;
