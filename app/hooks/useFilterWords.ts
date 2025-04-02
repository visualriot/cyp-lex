import { useState, useEffect } from "react";

export const useFilterWords = (filters: any, ageBand: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filters || !ageBand) {
      setLoading(false);
      return;
    }

    const fetchFilteredWords = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/filterWords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filters, ageBand }),
        });

        if (!response.ok) throw new Error("Failed to fetch filtered words");

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching filtered words:", err);
        setError("Error fetching filtered words");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredWords();
  }, [filters, ageBand]);

  return { data, loading, error };
};
