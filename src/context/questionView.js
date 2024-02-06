import { createContext, useState } from "react";

import _debounce from "lodash/debounce";

const QuestionView = createContext({
  data: {},
  setData: () => {},
});

export function QuestionViewProvider({ children }) {
  const [data, setData] = useState();

  return (
    <QuestionView.Provider value={{ data, setData }}>
      {children}
    </QuestionView.Provider>
  );
}

export default QuestionView;
