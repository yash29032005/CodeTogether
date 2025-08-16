import { useState, useEffect, useContext } from "react";
import Bottomsection from "../Components/Secondpage/Bottomsection";
import Leftsection from "../Components/Secondpage/Leftsection/Leftsection";
import Middlesection from "../Components/Secondpage/Middlesection";
import Rightsection from "../Components/Secondpage/Righsection/Rightsection";
import Topsection from "../Components/Secondpage/Topsection";
import { UserContext } from "../Context/UserContext";
import socket from "../Socket/socket";

function EditorPage() {
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

  const { setUsers } = useContext(UserContext);

  useEffect(() => {
    socket.on("room-users", (users) => {
      setUsers(users);
    });
    return () => socket.off("room-users");
  }, [setUsers]);

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
