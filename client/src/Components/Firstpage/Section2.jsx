import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "@heroicons/react/24/solid";
import { BugAntIcon } from "@heroicons/react/24/solid";
import SpotlightCard from "../../Utils/Spotlightcard";

const Section2 = () => {
  const features = [
    {
      icon: <CodeBracketIcon className="w-8 h-8 p-2 bg-green-900 rounded" />,
      title: "Live code Execution",
      description: "Run code instantly across 15+ languages",
    },
    {
      icon: <UserGroupIcon className="w-8 h-8 p-2 bg-blue-900 rounded" />,
      title: "Collaborative Coding",
      description: "Work together with your team in real-time",
    },
    {
      icon: <ShareIcon className="w-8 h-8 p-2 bg-purple-900 rounded" />,
      title: "Code Sharing",
      description: "Share code snippets securely and quickly",
    },
    {
      icon: <BugAntIcon className="w-8 h-8 p-2 bg-red-900 rounded" />,
      title: "AI Pair Programming",
      description: "Code smarter with intelligent assistance",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center py-12">
      <div className="text-4xl font-bold my-12 text-center">
        Why developers{" "}
        <span className="bg-gradient-to-r from-purple-950 to-green-800 bg-clip-text text-transparent">
          love
        </span>{" "}
        CodeTogether?
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-10/12 md:w-8/12 mt-8">
        {features.map((feature, index) => (
          <SpotlightCard
            className="custom-spotlight-card transition-all duration-500 ease -in-out hover:scale-105  hover:text-green-600"
            spotlightColor={
              "rgba(0, 229, 255, 0.3)" // original cyan glow
            }
          >
            <div key={index} className=" rounded-2xl flex flex-col gap-2 p-4">
              <div className="text-white">{feature.icon}</div>
              <div className="font-semibold">{feature.title}</div>
              <div className="text-sm text-gray-400">{feature.description}</div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default Section2;
