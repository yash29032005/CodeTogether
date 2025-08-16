import React from "react";
import { useEffect } from "react";
import socket from "../../../Socket/socket";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";

const Userlist = () => {
  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    socket.on("room-users", (users) => {
      setUsers(users);
    });
    return () => socket.off("room-users");
  }, [setUsers]);
  return (
    <div>
      {users.map((username, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-4 bg-gray-900 rounded-md "
        >
          <div className="rounded-4xl px-4 py-2 bg-gradient-to-r from-purple-950 to-green-800 relative">
            {username.charAt(0).toUpperCase()}
            <div className="bg-green-600 rounded-4xl h-3 w-3 absolute top-0 right-0" />
          </div>
          <div className="font-bold">{username}</div>
        </div>
      ))}
    </div>
  );
};

export default Userlist;
