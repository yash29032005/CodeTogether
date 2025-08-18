import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { FileContext } from "../Context/FileContext";

const NewfileModal = ({
  setAddfilemodal,
  handleAdd,
  fileName,
  setFileName,
}) => {
  const { language, setLanguage } = useContext(FileContext);

  const extensions = {
    plaintext: ".txt",
    java: ".java",
    javascript: ".js",
  };

  // When modal opens, set default name
  useEffect(() => {
    setFileName(`example${extensions[language] || ""}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, setFileName]);

  return (
    <div
      className="fixed inset-0 bg-opacity-70 backdrop-blur-xs flex items-center justify-center 
      z-50 transition-opacity duration-300"
      onClick={() => setAddfilemodal(false)}
    >
      <div
        className="bg-gray-900 rounded-2xl p-8 w-11/12 md:w-5/12 shadow-2xl transform transition-all 
        duration-300 scale-100 hover:scale-[1.01] border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Enter file name</h2>
          </div>
          <button
            onClick={() => setAddfilemodal(false)}
            className="text-gray-400 hover:text-white transition duration-200 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mt-5 text-gray-300 flex flex-col">
          <label className="text-gray-400">File name</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
            required
            className="w-full border border-gray-600 p-3 rounded-lg bg-gray-950 text-white
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Language Selector */}
        <div className="mt-5 text-gray-300 flex flex-col">
          <label className="text-gray-400 ">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-600 p-3 rounded-lg bg-gray-950 text-white
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {Object.keys(extensions).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setAddfilemodal(false)}
            className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-200 text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!fileName.trim()) {
                toast.error("Enter file name");
                return;
              }
              handleAdd();
              setAddfilemodal(false);
              setFileName("");
            }}
            className="px-5 py-2 bg-gradient-to-r from-purple-950 to-green-800 hover:bg-green-800 rounded-lg transition duration-200 text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewfileModal;
