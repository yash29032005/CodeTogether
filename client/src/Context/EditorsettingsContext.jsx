/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const EditorSettingsContext = createContext();

export const EditorSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");

  return (
    <EditorSettingsContext.Provider
      value={{ theme, setTheme, language, setLanguage }}
    >
      {children}
    </EditorSettingsContext.Provider>
  );
};
