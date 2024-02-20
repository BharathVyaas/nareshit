import React, { useState } from "react";

function DifficultyLevel({
  handler,
  questionType,
  difficultyLevel,
  difficultyLevels,
  id,
}) {
  const changeHandler = (e) => {
    handler(questionType, difficultyLevel, e.target.value);
  };

  return (
    <div className="p-5">
      <label htmlFor={id}>{difficultyLevel}:</label>
      <input
        className="bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded"
        type="number"
        id={id}
        name={id}
        value={difficultyLevels[questionType][difficultyLevel]}
        onChange={changeHandler}
      />
    </div>
  );
}

export default DifficultyLevel;
