import { useCallback, useState } from "react";
import { convertToPdf } from "../api/api.ts";
import { AxiosError } from "axios";
import { blobToBase64 } from "../utils/blobToBase64.ts";

export const useConverting = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setIsFetched(false);
    setError(null);
  }, []);

  const convert = useCallback(async (text: string) => {
    reset();

    try {
      const response = await convertToPdf(text);
      setIsSuccess(true);

      const blob = new Blob([response], { type: "application/pdf" });

      return await blobToBase64(blob);
    } catch (e) {
      console.error(e);
      setIsError(true);
      setError(e as AxiosError);

      return null;
    } finally {
      setIsLoading(false);
      setIsFetched(true);
    }
  }, []);

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    isFetched,
    convert,
    reset,
  };
};
