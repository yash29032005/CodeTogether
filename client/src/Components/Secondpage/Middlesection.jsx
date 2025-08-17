import { useEffect, useContext, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import socket from "../../Socket/socket";
import Editor from "@monaco-editor/react";
import { FileContext } from "../../Context/FileContext";

const Middlesection = () => {
  const { code, theme, language, setFiles, activeFile } =
    useContext(FileContext);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const username = searchParams.get("username");

  const editorRef = useRef(null);

  // ✅ Join room
  useEffect(() => {
    if (roomId && username) {
      socket.emit("join-room", { roomId, username });
    }
  }, [roomId, username]);

  // ✅ Save editor ref
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // ✅ Send changes
  const handleEditorChange = (value) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.name === activeFile ? { ...f, content: value, saved: false } : f
      )
    );
    const position = editorRef.current.getPosition();
    socket.emit("file-content-update", {
      roomId,
      fileName: activeFile,
      content: value,
      username,
      position,
    });
  };

  // ✅ Listen for updates
  useEffect(() => {
    const handleFileContentUpdate = ({
      fileName,
      content,
      username: user,
      position,
    }) => {
      if (!fileName || !content) return;

      // update only that file
      setFiles((prev) =>
        prev.map((f) => (f.name === fileName ? { ...f, content } : f))
      );

      if (fileName !== activeFile) return;

      if (!editorRef.current || !position) return;
      const monacoEditor = editorRef.current;

      // --- Remove old widget if exists ---
      const widgetId = `remote-user-${user}`;
      monacoEditor.removeContentWidget({ getId: () => widgetId });

      // --- Create widget ---
      const widget = {
        getId: () => widgetId,
        getDomNode: () => {
          const node = document.createElement("div");
          node.textContent = user;
          node.style.background = "linear-gradient(to right, #3b0764, #065f46)";
          node.style.color = "white";
          node.style.fontSize = "12px";
          node.style.padding = "1px 4px";
          node.style.borderRadius = "4px";
          node.style.pointerEvents = "none";
          return node;
        },
        getPosition: () => ({
          position: {
            lineNumber: position.lineNumber,
            column: position.column,
          },
          preference: [2], // above cursor
        }),
      };

      monacoEditor.addContentWidget(widget);

      // auto remove after 3s
      setTimeout(() => {
        monacoEditor.removeContentWidget(widget);
      }, 3000);
    };

    socket.on("file-content-update", handleFileContentUpdate);
    return () => socket.off("file-content-update", handleFileContentUpdate);
  }, [activeFile, setFiles]);

  return (
    <div className="md:w-7/12 w-full bg-black text-white h-full">
      <div className="border-r border-gray-800 w-full h-full">
        <Editor
          height="100%"
          theme={theme}
          language={language}
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
          }}
        />
      </div>
    </div>
  );
};

export default Middlesection;
