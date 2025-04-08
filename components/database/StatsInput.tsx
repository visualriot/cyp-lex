// import React, { useEffect, useState } from "react";
// import { SearchCriteria } from "@/app/types/data";

// import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
// import { Slider } from "@heroui/slider";
// import { Tooltip } from "@heroui/tooltip";
// import { Button } from "@heroui/button";
// import { AgeBand } from "./AgeBand";
// import { Submit } from "./Submit";
// import { InfoIcon } from "../icons";
// import { stats, mcpos } from "@/public/stats/stats";

// interface StatsInput {
//   handleSelectMode: (mode: string) => void;
// }

// export const StatsInput: React.FC<StatsInput> = ({ handleSelectMode }) => {
//   const [isMobile, setisMobile] = React.useState(true);
//   const [tooltipStates, setTooltipStates] = React.useState<{
//     [key: string]: boolean;
//   }>({});
//   const [filters, setFilters] = useState<Partial<SearchCriteria>>({});
//   const [ageBand, setAgeBand] = useState<string>("all");

//   const handleFilterChange = (field: keyof SearchCriteria, value: any) => {
//     setFilters((prev) => {
//       const updatedFilters = { ...prev };

//       if (!value || (Array.isArray(value) && value.length === 0)) {
//         // Remove the filter if no value is provided
//         delete updatedFilters[field];
//       } else {
//         updatedFilters[field] = value;
//       }

//       return updatedFilters;
//     });
//   };

//   const handleCheckboxChange = (value: string, checked: boolean) => {
//     setFilters((prev) => {
//       const updatedFilters = { ...prev };
//       const currentValues = Array.isArray(updatedFilters.mcPoS)
//         ? updatedFilters.mcPoS
//         : []; // Ensure mcPoS is treated as an array

//       if (checked) {
//         // Add the selected value
//         updatedFilters.mcPoS = [...currentValues, value];
//       } else {
//         // Remove the unselected value
//         updatedFilters.mcPoS = currentValues.filter(
//           (item: string) => item !== value
//         );
//       }

//       return updatedFilters;
//     });
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setisMobile(window.innerWidth <= 1024);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // SEARCH CRITERIA HANDLERS -----------------------------------------------------------------------------

//   // CLEAR BUTTON HANDLER ---------------------------------------------------------------------------------
//   const handleClear = () => {
//     handleSelectMode("");
//     setFilters({});
//     setAgeBand("all");
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

//   return (
//     <div className="space-y-8 w-full flex flex-col">
//       <div className="space-y-8 w-full flex flex-col">
//         <h3 className="">Select characteristics to filter words</h3>
//         <div className="w-full flex  border-foreground-100 rounded  flex-col space-y-16 lg:border-1 lg:shadow-md  lg:p-6 lg:pt-8 lg:pb-16 lg:px-12">
//           <AgeBand ageBand={ageBand} setAgeBand={setAgeBand} />

