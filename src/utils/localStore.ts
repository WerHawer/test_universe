export const setToLocalStorage = (key: string, data: unknown) => {
  try {
    const parsedData = JSON.stringify(data);
    localStorage.setItem(key, parsedData);
  } catch (error) {
    console.error(error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
