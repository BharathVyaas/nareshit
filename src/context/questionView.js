import { createContext, useState } from "react";

import _debounce from "lodash/debounce";

<<<<<<< HEAD
const QuestionViewCtx = createContext({
=======
const QuestionView = createContext({
>>>>>>> origin/main
  data: {},
  setData: () => {},
});

export function QuestionViewProvider({ children }) {
  const [data, setData] = useState();

  return (
<<<<<<< HEAD
    <QuestionViewCtx.Provider value={{ data, setData }}>
      {children}
    </QuestionViewCtx.Provider>
  );
}

export default QuestionViewCtx;
=======
    <QuestionView.Provider value={{ data, setData }}>
      {children}
    </QuestionView.Provider>
  );
}

export default QuestionView;
>>>>>>> origin/main
