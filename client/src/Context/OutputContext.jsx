/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const OutputContext = createContext();

export const OutputProvider = ({ children }) => {
  const [code, setCode] = useState(`console.log("Hello")`);
  const [output, setOutput] = useState("Execute something");

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
    <OutputContext.Provider value={{ code, setCode, output, runCode }}>
      {children}
    </OutputContext.Provider>
  );
};
