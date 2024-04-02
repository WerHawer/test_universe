import { useEffect, useState } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStore.ts";

const LOCAL_STORAGE_KEY = "historyConverting";

export type ConvertingItem = {
  base64: string;
  timestamp: number;
  name: string;
};

export const useHistoryConverting = (base64: string | null) => {
  const [history, setHistory] = useState<ConvertingItem[]>([]);

  useEffect(() => {
    const data = getFromLocalStorage(LOCAL_STORAGE_KEY);

    if (data) {
      setHistory(data);
    }
  }, []);

  useEffect(() => {
    if (!base64) return;

    const isAlreadyInHistory = history.some((item) => item.base64 === base64);

    if (isAlreadyInHistory) return;

    const item = {
      base64,
      timestamp: Date.now(),
      name: `Document ${history.length + 1}`,
    };

    setHistory((prev) => [...prev, item]);
  }, [base64]);

  useEffect(() => {
    if (!history.length) return;

    setToLocalStorage(LOCAL_STORAGE_KEY, history);
  }, [history]);

  return { history };
};
