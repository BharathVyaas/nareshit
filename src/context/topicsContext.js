import { createContext, useState } from "react";

import _debounce from "lodash/debounce";

const TopicsContext = createContext({
  topics: { moduleName: "", topicName: "", subTopicName: "" },
  setTopics: () => {},
});

export function TopicsContextProvider({ children }) {
  const [topics, setTopics] = useState();

  return (
    <TopicsContext.Provider value={{ topics, setTopics }}>
      {children}
    </TopicsContext.Provider>
  );
}

export default TopicsContext;
