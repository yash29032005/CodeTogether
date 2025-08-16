import React, { useState } from "react";

const Filelist = () => {
  const [files, setFiles] = useState([
    {
      name: "first.js",
      content: "console.log('Hello World');",
      lastModified: "2025-08-16T19:45:00.000Z",
    },
    {
      name: "sstyle.css",
      content: "body { background: black; color: white; }",
      lastModified: "2025-08-16T19:46:00.000Z",
    },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-800 px-2 py-1">
        <p className="text-sm font-bold">Yash's Workspace</p>
        <button className="bg-gray-900 px-1 hover:bg-gray-800">+</button>
      </div>
      {files.map((file, index) => (
        <p
          key={index}
          className="w-auto text-xs m-1 px-3 py-2 bg-gray-900 hover:bg-gray-950 rounded-md"
        >
          {file.name}
        </p>
      ))}
    </div>
  );
};

export default Filelist;
