import Papa from "papaparse";

export const fetchData = async (filePath: string): Promise<any[]> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true, // Assumes the first row contains column headers
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (error: any) => reject(error),
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing CSV file:", error);
    throw error;
  }
};
