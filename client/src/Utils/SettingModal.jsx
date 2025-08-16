import React from "react";

const SettingModal = ({
  isOpen,
  theme,
  setTheme,
  language,
  setLanguage,
  setIsOpen,
}) => {
  return (
    <div>
      {/* Popup */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-64 p-4 bg-gray-800 text-white rounded-lg shadow-lg z-50">
          <h3 className="text-lg font-semibold mb-3">Editor Settings</h3>

          {/* Theme Selector */}
          <div className="mb-3">
            <label className="block mb-1">Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-1 rounded bg-gray-700"
            >
              <option value="vs-dark">Dark</option>
              <option value="vs">Light</option>
              <option value="hc-black">High Contrast Dark</option>
              <option value="hc-light">High Contrast Light</option>
            </select>
          </div>

          {/* Language Selector */}
          <div className="mb-3 ">
            <label className="block mb-1">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-1 rounded bg-gray-700 "
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="css">CSS</option>
              <option value="java">Java</option>
              <option value="typescript">TypeScript</option>
              <option value="sql">SQL</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="csharp">C#</option>
              <option value="shell">Shell</option>
            </select>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full py-1 bg-green-600 rounded hover:bg-green-500"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingModal;
