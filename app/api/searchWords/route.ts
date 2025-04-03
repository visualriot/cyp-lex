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
    const { words, ageBand, page = 1, limit = 50 } = body;

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
      return match || { Word: word, notFound: true }; // Return "not found" if no match
    });

    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);

    // return NextResponse.json(results);
    return NextResponse.json({
      results: paginatedResults || [], // Ensure results is always an array
      total: results.length || 0,
    });
  } catch (error) {
    console.error("Error searching words:", error);
    return NextResponse.json(
      { error: "Failed to search words" },
      { status: 500 }
    );
  }
}