//           {/* Sliders & Checkboxes */}
//           {stats.map((stat) => {
//             if (stat.type === "slider") {
//               return (
//                 <div key={stat.id} className="space-y-4 relative">
//                   <div className="absolute flex flex-row space-x-2 items-center top-4 left-0">
//                     <h4>{stat.name}</h4>
//                     {stat.tooltip && (
//                       <Tooltip
//                         {...commonTooltipProps(stat.value, stat.tooltip)}
//                       >
//                         <div className="flex items-center hover:opacity-100 transition-opacity opacity-50 z-50">
//                           <Button
//                             className="h-4 w-4 min-w-4 rounded-xl p-0 tooltip-button bg-text"
//                             onPress={() => handleTooltipToggle(stat.value)}
//                           >
//                             <InfoIcon
//                               size={10}
//                               className="fill-white"
//                               fill="white"
//                             />
//                           </Button>
//                         </div>
//                       </Tooltip>
//                     )}
//                   </div>
//                   <Slider
//                     {...commonSliderProps}
//                     label=" "
//                     defaultValue={[
//                       stat.minValue ?? 0, // Use default value if undefined
//                       stat.maxValue ?? 100, // Adjust default as needed
//                     ]}
//                     minValue={stat.minValue ?? 0}
//                     maxValue={stat.maxValue ?? 100}
//                     step={stat.step}
//                     showSteps={false}
//                     onChange={(value) =>
//                       handleFilterChange(
//                         stat.value as keyof SearchCriteria,
//                         value
//                       )
//                     }
//                     marks={stat.marks}
//                   />
//                 </div>
//               );
//             } else if (stat.type === "checkbox-group") {
//               return (
//                 <div key={stat.id} className="space-y-4 relative">
//                   <div className="absolute flex flex-row space-x-2 items-center top-4 left-0">
//                     <h4>{stat.name}</h4>
//                     {stat.tooltip && (
//                       <Tooltip
//                         {...commonTooltipProps(stat.value, stat.tooltip)}
//                       >
//                         <div className="flex items-center hover:opacity-100 transition-opacity opacity-50 z-50">
//                           <Button
//                             className="h-4 w-4 min-w-4 rounded-xl p-0 tooltip-button bg-text"
//                             onPress={() => handleTooltipToggle(stat.value)}
//                           >
//                             <InfoIcon
//                               size={10}
//                               className="fill-white"
//                               fill="white"
//                             />
//                           </Button>
//                         </div>
//                       </Tooltip>
//                     )}
//                   </div>
//                   <CheckboxGroup
//                     key={stat.id}
//                     label={stat.name}
//                     orientation="horizontal"
//                     classNames={{
//                       wrapper:
//                         "flex flex-row mt-2 lg:mt-0 lg:space-x-16 lg:space-y-2 -mb-4",
//                       label: "font-semibold text-text",
//                     }}
//                   >
//                     {mcpos.map((item) => (
//                       <Checkbox
//                         key={item.id}
//                         value={item.value}
//                         onChange={(event) =>
//                           handleCheckboxChange(item.value, event.target.checked)
//                         }
//                         classNames={{
//                           wrapper: "fill-accent",
//                           label: "text-sm font-medium",
//                         }}
//                       >
//                         {item.name}
//                       </Checkbox>
//                     ))}
//                   </CheckboxGroup>
//                 </div>
//               );
//             }
//             return null;
//           })}
//         </div>

