/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([
    {
      name: "first.js",
      content: "console.log('Hello World');",
      lang: "javascript",
      saved: true,
    },
  ]);

  const [activeFile, setActiveFile] = useState(null);

  const code = files.find((f) => f.name === activeFile)?.content || "";

  const [output, setOutput] = useState("Execute something");

  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");

  const runCode = () => {
    let capturedOutput = "";

    // Save the real console.log
    const originalLog = console.log;

    // Override console.log to capture the printed text
    console.log = (...args) => {
      capturedOutput += args.join(" ") + "\n";
      originalLog(...args); // still logs to the browser console
    };

    try {
      const result = eval(code);

      // If there's no console.log output but there's a return value
      if (!capturedOutput.trim() && result !== undefined) {
        capturedOutput = String(result);
      }

      setOutput(capturedOutput.trim());
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    } finally {
      // Restore original console.log
      console.log = originalLog;
    }
  };

  return (
    <FileContext.Provider
      value={{
        files,
        setFiles,
        activeFile,
        setActiveFile,
        code,
        output,
        runCode,
        theme,
        setTheme,
        language,
        setLanguage,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
