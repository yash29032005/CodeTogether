import { useEffect, useContext, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import socket from "../../Socket/socket";
import Editor from "@monaco-editor/react";
import { FileContext } from "../../Context/FileContext";

const Middlesection = () => {
  const { code, setCode, theme, language, files, setFiles, activeFile } =
    useContext(FileContext);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const username = searchParams.get("username");

  const editorRef = useRef(null);

  useEffect(() => {
    if (activeFile !== null && files[activeFile]) {
      const currentContent = files[activeFile].content || "";

      if (currentContent !== code) {
        // update editor content
        setCode(currentContent);

        // mark as unsaved
        setFiles((prev) =>
          prev.map((file, i) =>
            i === activeFile ? { ...file, saved: false } : file
          )
        );
      }
    }
  }, [activeFile, code, files, setCode, setFiles]);

  // Join room on load
  useEffect(() => {
    if (roomId && username) {
      socket.emit("join-room", { roomId, username });
    }
  }, [roomId, username]);

  // Save editor ref
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // Send code changes
  const handleEditorChange = (value) => {
    setCode(value);

    setFiles((prev) =>
      prev.map((file, i) =>
        i === activeFile
          ? {
              ...file,
              saved: value === file.content, // true if matches original
            }
          : file
      )
    );

    const position = editorRef.current.getPosition();
    socket.emit("code-change", { roomId, code: value, username, position });
  };

  // Listen for updates
  useEffect(() => {
    socket.on("code-update", ({ code: newCode, username: user, position }) => {
      setCode(newCode);

      if (!editorRef.current || !position) return;
      const monacoEditor = editorRef.current;

      // 🔹 Remove old widget if exists
      const widgetId = `remote-user-${user}`;
      const existingWidget = monacoEditor._contentWidgets[widgetId];
      if (existingWidget)
        monacoEditor.removeContentWidget(existingWidget.widget);

      // 🔹 Create widget
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

      // 🔹 Auto-remove after 2s (only show when typing)
      setTimeout(() => {
        monacoEditor.removeContentWidget(widget);
      }, 3000);
    });

    return () => socket.off("code-update");
  }, [setCode]);

  console.log(code);
  console.log(language);

  return (
    <div className="md:w-7/12 w-full bg-black text-white h-full">
      <div className="border-r border-gray-800 w-full h-full">
        <Editor
          height="100%"
          theme={theme}
          defaultLanguage={language}
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
