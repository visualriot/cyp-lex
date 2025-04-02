import React from "react";
import { useRouter } from "next/navigation";
import { PrimaryBtn, TertiaryBtn } from "../buttons";
import { ClearIcon } from "../icons";
import { SearchCriteria } from "@/app/types/data";

interface SubmitProps {
  handleClear: () => void;
  searchCriteria: Partial<SearchCriteria>;
  words?: string[];
  age: string;
}

export const Submit: React.FC<SubmitProps> = ({
  handleClear,
  searchCriteria,
  age,
  words,
}) => {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // Send the data to the API
      const response = await fetch("/api/saveSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchCriteria, words, age }),
      });

      if (response.ok) {
        const { id } = await response.json();
        // Navigate to the results page with the unique ID
        router.push(`/database/results?id=${id}`);
      } else {
        console.error("Failed to save search data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PrimaryBtn
        className="py-10 text-xl font-semibold"
        onPress={handleSubmit}
      >
        Submit
      </PrimaryBtn>
      <TertiaryBtn
        className="text-secondary fill-secondary"
        onPress={handleClear}
      >
        <ClearIcon />
        Clear input and start over
      </TertiaryBtn>
    </div>
  );
};
