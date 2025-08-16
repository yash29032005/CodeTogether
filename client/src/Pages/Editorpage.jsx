import { useState, useEffect } from "react";
import Bottomsection from "../Components/Secondpage/Bottomsection";
import Leftsection from "../Components/Secondpage/Leftsection/Leftsection";
import Middlesection from "../Components/Secondpage/Middlesection";
import Rightsection from "../Components/Secondpage/Righsection/Rightsection";
import Topsection from "../Components/Secondpage/Topsection";
import socket from "../Socket/socket";
import { useSearchParams } from "react-router-dom";

function EditorPage() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const username = searchParams.get("username");
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  function openLeft() {
    setLeft(true);
    setRight(false);
  }

  function openRight() {
    setRight(true);
    setLeft(false);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setLeft(false);
        setRight(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // run once
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    socket.emit("join-room", { roomId, username });
  }, [roomId, username]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Topsection openRight={openRight} />
      <div
        className="flex bg-gray-900 text-gray-100"
        style={{ height: "calc(100vh - 50px)" }}
      >
        <Leftsection left={left} setLeft={setLeft} />
        <Middlesection />
        <Rightsection right={right} setRight={setRight} />
      </div>
      <Bottomsection openLeft={openLeft} openRight={openRight} />
    </div>
  );
}

export default EditorPage;
