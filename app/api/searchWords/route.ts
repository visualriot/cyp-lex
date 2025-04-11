import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser"; // Install with `npm install csv-parser`

// Load the CSV file into memory (replace with database logic in production)
function loadCSVData(ageBand: string): Promise<Record<string, any>[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    `cyplex_${ageBand}.csv`
  ); // Adjust the path to your CSV file
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
    const { words, ageBand } = body;

    if (!words || !Array.isArray(words)) {
      return NextResponse.json(
        { error: "Invalid request. 'words' must be an array." },
        { status: 400 }
      );
    }

    // Load the CSV data
    const csvData = (await loadCSVData(ageBand)) as Record<string, any>[];

    // Filter the data for the requested words
    const results = words.map((word) => {
      const match = csvData.find(
        (row) => row.Word.toLowerCase() === word.toLowerCase()
      );

      // Format numbers to 2 decimal places
      if (match) {
        Object.keys(match).forEach((key) => {
          // Check if the value is a string that can be converted to a number
          if (!isNaN(match[key])) {
            const numericValue = parseFloat(match[key]); // Convert string to number
            if (numericValue < 0.005 && numericValue > 0) {
              match[key] = "< 0.005";
            } else {
              match[key] = parseFloat(numericValue.toFixed(2)); // Round to 2 decimal places
            }
          }
        });
      }

      return match || { Word: word, notFound: true }; // Return "not found" if no match
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error searching words:", error);
    return NextResponse.json(
      { error: "Failed to search words" },
      { status: 500 }
    );
  }
}
