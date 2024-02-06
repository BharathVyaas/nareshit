import React, { useState } from "react";

function QuestionViewTopic({ title, easy: _e, medium: _m, hard: _h }) {
  const [easy, setEasy] = useState(_e);
  const [medium, setMedium] = useState(_m);
  const [hard, setHard] = useState(_h);

  return (
    <article className="text-center max-w-[300px] m-5 border-[1.5px] rounded border-black">
      <h2>
        {title}
        <span>{easy + medium + hard}</span>
      </h2>
      <div className="flex">
        <div className=" p-3">
          <h3>Easy</h3>
          <input
            type="number"
            className=" w-6"
            defaultValue={easy}
            onChange={(e) => setEasy(Number(e.target.value))}
          />
        </div>
        <div className=" p-3">
          <h3>Medium</h3>
          <input
            type="number"
            className=" w-6 "
            defaultValue={medium}
            onChange={(e) => setMedium(Number(e.target.value))}
          />
        </div>
        <div className=" p-3">
          <h3>Hard</h3>
          <input
            type="number"
            className=" w-6"
            defaultValue={hard}
            onChange={(e) => setHard(Number(e.target.value))}
          />
        </div>
      </div>
    </article>
  );
}

export default QuestionViewTopic;
