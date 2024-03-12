import React from "react";
<<<<<<< HEAD
import BuilderService from "../services/builder";

function Randoms({ random, setRandom, fixedDisabled }) {
=======

function Randoms({ random, setRandom }) {
>>>>>>> origin/main
  return (
    <fieldset className="mx-4">
      <legend>Random:</legend>
      <div className="mt-2">
        <label className="p-5">
          <input
            type="radio"
            name="random"
            value="completeTest"
            checked={random === "completeTest"}
            onChange={(e) => setRandom(e.target.value)}
          />
          <span className="ps-2">Complete Test</span>
        </label>
        <label className="p-5">
          <input
            type="radio"
            name="random"
            value="moduleWiseRandom"
            checked={random === "moduleWiseRandom"}
            onChange={(e) => setRandom(e.target.value)}
          />
          <span className="ps-2">Module Wise Random</span>
        </label>
<<<<<<< HEAD

=======
        <label className="p-5">
          <input
            type="radio"
            name="random"
            value="topicWiseRandom"
            checked={random === "topicWiseRandom"}
            onChange={(e) => setRandom(e.target.value)}
          />
          <span className="ps-2">Topic Wise Random</span>
        </label>
>>>>>>> origin/main
        <label className="p-5">
          <input
            type="radio"
            name="random"
            value="noRandom"
            checked={random === "noRandom"}
            onChange={(e) => setRandom(e.target.value)}
          />
          <span className="ps-2">No Random</span>
        </label>
      </div>
    </fieldset>
  );
}

export default Randoms;
