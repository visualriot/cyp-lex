import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryBtn, TertiaryBtn } from "../buttons";
import { ClearIcon } from "../icons";
import { SearchCriteria } from "@/app/types/data";
import { Alert } from "@heroui/alert";

interface SubmitProps {
  handleClear: () => void;
  searchCriteria: Partial<SearchCriteria>;
  words?: string[];
  age: string;
  approved?: boolean;
}

export const Submit: React.FC<SubmitProps> = ({
  handleClear,
  searchCriteria,
  age,
  words,
  approved,
}) => {
  const router = useRouter();
  const [approval, setApproval] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [btnColor, setBtnColor] = useState("bg-accent");

  const handleSubmit = async () => {
    if (!approval) return;

    if (!words || words.length === 0) {
      setErrorMessage("Please enter words in the text area before submitting.");
      showAlert();
      return; // Prevent submission
    }

    setApproval(approved ?? true); // Set approval state based on the prop
    try {
      const body = words?.length
        ? { searchCriteria, words, age } // WordsInput mode
        : { searchCriteria, age }; // StatsInput mode

      // Send the data to the API
      const response = await fetch("/api/saveSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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

  const showAlert = () => {
    setIsAlertVisible(true);
    setBtnColor("bg-secondary animate-pulse");
    setTimeout(() => {
      setIsAlertVisible(false);
      setBtnColor("bg-accent");
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      <PrimaryBtn
        className={`py-10 text-xl font-semibold ${btnColor}`}
        onPress={handleSubmit}
      >
        Submit
      </PrimaryBtn>
      {/* {errorMessage && (
        <p className="text-sm text-red-500 text-center italic">
          {errorMessage}
        </p> // Display error message
      )} */}

      {isAlertVisible && (
        <div className="fixed left-4 bottom-12 z-50">
          <Alert color="danger" title={errorMessage} />
          {/* <p className="text-sm text-red-500 text-center italic">
            {errorMessage}
          </p> */}
        </div>
      )}
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
