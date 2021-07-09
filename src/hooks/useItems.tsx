import { useEffect, useState } from "react";
import { IItems } from "../types";

export default function useItems() {
  const [items, setItems] = useState<IItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    const baseUrl = process.env.REACT_APP_API_URL;

    setLoading(true);

    const result = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    setItems(data.data.meals);
    setLoading(false);
  };

  useEffect(() => {
    if (!items.length) {
      fetchData();
    }
  }, [items]);

  return {
    loading,
    items,
  };
}
