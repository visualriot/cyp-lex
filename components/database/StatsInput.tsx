import React, { useEffect, useState } from "react";
import { SearchCriteria } from "@/app/types/data";

import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import { Slider } from "@heroui/slider";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { AgeBand } from "./AgeBand";
import { Submit } from "./Submit";
import { InfoIcon } from "../icons";
import { stats, mcpos } from "@/public/stats/stats";

interface StatsInput {
  handleSelectMode: (mode: string) => void;
}

export const StatsInput: React.FC<StatsInput> = ({ handleSelectMode }) => {
  const [isMobile, setisMobile] = React.useState(true);
  const [tooltipStates, setTooltipStates] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [filters, setFilters] = useState<Partial<SearchCriteria>>({});
  const [ageBand, setAgeBand] = useState<string>("all");

  const handleFilterChange = (field: keyof SearchCriteria, value: any) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };

      if (!value || (Array.isArray(value) && value.length === 0)) {
        // Remove the filter if no value is provided
        delete updatedFilters[field];
      } else {
        updatedFilters[field] = value;
      }

      return updatedFilters;
    });
  };

  // const {
  //   ageBand,
  //   setAgeBand,
  //   words,
  //   handleFileUpload,
  //   fileInputRef,
  //   searchCriteria,
  //   updateCriteria,
  //   setWords,
  // } = useSearchCriteria();

  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // SEARCH CRITERIA HANDLERS -----------------------------------------------------------------------------

  // CLEAR BUTTON HANDLER ---------------------------------------------------------------------------------
  const handleClear = () => {
    handleSelectMode("");
    setFilters({});
    setAgeBand("all");
  };

  // TOOLTIP HANDLERS --------------------------------------------------------------------------------------
  // Toggle tooltip visibility
  const handleTooltipToggle = (id: string) => {
    if (isMobile) {
      setTooltipStates((prevStates) => ({
        ...prevStates,
        [id]: !prevStates[id],
      }));
    }
  };

  const commonSliderProps = {
    classNames: {
      filler: "bg-gradient-to-r from-accentLight to-accentLight rounded-lg",
      labelWrapper: "mb-2",
      label: "font-semibold text-text text-base",
      value: "font-medium text-default-500 text-small",
      thumb: [
        "transition-size",
        "bg-gradient-to-r from-accentLight to-accentLight",
        "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
        "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
      ],
      step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
      mark: "mt-2",
    },
    className: "max-w-full",
    showSteps: !isMobile,
  };

  const commonTooltipProps = (id: string, content: string) => ({
    content: content,
    className:
      "bg-zinc-600 text-white rounded-md whitespace-normal max-w-72 text-xs text-center px-4 py-2",
    isOpen: isMobile ? tooltipStates[id] : undefined,
    onClose: () =>
      setTooltipStates((prevStates) => ({ ...prevStates, [id]: false })),
  });

  const generateMarks = (maxValue: number, step: number) => {
    const marks = [];
    for (let i = 1; i <= maxValue; i += step) {
      let label;
      let value;
      if (i === 1) {
        value = i;
        label = 1; // Ensure the first label is always 1
      } else if (maxValue >= 10) {
        value = i - 1;
        label = value.toString();
        // label = Math.floor(i / 10) * 10; // Round down to the nearest 10
      } else {
        value = i;
        label = i; // Use exact values
      }
      marks.push({
        value: value,
        label: label.toString(),
      });
    }

    // Ensure the last value is included
    if (maxValue >= 10 && marks[marks.length - 1].value !== maxValue) {
      marks.push({
        value: maxValue,
        label: maxValue.toString(),
      });
    }

    return marks;
  };

  return (
    <div className="space-y-8 w-full flex flex-col">
      <div className="space-y-8 w-full flex flex-col">
        <h3 className="">Select characteristics to filter words</h3>
        <div className="w-full flex  border-foreground-100 rounded  flex-col space-y-16 lg:border-1 lg:shadow-md  lg:p-6 lg:pt-8 lg:pb-16 lg:px-12">
          <AgeBand ageBand={ageBand} setAgeBand={setAgeBand} />

          {/* Sliders & Checkboxes */}
          {stats.map((stat) => {
            if (stat.type === "slider") {
              return (
                <div key={stat.id} className="space-y-4 relative">
                  <div className="absolute flex flex-row space-x-2 items-center top-4 left-0">
                    <h4>{stat.name}</h4>
                    {stat.tooltip && (
                      <Tooltip
                        {...commonTooltipProps(stat.value, stat.tooltip)}
                      >
                        <div className="flex items-center hover:opacity-100 transition-opacity opacity-50 z-50">
                          <Button
                            className="h-4 w-4 min-w-4 rounded-xl p-0 tooltip-button bg-text"
                            onPress={() => handleTooltipToggle(stat.value)}
                          >
                            <InfoIcon
                              size={10}
                              className="fill-white"
                              fill="white"
                            />
                          </Button>
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  <Slider
                    {...commonSliderProps}
                    label=" "
                    defaultValue={[
                      stat.minValue ?? 0, // Use default value if undefined
                      stat.maxValue ?? 100, // Adjust default as needed
                    ]}
                    minValue={stat.minValue ?? 0}
                    maxValue={stat.maxValue ?? 100}
                    step={stat.step}
                    onChange={(value) =>
                      handleFilterChange(
                        stat.value as keyof SearchCriteria,
                        value
                      )
                    }
                    marks={generateMarks(stat.maxValue ?? 100, stat.step ?? 1)}
                  />
                </div>
              );
            } else if (stat.type === "checkbox-group") {
              return (
                <CheckboxGroup
                  key={stat.id}
                  label={stat.name}
                  orientation="horizontal"
                  classNames={{
                    wrapper:
                      "flex flex-row mt-2 lg:mt-0 lg:space-x-16 lg:space-y-2 -mb-4",
                    label: "font-semibold text-text",
                  }}
                >
                  {mcpos.map((item) => (
                    <Checkbox
                      key={item.id}
                      value={item.value}
                      // onChange={() => handleCheckboxChange(item.value)}
                      // onChange={(checked) =>
                      //   updateCriteria(item.value, checked)
                      // }
                      onChange={(checked) =>
                        handleFilterChange(
                          stat.value as keyof SearchCriteria,
                          checked
                        )
                      }
                      classNames={{
                        wrapper: "fill-accent",
                        label: "text-sm font-medium",
                      }}
                    >
                      {item.name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              );
            }
            return null;
          })}
        </div>

        {/* SUBMIT BUTTONS */}
        <Submit
          // searchCriteria={filters}
          searchCriteria={filters}
          handleClear={handleClear}
          age={ageBand}
        />
      </div>
    </div>
  );
};

// BACKUP 2
// import React, { useEffect, useState } from "react";

// import { StatsSearchCriteria } from "@/app/types/data";

// import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
// import { Slider } from "@heroui/slider";
// import { Tooltip } from "@heroui/tooltip";
// import { Button } from "@heroui/button";
// import { AgeBand } from "./AgeBand";
// import { Submit } from "./Submit";
// import { InfoIcon } from "../icons";

// interface StatsInput {
//   handleSelectMode: (mode: string) => void;
// }

// export const StatsInput: React.FC<StatsInput> = ({ handleSelectMode }) => {
//   const [isMobile, setisMobile] = React.useState(true);
//   const [tooltipStates, setTooltipStates] = React.useState<{
//     [key: string]: boolean;
//   }>({});

//   const [ageBand, setAgeBand] = useState("all");
//   const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>(
//     []
//   );
//   const [searchCriteria, setSearchCriteria] = React.useState<
//     Partial<StatsSearchCriteria>
//   >({});

//   const stats = [
//     {
//       id: 1,
//       name: "Lemma",
//       value: "lemma",
//       tooltip: "Uninflected word form",
//       type: "checkbox",
//     },
//     {
//       id: 2,
//       name: "Most common part of speech",
//       value: "mcpos",
//       type: "checkbox-group",
//     },
//     {
//       id: 3,
//       name: "Raw frequency",
//       value: "raw",
//       tooltip:
//         "Number of times the word is encountered in the selected age range",
//       type: "slider",
//     },
//     {
//       id: 4,
//       name: "Zipf frequency",
//       value: "zipf",
//       tooltip: "Standardised frequency metric in the selected age range",
//       type: "slider",
//     },
//     {
//       id: 5,
//       name: "Book raw count",
//       value: "book-raw-count",
//       tooltip:
//         "Number of books in the selected age range the word is encountered in",
//       type: "slider",
//     },
//     {
//       id: 6,
//       name: "Book percentage",
//       value: "book-percentage",
//       tooltip:
//         "Percentage of books in the selected age range the word is encountered in",
//       type: "slider",
//     },
//     {
//       id: 7,
//       name: "Raw frequency in CBeebies TV programmes (ages 0-6)",
//       value: "raw-cbeebies",
//       type: "slider",
//     },
//     {
//       id: 8,
//       name: "Zipf frequency in CBeebies TV programmes (ages 0-6)",
//       value: "zipf-cbeebies",
//       type: "slider",
//     },
//     {
//       id: 9,
//       name: "Raw frequency in CBBC TV programmes (ages 6-12)",
//       value: "raw-cbbc",
//       type: "slider",
//     },
//     {
//       id: 10,
//       name: "Zipf frequency in CBBC TV programmes (ages 6-12)",
//       value: "zipf-cbbc",
//       type: "slider",
//     },
//     {
//       id: 11,
//       name: "Raw frequency in TV programmes (all ages)",
//       value: "raw-subtlex",
//       type: "slider",
//     },
//     {
//       id: 12,
//       name: "Zipf frequency in TV programmes (all ages)",
//       value: "zipf-subtlex",
//       type: "slider",
//     },
//   ];

//   const allpos = [
//     { id: 1, name: "Noun", value: "noun" },
//     { id: 2, name: "Verb", value: "verb" },
//     { id: 3, name: "Adjective", value: "adjective" },
//     { id: 4, name: "Adverb", value: "adverb" },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       setisMobile(window.innerWidth <= 1024);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // SEARCH CRITERIA HANDLERS -----------------------------------------------------------------------------
//   const addAgeToSearchCriteria = (age: string) => {
//     setSearchCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       age: ageBand,
//     }));
//   };

//   useEffect(() => {
//     addAgeToSearchCriteria(ageBand);
//     console.log("Current search criteria", searchCriteria);
//   }, [ageBand]);

//   const handleCheckboxChange = (value: string) => {
//     setSelectedCheckboxes((prevSelected) =>
//       prevSelected.includes(value)
//         ? prevSelected.filter((item) => item !== value)
//         : [...prevSelected, value]
//     );
//     setSearchCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       partOfSpeech: selectedCheckboxes.includes(value)
//         ? selectedCheckboxes.filter((item) => item !== value)
//         : [...selectedCheckboxes, value],
//     }));
//   };

//   const handleSliderChange = (
//     key: keyof StatsSearchCriteria,
//     value: number | number[]
//   ) => {
//     if (!key || !value) return;
//     setSearchCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       [key]: Array.isArray(value) ? value : [value, value],
//     }));
//   };

//   // CLEAR BUTTON HANDLER ---------------------------------------------------------------------------------
//   const handleClear = () => {
//     handleSelectMode("");
//   };

//   // TOOLTIP HANDLERS --------------------------------------------------------------------------------------
//   // Toggle tooltip visibility
//   const handleTooltipToggle = (id: string) => {
//     if (isMobile) {
//       setTooltipStates((prevStates) => ({
//         ...prevStates,
//         [id]: !prevStates[id],
//       }));
//     }
//   };

//   const commonSliderProps = {
//     classNames: {
//       filler: "bg-gradient-to-r from-accentLight to-accentLight rounded-lg",
//       labelWrapper: "mb-2",
//       label: "font-semibold text-text text-base",
//       value: "font-medium text-default-500 text-small",
//       thumb: [
//         "transition-size",
//         "bg-gradient-to-r from-accentLight to-accentLight",
//         "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
//         "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
//       ],
//       step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
//       mark: "mt-2",
//     },
//     className: "max-w-full",
//     showSteps: !isMobile,
//   };

//   const commonTooltipProps = (id: string, content: string) => ({
//     content: content,
//     className:
//       "bg-zinc-600 text-white rounded-md whitespace-normal max-w-72 text-xs text-center px-4 py-2",
//     isOpen: isMobile ? tooltipStates[id] : undefined,
//     onClose: () =>
//       setTooltipStates((prevStates) => ({ ...prevStates, [id]: false })),
//   });

//   const generateMarks = (maxValue: number, step: number) => {
//     const marks = [];
//     for (let i = 1; i <= maxValue; i += step) {
//       let label;
//       let value;
//       if (i === 1) {
//         value = i;
//         label = 1; // Ensure the first label is always 1
//       } else if (maxValue >= 10) {
//         value = i - 1;
//         label = value.toString();
//         // label = Math.floor(i / 10) * 10; // Round down to the nearest 10
//       } else {
//         value = i;
//         label = i; // Use exact values
//       }
//       marks.push({
//         value: value,
//         label: label.toString(),
//       });
//     }

//     // Ensure the last value is included
//     if (maxValue >= 10 && marks[marks.length - 1].value !== maxValue) {
//       marks.push({
//         value: maxValue,
//         label: maxValue.toString(),
//       });
//     }

//     return marks;
//   };

//   return (
//     <div className="space-y-8 w-full flex flex-col">
//       <div className="space-y-8 w-full flex flex-col">
//         <h3 className="">Select characteristics to filter words</h3>
//         <div className="w-full flex  border-foreground-100 rounded  flex-col space-y-16 lg:border-1 lg:shadow-md  lg:p-6 lg:pt-8 lg:pb-16 lg:px-12">
//           <AgeBand ageBand={ageBand} setAgeBand={setAgeBand} />

//           {/* Sliders */}
//           {/* Numbers of Letters */}
//           <Slider
//             {...commonSliderProps}
//             label="Number of Letters"
//             defaultValue={[1, 58]}
//             maxValue={58}
//             minValue={1}
//             step={1}
//             onChangeEnd={(value: number | number[]) =>
//               handleSliderChange("numberOfLetters", value)
//             }
//             marks={generateMarks(58, 10)}
//           />

//           <div className="space-y-4 relative">
//             <div className="absolute flex flex-row space-x-2 items-center top-4 left-0">
//               <h4>Zipf frequency</h4>

//               <Tooltip
//                 {...commonTooltipProps(
//                   "zipf",
//                   "Standardised frequency metric in the selected age range"
//                 )}
//               >
//                 <div className="flex items-center hover:opacity-100 transition-opacity opacity-50 z-50">
//                   <Button
//                     className="h-4 w-4 min-w-4 rounded-xl p-0 tooltip-button bg-text"
//                     onPress={() => handleTooltipToggle("zipf")}
//                   >
//                     <InfoIcon size={10} className="fill-white" fill="white" />
//                   </Button>
//                 </div>
//               </Tooltip>
//             </div>
//             <Slider
//               {...commonSliderProps}
//               label=" "
//               defaultValue={[1, 8]}
//               maxValue={8}
//               minValue={1}
//               step={1}
//               onChangeEnd={(value) => handleSliderChange("zipf_freq", value)}
//               marks={generateMarks(8, 1)}
//             />
//           </div>
//           {/* Checkboxes */}
//           <CheckboxGroup
//             label="Most common part of speech"
//             orientation="horizontal"
//             classNames={{
//               wrapper:
//                 "flex flex-row mt-2 lg:mt-0  lg:space-x-16 lg:space-y-2 -mb-4",
//               label: "font-semibold text-text",
//             }}
//           >
//             {allpos.map((item) => (
//               <Checkbox
//                 key={item.id}
//                 value={item.value}
//                 onChange={() => handleCheckboxChange(item.value)}
//                 classNames={{
//                   wrapper: "fill-accent",
//                   label: "text-sm font-medium",
//                 }}
//               >
//                 {item.name}
//               </Checkbox>
//             ))}
//           </CheckboxGroup>

//           {/* Book percentage */}
//           <div className="space-y-4 relative ">
//             <div className="absolute flex flex-row space-x-2 items-center top-4 left-0">
//               <h4>Book percentage</h4>
//               <Tooltip
//                 {...commonTooltipProps(
//                   "percentage",
//                   "Percentage of books in the selected age range the word is encountered in"
//                 )}
//               >
//                 <div className="flex items-center hover:opacity-100 transition-opacity opacity-50 z-50">
//                   <Button
//                     className="h-4 w-4 min-w-4 rounded-xl p-0 tooltip-button bg-text"
//                     onPress={() => handleTooltipToggle("percentage")}
//                   >
//                     <InfoIcon size={10} className="fill-white" fill="white" />
//                   </Button>
//                 </div>
//               </Tooltip>
//             </div>
//             <Slider
//               {...commonSliderProps}
//               label=" "
//               defaultValue={[0, 100]}
//               maxValue={100}
//               minValue={0}
//               step={1}
//               onChangeEnd={(value) => handleSliderChange("CD_book_perc", value)}
//               marks={generateMarks(100, 20)}
//             />
//           </div>
//           {/* TV */}

//           <Slider
//             {...commonSliderProps}
//             label="Zipf frequency in CBeebies TV programmes (ages 0-6)"
//             onChangeEnd={(value) => handleSliderChange("CBBC_zipf", value)}
//             defaultValue={[0, 8]}
//             maxValue={8}
//             minValue={0}
//             step={1}
//             marks={generateMarks(8, 1)}
//           />
//           <Slider
//             {...commonSliderProps}
//             label="Zipf frequency in CBBC TV programmes (ages 6-12)"
//             onChangeEnd={(value) => handleSliderChange("CBeebies_zipf", value)}
//             defaultValue={[1, 8]}
//             maxValue={8}
//             minValue={1}
//             step={1}
//             marks={generateMarks(8, 1)}
//           />
//           <Slider
//             {...commonSliderProps}
//             label="Zipf frequency in TV programmes (all ages)"
//             onChangeEnd={(value) => handleSliderChange("SUBTLEXUK_zipf", value)}
//             defaultValue={[0, 8]}
//             maxValue={8}
//             minValue={0}
//             step={1}
//             marks={generateMarks(8, 1)}
//           />
//         </div>

//         {/* SUBMIT BUTTONS */}
//         <Submit searchCriteria={searchCriteria} handleClear={handleClear} />
//       </div>
//     </div>
//   );
// };
