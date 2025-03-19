import React from "react";

interface AgeBand {}

export const AgeBand: React.FC<AgeBand> = ({}) => {
  const ages = ["all ages", "7-9", "10-12", "13-16"];
  const [selectedAge, setSelectedAge] = React.useState("all ages");

  const getLeftPosition = (age: string) => {
    switch (age) {
      case "all ages":
        return "0%";
      case "7-9":
        return "25%";
      case "10-12":
        return "50%";
      case "13-16":
        return "75%";
      default:
        return "0%";
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h4>Select the age band</h4>
      <div className="relative w-full bg-foreground-200 rounded-lg">
        {/* slider animation */}
        <div
          className="absolute top-0 h-full w-1/4 bg-white rounded-lg smooth border-4"
          style={{ left: getLeftPosition(selectedAge) }}
        ></div>

        {/* buttons container */}
        <div className="relative z-10 grid grid-cols-4 gap-4 font-semibold">
          {ages.map((age) => (
            <button
              key={age}
              onClick={() => setSelectedAge(age)}
              className={`px-4 py-5 rounded-xl uppercase text-sm ${
                selectedAge === age
                  ? "text-text"
                  : "text-disabledText hover:text-text"
              } smooth`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
