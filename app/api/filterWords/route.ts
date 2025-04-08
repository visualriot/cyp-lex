import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

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

        const [min, max] = searchCriteria[key]; // Get the range for the filter
        let value: number;

        if (key === "mcPoS") {
          const mcPoSValues = searchCriteria[key];
          if (
            !mcPoSValues.some((prefix: string) =>
              row["mcPoS"]?.startsWith(prefix)
            )
          ) {
            return false;
          }
        } else if (key === "LetterCount") {
          const [min, max] = searchCriteria[key]; // Get the range for the filter
          value = row["Word"] ? row["Word"].length : 0;

          if (value < min || value > max) return false;
        } else {
          const [min, max] = searchCriteria[key]; // Get the range for the filter
          value = parseFloat(row[key] || 0);

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
          row[key] = parseFloat(numericValue.toFixed(2)); // Round to 2 decimal places
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
