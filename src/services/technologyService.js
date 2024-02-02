class Composite {
  updateData() {
    throw new Error("This method must be implimented.");
  }
}

class SelectTechnologyClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new SelectTechnologyClass();
    return this.instance;
  }

  constructor() {
    super();
    this.programmingLanguage = { programmingLanguage: "DOTNET", id: -1 };
  }

  updateData(newData) {
    this.programmingLanguage = newData;

    return this;
  }
}

class NatureOfAssessmentClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new NatureOfAssessmentClass();
    return this.instance;
  }

  constructor() {
    super();
    this.natureOfAssessment = "dynamic";
  }

  updateData(newType) {
    this.natureOfAssessment = newType;

    return this;
  }
}

class RandomClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new RandomClass();
    return this.instance;
  }

  constructor() {
    super();
    this.random = "noRandom";
  }

  updateData(newRandom) {
    this.random = newRandom;

    return this;
  }
}

class TechnologyClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new TechnologyClass();
    return this.instance;
  }

  constructor() {
    super();
    this._technology = {
      programmingLanguage: {
        programmingLanguage:
          SelectTechnologyService.programmingLanguage.programmingLanguage,
        id: SelectTechnologyService.programmingLanguage.id,
      },
      natureOfAssessment: NatureOfAssessmentService.natureOfAssessment,
      assessmentNature: RandomService.random,
    };
  }

  get technology() {
    return this._technology;
  }

  updateData(newTechnology) {
    console.log(
      "----------------------",
      SelectTechnologyService.programmingLanguage
    );
    this._technology = newTechnology;

    return this;
  }

  isValid() {
    if (Object.keys(this._technology).length >= 2) {
      return true;
    }
    console.log(Object.keys(this._technology));
    return false;
  }
}

export const SelectTechnologyService = SelectTechnologyClass.getInstance();
export const NatureOfAssessmentService = NatureOfAssessmentClass.getInstance();
export const RandomService = RandomClass.getInstance();

const TechnologyService = TechnologyClass.getInstance();
export default TechnologyService;
