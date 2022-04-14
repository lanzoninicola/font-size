import { useEffect, useState } from "react";

// https://remix.run/docs/en/v1/guides/constraints#rendering-with-browser-only-apis
export default function useLocalStorage<T>(
  key: string,
  initialValue: T | null = null
) {
  const [state, setState] = useState<T | null>(initialValue);

  // You can fix this by moving the code into useEffect, which only runs in the browser.
  useEffect(() => {
    // Check if data exists with the key in localStorage
    const itemFromLocalStorage = getWithLocalStorage(key);

    // if data exists,
    if (itemFromLocalStorage) {
      // set the state to the data in memory
      setState(itemFromLocalStorage);
    } else {
      // set the state to the initial value in memory and in localStorage
      setWithLocalStorage(initialValue);
    }
  }, []);

  function getWithLocalStorage(key: string) {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.log(e);
    }
  }

  function setWithLocalStorage(nextState: T | null) {
    try {
      setState(nextState);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(nextState));
      }
    } catch (e) {
      console.log(e);
    }
  }

  return [state, setWithLocalStorage] as const;
}
