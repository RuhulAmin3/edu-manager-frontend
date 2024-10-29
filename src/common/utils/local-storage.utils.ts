// Utility to save data to localStorage
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

// Utility to retrieve data from localStorage
export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return null;
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error("Error retrieving from localStorage", error);
    return null;
  }
};

// Utility to remove data from localStorage
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};
