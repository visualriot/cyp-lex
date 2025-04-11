import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { mcpos } from "@/public/stats/stats"; // Adjust the import path as needed

// Load the CSV file into memory (replace with database logic in production)
function loadCSVData(ageBand: string): Promise<Record<string, any>[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    `cyplex_${ageBand}.csv`
  );
  const results: Record<string, any>[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { searchCriteria, ageBand } = body;

    if (!ageBand || !searchCriteria) {
      return NextResponse.json(
        {
          error:
            "Invalid request. 'ageBand' and 'searchCriteria' are required.",
        },
        { status: 400 }
      );
    }

    // Load the CSV data for the specified ageBand
    const csvData = (await loadCSVData(ageBand)) as Record<string, any>[];

    // Apply filters dynamically based on searchCriteria
    const filteredResults = csvData.filter((row) => {
      for (const key in searchCriteria) {
        if (!searchCriteria[key]) continue; // Skip undefined or null filters

        const [min, max] = searchCriteria[key].map(Number); // Convert to numbers
        let value: number;

        // if (key === "mcPoS") {
        //   const mcPoSValues = searchCriteria[key];
        //   if (
        //     !mcPoSValues.some((prefix: string) =>
        //       row["mcPoS"]?.startsWith(prefix)
        //     )
        //   ) {
        //     return false;
        //   }
        // if (key === "mcPoS") {
        //   const mcPoSValues = searchCriteria[key]; // Expecting an array of values
        //   const mcPoSItem = mcpos.find((item) => item.value === mcPoSValue);

        //   const isMatch = mcPoSValues.some((value: string) => {
        //     if (Array.isArray(value)) {
        //       // Handle array values (e.g., ["NN", "NNS"])
        //       return value.includes(row["mcPoS"]);
        //     } else if (value === "JJ") {
        //       // Special case for adjectives: match codes starting with "JJ"
        //       return row["mcPoS"]?.startsWith("JJ");
        //     } else if (value === "VB") {
        //       // Special case for verbs: match codes starting with "VB"
        //       return row["mcPoS"]?.startsWith("VB");
        //     } else {
        //       // Default case: match exact value
        //       return row["mcPoS"] === value;
        //     }
        //   });

        //   if (!isMatch) {
        //     return false; // Exclude row if no match is found
        //   }
        if (key === "mcPoS") {
          const mcPoSValue = searchCriteria[key]; // Expecting a single value or an array of values

          // Handle mcPoSValue as an array or a single value
          const mcPoSValues = Array.isArray(mcPoSValue)
            ? mcPoSValue
            : [mcPoSValue];

          const isMatch = mcPoSValues.some((value) => {
            const mcPoSItem = mcpos.find((item) => item.value === value);

            if (!mcPoSItem) {
              console.error(`mcPoSItem not found for value: ${value}`);
              return false; // Exclude the row if the value is not found
            }

            return value === "JJ" || value === "VB"
              ? row["mcPoS"]?.startsWith(value) // Special case: match codes starting with "JJ" or "VB"
              : mcPoSItem.codes.includes(row["mcPoS"]); // Default case: match specific codes
          });

          if (!isMatch) {
            return false; // Exclude row if no match is found
          }
        } else if (key === "LetterCount") {
          value = row["Word"] ? row["Word"].length : 0;

          if (value < min || value > max) return false;
        } else {
          value = parseFloat(row[key] || "0"); // Ensure row[key] is parsed as a number

          if (value < min || value > max) return false;
        }
      }
      return true;
    });

    // Format numbers to 2 decimal places
    const formattedResults = filteredResults.map((row) => {
      Object.keys(row).forEach((key) => {
        // Check if the value is a string that can be converted to a number
        if (!isNaN(row[key])) {
          const numericValue = parseFloat(row[key]); // Convert string to number
          if (numericValue < 0.005 && numericValue > 0) {
            row[key] = "< 0.005";
          } else {
            row[key] = parseFloat(numericValue.toFixed(2)); // Round to 2 decimal places
          }
        }
      });
      return row;
    });

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error("Error filtering words:", error);
    return NextResponse.json(
      { error: "Failed to filter words" },
      { status: 500 }
    );
  }
}
