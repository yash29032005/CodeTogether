import React, { useState } from "react";
import NewfileModal from "../../../Utils/NewfileModal";

const Filelist = () => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([
    {
      name: "first.js",
      content: "console.log('Hello World');",
      saved: true,
    },
  ]);

  const handleAdd = () => {
    setFiles((prev) => [
      ...prev,
      { name: fileName, content: "", saved: false },
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-800 px-2 py-1">
        <p className="text-xs md:text-sm font-bold">Yash's Workspace</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-gray-900 px-1 hover:bg-gray-800"
        >
          +
        </button>
        {open ? (
          <NewfileModal
            setOpen={setOpen}
            fileName={fileName}
            setFileName={setFileName}
            handleAdd={handleAdd}
          />
        ) : null}
      </div>
      {files.map((file, index) => (
        <p
          key={index}
          className="flex justify-between items-center w-auto text-xs m-1 px-3 py-2 bg-gray-900 hover:bg-gray-950 rounded-md"
        >
          {file.name}
          {file.saved ? (
            <button className="bg-red-900 px-1 rounded-sm">x</button>
          ) : (
            <button className="bg-white h-2 w-2 rounded-sm"></button>
          )}
        </p>
      ))}
    </div>
  );
};

export default Filelist;
