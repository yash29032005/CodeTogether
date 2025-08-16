import React, { useState } from "react";
import NewfileModal from "../../../Utils/NewfileModal";
import { useEffect } from "react";

const Filelist = () => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [activeFile, setActiveFile] = useState(null);
  const [files, setFiles] = useState(() => {
    const stored = localStorage.getItem("files");
    return stored
      ? JSON.parse(stored)
      : [
          {
            name: "first.js",
            content: "console.log('Hello World');",
            saved: true,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  const handleAdd = () => {
    setFiles((prev) => [
      ...prev,
      { name: fileName, content: "", saved: false },
    ]);
  };

  const handleDelete = (name) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        if (activeFile) {
          setFiles((prev) =>
            prev.map((file) =>
              file.name === activeFile ? { ...file, saved: true } : file
            )
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFile]);

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
            setActiveFile={setActiveFile}
          />
        ) : null}
      </div>
      {files.map((file, index) => (
        <div onClick={() => setActiveFile(file.name)}>
          <p
            key={index}
            className={`flex justify-between items-center w-auto text-xs m-1 px-3 py-2 
            hover:bg-gray-800 rounded-md ${
              activeFile === file.name ? "bg-gray-800" : "bg-gray-900"
            }`}
          >
            {file.name}
            {file.saved ? (
              <button
                onClick={() => handleDelete(file.name)}
                className="bg-red-900 px-1 rounded-sm"
              >
                x
              </button>
            ) : (
              <button className="bg-white h-2 w-2 rounded-sm"></button>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Filelist;
