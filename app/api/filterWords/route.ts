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

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { searchCriteria, ageBand } = body;

//     if (!ageBand || !searchCriteria) {
//       return NextResponse.json(
//         { error: "Invalid request. 'ageBand' and 'Criteria' is required." },
//         { status: 400 }
//       );
//     }

//     // Load the CSV data for the specified ageBand
//     const csvData = (await loadCSVData(ageBand)) as Record<string, any>[];

//     console.log("CSV Data:", csvData); // Debugging line

//     const filteredResults = csvData.filter((row) => {
//       for (const key in searchCriteria) {
//         if (!searchCriteria[key]) continue; // Skip searchCriteria that are not set

//         const [min, max] = searchCriteria[key];
//         const value = parseFloat(row[key] || 0);
//         if (value < min || value > max) return false;
//       }
//       return true;
//     });

//     return NextResponse.json(filteredResults);
//   } catch (error) {
//     console.error("Error filtering words:", error);
//     return NextResponse.json(
//       { error: "Failed to filter words" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { searchCriteria, ageBand } = body;

    console.log("Request Body:", body); // Debugging line

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

        if (key === "numberOfLetters") {
          // Special case: calculate the length of the Word column
          value = row["Word"] ? row["Word"].length : 0;
        } else {
          // General case: parse the value from the row
          value = parseFloat(row[key] || 0);
        }

        // Check if the value is within the range
        if (value < min || value > max) return false;
      }
      return true;
    });

    return NextResponse.json(filteredResults);
  } catch (error) {
    console.error("Error filtering words:", error);
    return NextResponse.json(
      { error: "Failed to filter words" },
      { status: 500 }
    );
  }
}
