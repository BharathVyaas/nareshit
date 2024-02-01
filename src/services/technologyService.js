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
    this.programmingLanguage = "Java";
  }

  updateData(newLanguage) {
    this.programmingLanguage = newLanguage;

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
    this.natureOfAssessment = undefined;
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
    this.random = undefined;
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
        programmingLanguage: undefined,
      },
      natureOfAssessment: {
        natureOfAssessment: undefined,
      },
      assessmentNature: {
        random: undefined,
      },
    };
  }

  get technology() {
    return this._technology;
  }

  updateData(newTechnology) {
    const title = Object.keys(newTechnology);
    this._technology[title] = newTechnology[title];

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

export const SelectTechnology = SelectTechnologyClass.getInstance();
export const NatureOfAssessment = NatureOfAssessmentClass.getInstance();
export const Random = RandomClass.getInstance();

const TechnologyService = TechnologyClass.getInstance();
export default TechnologyService;

/**
 * class Composite {
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
    this.programmingLanguage = "Java";
  }

  updateData(newLanguage) {
    this.programmingLanguage = newLanguage;

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
    this.natureOfAssessment = undefined;
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
    this.random = undefined;
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
        programmingLanguage: undefined,
      },
      natureOfAssessment: {
        natureOfAssessment: undefined,
      },
      assessmentNature: {
        random: undefined,
      },
    };
  }

  get technology() {
    return this._technology;
  }

  updateData(title, { key, value }) {
    this._technology[title][key] = value;

    return this;
  }

  isValid() {
    if (Object.keys(this._technology).length >= 2) {
      return true;
    }
    return false;
  }
}

export const SelectTechnology = SelectTechnologyClass.getInstance();
export const NatureOfAssessment = NatureOfAssessmentClass.getInstance();
export const Random = RandomClass.getInstance();

const TechnologyService = TechnologyClass.getInstance();
export default TechnologyService;

 */
