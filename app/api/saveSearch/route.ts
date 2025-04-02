import { NextResponse } from "next/server";

// Temporary in-memory storage (use a database in production)
const searchDataStore: Record<string, any> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the JSON body
    const { searchCriteria, words, age } = body;

    // Generate a unique ID for the search data
    const id = Date.now().toString();

    // Save the data in memory (replace with database logic in production)
    searchDataStore[id] = { searchCriteria, words, age };

    // Return the unique ID
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Error saving search data:", error);
    return NextResponse.json(
      { error: "Failed to save search data" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id && searchDataStore[id]) {
    return NextResponse.json(searchDataStore[id]);
  } else {
    return NextResponse.json({ error: "Data not found" }, { status: 404 });
  }
}