//         {/* SUBMIT BUTTONS */}
//         <Submit
//           // searchCriteria={filters}
//           searchCriteria={filters}
//           handleClear={handleClear}
//           age={ageBand}
//           approved={true}
//           searchMode="stats"
//         />
//       </div>
//     </div>
//   );
// };

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

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      const currentValues = Array.isArray(updatedFilters.mcPoS)
        ? updatedFilters.mcPoS
        : []; // Ensure mcPoS is treated as an array

      if (checked) {
        // Add the selected value
        updatedFilters.mcPoS = [...currentValues, value];
      } else {
        // Remove the unselected value
        updatedFilters.mcPoS = currentValues.filter(
          (item: string) => item !== value
        );
      }

      return updatedFilters;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // CLEAR BUTTON HANDLER ---------------------------------------------------------------------------------
  const handleClear = () => {
    handleSelectMode("");
    setFilters({});
    setAgeBand("all");
  };

  // TOOLTIP HANDLERS --------------------------------------------------------------------------------------
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
    showSteps: false,
  };

  const commonTooltipProps = (id: string, content: string) => ({
    content: content,
    className:
      "bg-zinc-600 text-white rounded-md whitespace-normal max-w-72 text-xs text-center px-4 py-2",
    isOpen: isMobile ? tooltipStates[id] : undefined,
    onClose: () =>
      setTooltipStates((prevStates) => ({ ...prevStates, [id]: false })),
  });

  return (
    <div className="space-y-8 w-full flex flex-col">
      <div className="space-y-8 w-full flex flex-col">
        <h3 className="">Select characteristics to filter words</h3>
        <div className="w-full flex border-foreground-100 rounded flex-col space-y-16 lg:border-1 lg:shadow-md lg:p-6 lg:pt-8 lg:pb-16 lg:px-12">
          <AgeBand ageBand={ageBand} setAgeBand={setAgeBand} />

          {/* Sliders & Checkboxes */}
          {stats.map((stat) => {
            if (stat.type === "slider") {
              const [range, setRange] = useState<number[]>([
                stat.minValue ?? 0,
                stat.maxValue ?? 100,
              ]);
              const [minInput, setMinInput] = useState<string>(
                range[0].toString()
              );
              const [maxInput, setMaxInput] = useState<string>(
                range[1].toString()
              );

              const handleSliderChange = (value: number | number[]) => {
                if (Array.isArray(value)) {
                  // Handle range slider (array of numbers)
                  setRange(value);
                  setMinInput(value[0].toString());
                  setMaxInput(value[1].toString());
                  handleFilterChange(stat.value as keyof SearchCriteria, value);
                } else {
                  // Handle single-value slider (number)
                  setRange([value, value]);
                  setMinInput(value.toString());
                  setMaxInput(value.toString());
                  handleFilterChange(stat.value as keyof SearchCriteria, [
                    value,
                    value,
                  ]);
                }
              };

              const handleMinInputChange = (
                e: React.ChangeEvent<HTMLInputElement>
              ) => {
                setMinInput(e.target.value);
              };

              const handleMaxInputChange = (
                e: React.ChangeEvent<HTMLInputElement>
              ) => {
                setMaxInput(e.target.value);
              };

              const handleMinInputKeyDown = (
                e: React.KeyboardEvent<HTMLInputElement>
              ) => {
                if (e.key === "Enter" && !isNaN(Number(minInput))) {
                  const numericValue = Math.min(
                    Math.max(Number(minInput), stat.minValue ?? 0),
                    range[1]
                  );
                  setRange([numericValue, range[1]]);
                  setMinInput(numericValue.toString());
                  handleFilterChange(stat.value as keyof SearchCriteria, [
                    numericValue,
                    range[1],
                  ]);
                }
              };

              const handleMaxInputKeyDown = (
                e: React.KeyboardEvent<HTMLInputElement>
              ) => {
                if (e.key === "Enter" && !isNaN(Number(maxInput))) {
                  const numericValue = Math.max(
                    Math.min(Number(maxInput), stat.maxValue ?? 100),
                    range[0]
                  );
                  setRange([range[0], numericValue]);
                  setMaxInput(numericValue.toString());
                  handleFilterChange(stat.value as keyof SearchCriteria, [
                    range[0],
                    numericValue,
                  ]);
                }
              };

              return (
                <div key={stat.id} className="space-y-4 relative">
                  <div className="absolute flex flex-row space-x-2 items-center top-4 left-0">
                    <h4>{stat.name}</h4>
                    {stat.tooltip && (
                      // <Tooltip
                      //   content={stat.tooltip}
                      //   className="bg-zinc-600 text-white rounded-md whitespace-normal max-w-72 text-xs text-center px-4 py-2"
                      // >
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
                    defaultValue={range}
                    minValue={stat.minValue ?? 0}
                    maxValue={stat.maxValue ?? 100}
                    step={stat.step}
                    value={range}
                    onChange={handleSliderChange}
                    marks={stat.marks}
                    renderValue={({ children, ...props }) => (
                      <div className="flex items-center space-x-4">
                        <Tooltip
                          className="text-tiny text-default-500 rounded-md"
                          content="Press Enter to confirm"
                          placement="left"
                        >
                          <input
                            aria-label={`${stat.name} minimum value`}
                            className="px-1 py-0.5 w-20 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                            type="text"
                            value={minInput}
                            onChange={handleMinInputChange}
                            onKeyDown={handleMinInputKeyDown}
                          />
                        </Tooltip>
                        <span>-</span>
                        <Tooltip
                          className="text-tiny text-default-500 rounded-md"
                          content="Press Enter to confirm"
                          placement="left"
                        >
                          <input
                            aria-label={`${stat.name} maximum value`}
                            className="px-1 py-0.5 w-20 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                            type="text"
                            value={maxInput}
                            onChange={handleMaxInputChange}
                            onKeyDown={handleMaxInputKeyDown}
                          />
                        </Tooltip>
                      </div>
                    )}
                  />
                </div>
              );
            } else if (stat.type === "checkbox-group") {
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
                        onChange={(event) =>
                          handleCheckboxChange(item.value, event.target.checked)
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
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Submit Buttons */}
        <Submit
          searchCriteria={filters}
          handleClear={handleClear}
          age={ageBand}
          approved={true}
          searchMode="stats"
        />
      </div>
    </div>
  );
};
