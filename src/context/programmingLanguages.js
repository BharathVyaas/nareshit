import { createContext, useState } from "react";

const ProgrammingLanguageContext = createContext({
  programmingLanguages: {},
  setProgrammingLanguages: () => {},
});

export function ProgrammingLanguageContextProvider({ children }) {
  const [programmingLanguages, setProgrammingLanguages] = useState({});

  return (
    <ProgrammingLanguageContext.Provider
      value={{ programmingLanguages, setProgrammingLanguages }}
    >
      {children}
    </ProgrammingLanguageContext.Provider>
  );
}

export default ProgrammingLanguageContext;
