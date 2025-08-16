import React from "react";
import { toast } from "react-toastify";

const NewfileModal = ({
  setOpen,
  fileName,
  setFileName,
  handleAdd,
  setActiveFile,
}) => {
  return (
    <div
      className="z-50 fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 md:mx-0 mx-5"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-700 transform transition-all scale-100 hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h2 className="text-lg font-semibold text-white">Enter New File</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-red-400 transition duration-200"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mt-2 text-gray-300 flex flex-col gap-3">
          <label className=" text-gray-400">File name</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
            }}
            className="p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-sm"
            placeholder="example.js"
          />
        </div>

        {/* Footer */}
        <div className="mt-3 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-200 text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!fileName.trim()) {
                toast.error("Enter file name");
                return;
              } else {
                handleAdd();
                setOpen(false);
                setActiveFile(fileName);
                setFileName(null);
              }
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
