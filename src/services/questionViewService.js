<<<<<<< HEAD
<<<<<<< HEAD
export class QueryViewClass {
=======
class QueryViewClass {
>>>>>>> origin/main
=======
export class QueryViewClass {
>>>>>>> origin/master
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new QueryViewClass();
    return this.instance;
  }

  constructor() {
    this.selectedTechnology = {
      moduleName: "",
      topicName: "",
      subTopicName: "",
    };
  }

  updateSelectedTechnology(newData) {
    this.selectedTechnology = newData;
  }
}

const QuestionViewService = QueryViewClass.getInstance();
export default QuestionViewService;
