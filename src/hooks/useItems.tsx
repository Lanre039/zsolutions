import { useEffect, useState } from "react";
import { IItems } from "../types";

const fetchData = async () => {
  const baseUrl = process.env.REACT_APP_API_URL;

  const result = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await result.json();
  return data.data.meals as IItems[];
};

export default function useItems() {
  const [items, setItems] = useState<IItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchItems = async () => {
    setLoading(true);
    const data = await fetchData();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!items.length) {
      fetchItems();
    }
  }, [items]);

  return {
    loading,
    items,
  };
}
