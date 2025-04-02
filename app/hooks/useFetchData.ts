import { useState, useEffect } from "react";

export const useFetchData = (id: string | null) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/saveSearch?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch search data");

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};
