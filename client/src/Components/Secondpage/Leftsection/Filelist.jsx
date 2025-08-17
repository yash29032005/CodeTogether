import React, { useContext, useState, useEffect } from "react";
import NewfileModal from "../../../Utils/NewfileModal";
import { FileContext } from "../../../Context/FileContext";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import socket from "../../../Socket/socket";

const Filelist = () => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const username = searchParams.get("username");

  const {
    files,
    setFiles,
    activeFile,
    setActiveFile,
    language,
    setLanguage,
    code,
  } = useContext(FileContext);

  // 🔹 Sync file updates from socket
  useEffect(() => {
    socket.on("file-update", ({ files }) => {
      setFiles(files);
    });

    return () => socket.off("file-update");
  }, [setFiles]);

  // 🔹 Add new file
  const handleAdd = () => {
    const exists = files.some((f) => f.name === fileName.trim());
    if (exists) {
      toast.error("File with this name already exists!");
      return;
    }

    const newFiles = [
      ...files,
      {
        name: fileName,
        content: "",
        lang: language,
        saved: false,
      },
    ];
    setFiles(newFiles);
    setActiveFile(fileName);

    socket.emit("file-update", { roomId, files: newFiles });
    setOpen(false);
    setFileName("");
  };

  // 🔹 Delete file
  const handleDelete = (name) => {
    if (files.length === 1) {
      toast.warning("At least one file must remain in the workspace.");
      return;
    }
    const updatedFiles = files.filter((f) => f.name !== name);
    setFiles(updatedFiles);

    // if deleted file was active, switch to first file
    if (activeFile === name && updatedFiles.length > 0) {
      setActiveFile(updatedFiles[0].name);
      setLanguage(updatedFiles[0].lang);
    }

    socket.emit("file-update", { roomId, files: updatedFiles, username });
  };

  // 🔹 Save file with Ctrl + S
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        if (activeFile) {
          const updatedFiles = files.map((file) =>
            file.name === activeFile
              ? { ...file, content: code, saved: true }
              : file
          );
          setFiles(updatedFiles);
          socket.emit("file-update", { roomId, files: updatedFiles, username });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFile, files, code, roomId, username, setFiles]);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-800 px-2 py-1">
        <p className="text-xs md:text-sm font-bold">Yash's Workspace</p>
        <button
          onClick={() => setOpen(true)}
          className="bg-gray-900 px-1 hover:bg-gray-800"
        >
          +
        </button>
        {open && (
          <NewfileModal
            setOpen={setOpen}
            fileName={fileName}
            setFileName={setFileName}
            handleAdd={handleAdd}
            setActiveFile={setActiveFile}
          />
        )}
      </div>

      {files.map((file, index) => (
        <div
          key={index}
          onClick={() => {
            setActiveFile(file.name);
            setLanguage(file.lang);
          }}
        >
          <p
            className={`flex justify-between items-center w-auto text-xs m-1 px-3 py-2 
            hover:bg-gray-800 rounded-md ${
              activeFile === file.name ? "bg-gray-800" : "bg-gray-900"
            }`}
          >
            <p className="truncate w-10/12" title={file.name}>
              {file.name}
            </p>
            {file.saved ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(file.name);
                }}
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
