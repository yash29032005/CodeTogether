import React from "react";
import Dock from "../../Utils/Dock";
import {
  UserGroupIcon, // Friends
  CpuChipIcon, // AI
} from "@heroicons/react/24/solid";

const Bottomsection = ({ openLeft, openRight }) => {
  const items = [
    {
      icon: <UserGroupIcon className="h-6 w-6 text-white" />,
      label: "Friends",
      onClick: openLeft,
    },
    {
      icon: <CpuChipIcon className="h-6 w-6 text-white" />,
      label: "AI",
      onClick: openRight,
    },
  ];
  return (
    <div className="fixed bottom-5 w-full flex items-center justify-center md:hidden bg-transparent z-9">
      <Dock
        className="bg-black border-none"
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
};

export default Bottomsection;
