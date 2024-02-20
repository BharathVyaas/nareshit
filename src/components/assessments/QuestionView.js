import DifficultyLevel from "./DifficultyLevel";

function QuestionType({ handler, questionType, difficultyLevels }) {
  return (
    <>
      {/**  Question Type */}
      <div>
        <label htmlFor="QuestionTypeID">
          <input
            className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
            id="QuestionTypeID"
            name="QuestionTypeID"
            type="checkbox"
            value="1"
            checked
            disabled
          />
          {questionType}
        </label>
      </div>

      {/**  Difficulty Levels */}
      <div className="p-5">
        <p>DifficultyLevel</p>

        <div className="flex">
          {/* easy */}
          <DifficultyLevel
            id={"NumOfEasy"}
            handler={handler}
            difficultyLevel={"Easy"}
            questionType={questionType}
            difficultyLevels={difficultyLevels}
          />

          {/* medium */}
          <DifficultyLevel
            id={"NumOfMedium"}
            handler={handler}
            difficultyLevel={"Medium"}
            questionType={questionType}
            difficultyLevels={difficultyLevels}
          />

          {/* hard */}
          <DifficultyLevel
            id={"NumOfHard"}
            handler={handler}
            difficultyLevel={"Hard"}
            questionType={questionType}
            difficultyLevels={difficultyLevels}
          />
        </div>
      </div>
    </>
  );
}

export default QuestionType;
