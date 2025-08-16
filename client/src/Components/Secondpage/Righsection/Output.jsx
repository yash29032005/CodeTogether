import React, { useContext } from "react";
import { OutputContext } from "../../../Context/OutputContext";

const Output = () => {
  const { output } = useContext(OutputContext);
  return (
    <div className="w-auto bg-gray-850 p-4 text-sm h-auto">
      <h3 className="mb-2 font-bold">Output :</h3>
      <pre className="text-gray-300 text-wrap">{output}</pre>
    </div>
  );
};

export default Output;
