class Composite {
  constructor() {
    this._totalQuestionCount = undefined;
    this._difficulty = { easy: undefined, medium: undefined, hard: undefined };
  }
  updateFlag(newValue) {
    this._flag = newValue;
    return this;
  }
  updateTotalQuestionCount(newCount) {
    //...
  }

  updateDifficulty(newDifficulty) {
    //...
  }
}

class MCQClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new MCQClass();
    return this.instance;
  }

  constructor() {
    super();
    this._flag = undefined;
    this._totalQuestionCount = undefined;
    this._difficulty = { easy: undefined, medium: undefined, hard: undefined };
  }
  getFlag() {
    return this._flag;
  }

  getTotalQuestionCount() {
    return this._totalQuestionCount;
  }

  getDifficulty() {
    return this._difficulty;
  }

  updateFlag(newValue) {
    this._flag = newValue;
    return this;
  }
  updateTotalQuestionCount(newCount) {
    this._totalQuestionCount = newCount;
    return this;
  }

  updateDifficulty(newDifficulty) {
    this._difficulty = newDifficulty;
    return this;
  }
}

class FreeTextClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new FreeTextClass();
    return this.instance;
  }

  constructor() {
    super();
    this._flag = undefined;
    this._totalQuestionCount = undefined;
    this._difficulty = { easy: undefined, medium: undefined, hard: undefined };
  }
  getFlag() {
    return this._flag;
  }

  getTotalQuestionCount() {
    return this._totalQuestionCount;
  }

  getDifficulty() {
    return this._difficulty;
  }

  updateFlag(newValue) {
    this._flag = newValue;
    return this;
  }
  updateTotalQuestionCount(newCount) {
    this._totalQuestionCount = newCount;
    return this;
  }

  updateDifficulty(newDifficulty) {
    this._difficulty = newDifficulty;
    return this;
  }
}

class CodingClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new CodingClass();
    return this.instance;
  }

  constructor() {
    super();
    this._flag = undefined;
    this._totalQuestionCount = undefined;
    this._difficulty = { easy: undefined, medium: undefined, hard: undefined };
  }
  getFlag() {
    return this._flag;
  }

  getTotalQuestionCount() {
    return this._totalQuestionCount;
  }

  getDifficulty() {
    return this._difficulty;
  }
  updateFlag(newValue) {
    this._flag = newValue;
    return this;
  }
  updateTotalQuestionCount(newCount) {
    this._totalQuestionCount = newCount;
    return this;
  }

  updateDifficulty(newDifficulty) {
    this._difficulty = newDifficulty;
    return this;
  }
}

class AssessmentClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new AssessmentClass();
    return this.instance;
  }

  constructor() {
    super();
    this._flag = undefined;
    this._totalQuestionCount = undefined;
    this._difficulty = { easy: undefined, medium: undefined, hard: undefined };
    this.options = {
      MCQ: {
        flag: true,
        totalQuestions: 0,
        difficulty: { easy: 0, medium: 0, hard: 0 },
      },
      freeText: {
        flag: false,
        totalQuestions: 0,
        difficulty: { easy: 0, medium: 0, hard: 0 },
      },
      coding: {
        flag: false,
        totalQuestions: 0,
        difficulty: { easy: 0, medium: 0, hard: 0 },
      },
    };
  }
  getFlag() {
    return this._flag;
  }

  getTotalQuestionCount() {
    return this._totalQuestionCount;
  }

  getDifficulty() {
    return this._difficulty;
  }
  updateFlag(newValue) {
    this._flag = newValue;
    return this;
  }
  updateTotalQuestionCount(newCount) {
    this._totalQuestionCount = newCount;
    return this;
  }

  updateDifficulty(newDifficulty) {
    this._difficulty = newDifficulty;
    return this;
  }
  insertOptions(option, { key, value }) {
    this.options[option][key] = value;
    return this;
  }
}

export const MCQService = MCQClass.getInstance();
export const FreeTextService = FreeTextClass.getInstance();
export const CodingService = CodingClass.getInstance();

const AssessmentService = AssessmentClass.getInstance();
export default AssessmentService;
