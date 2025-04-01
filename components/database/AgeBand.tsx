import React, { useEffect } from "react";

interface AgeBandProps {
  ageBand: string;
  setAgeBand: (age: string) => void;
}

export const AgeBand: React.FC<AgeBandProps> = ({ ageBand, setAgeBand }) => {
  const ages = ["all", "7-9", "10-12", "13"];
  const [selectedAge, setSelectedAge] = React.useState("all");

  const getLeftPosition = (age: string) => {
    switch (age) {
      case "all":
        return "0%";
      case "7-9":
        return "25%";
      case "10-12":
        return "50%";
      case "13":
        return "75%";
      default:
        return "0%";
    }
  };

  const handleAgeChange = (age: string) => {
    setSelectedAge(age);
    switch (age) {
      case "all":
        setAgeBand("all");
        break;
      case "7-9":
        setAgeBand("7-9");
        break;
      case "10-12":
        setAgeBand("10-12");
        break;
      case "13":
        setAgeBand("13");
        break;
      default:
        setAgeBand("all");
        break;
    }
  };

  useEffect(() => {
    console.log("Age band changed to", selectedAge);
    console.log("Age band changed to", ageBand);
  }, [selectedAge, ageBand]);

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
              onClick={() => handleAgeChange(age)}
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
