import React, { useContext, useState } from "react";
import NewfileModal from "../../../Utils/NewfileModal";
import { useEffect } from "react";
import { FileContext } from "../../../Context/FileContext";
import { toast } from "react-toastify";

const Filelist = () => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const {
    files,
    setFiles,
    activeFile,
    setActiveFile,
    language,
    setLanguage,
    setCode,
    code,
  } = useContext(FileContext);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  const handleAdd = () => {
    setFiles((prev) => [
      ...prev,
      {
        name: fileName,
        content: "",
        lang: language,
        saved: false,
      },
    ]);
    setActiveFile(fileName);
  };

  const handleDelete = (name) => {
    setFiles((prev) => {
      if (prev.length === 1) {
        toast.warning("At least one file must remain in the workspace.");
        return prev; // don't delete
      }

      const updated = prev.filter((file) => file.name !== name);

      // if the deleted file was active, set activeFile to first file
      if (activeFile === name && updated.length > 0) {
        setActiveFile(updated[0].name);
        setCode(updated[0].content);
        setLanguage(updated[0].lang);
      }

      return updated;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        if (activeFile) {
          setFiles((prev) =>
            prev.map((file) =>
              file.name === activeFile
                ? { ...file, content: code, saved: true }
                : file
            )
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFile, setFiles, code]);

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
        <div
          key={index}
          onClick={() => {
            setActiveFile(file.name);
            setLanguage(file.lang);
            setCode(file.content);
          }}
        >
          <p
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
