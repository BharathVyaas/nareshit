import { createContext, useState } from "react";

import _debounce from "lodash/debounce";

<<<<<<< HEAD
<<<<<<< HEAD
const QuestionViewCtx = createContext({
=======
const QuestionView = createContext({
>>>>>>> origin/main
=======
const QuestionViewCtx = createContext({
>>>>>>> origin/master
  data: {},
  setData: () => {},
});

export function QuestionViewProvider({ children }) {
  const [data, setData] = useState();

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <QuestionViewCtx.Provider value={{ data, setData }}>
      {children}
    </QuestionViewCtx.Provider>
  );
}

export default QuestionViewCtx;
=======
    <QuestionView.Provider value={{ data, setData }}>
=======
    <QuestionViewCtx.Provider value={{ data, setData }}>
>>>>>>> origin/master
      {children}
    </QuestionViewCtx.Provider>
  );
}

<<<<<<< HEAD
export default QuestionView;
>>>>>>> origin/main
=======
export default QuestionViewCtx;
>>>>>>> origin/master
