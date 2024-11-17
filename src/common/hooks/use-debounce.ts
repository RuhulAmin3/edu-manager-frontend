
import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value.
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 */

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup timeout on value or delay change
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
