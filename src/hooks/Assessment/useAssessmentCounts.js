import { useReducer } from "react";

const initialState = {
  total: "0",
  easy: "",
  medium: "",
  hard: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "total": {
      const obj = { ...state };
      obj.total = action.payload;
      return obj;
    }
    case "easy": {
      const obj = { ...state };
      obj.easy = action.payload;
      return obj;
    }
    case "medium": {
      const obj = { ...state };
      obj.medium = action.payload;
      return obj;
    }
    case "hard": {
      const obj = { ...state };
      obj.hard = action.payload;
      return obj;
    }
    default: {
      console.error("Not a valid difficulty type");
    }
  }
};

function useAssessmentCounts(easyCount, mediumCount, hardCount) {
  initialState.easy = easyCount;
  initialState.medium = mediumCount;
  initialState.hard = hardCount;
  initialState.total =
    Number(easyCount) + Number(mediumCount) + Number(hardCount);

  const [count, dispatcher] = useReducer(reducer, initialState);

  const handler = (level, data) => {
    dispatcher({ type: level, payload: data });
  };

  return [count, handler];
}

export default useAssessmentCounts;
