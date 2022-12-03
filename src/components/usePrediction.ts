import { useCallback, useEffect, useRef, useState } from "react";

interface IUsePredictionOptions {
  red?: string;
  blue?: string;
  class?: string;
  rounds?: number;
  boutType?: string;
}

interface IUsePredictionResult {
  result?: {
    red: number;
    blue: number;
  };
  isLoading?: boolean;
  errorMessage?: string;
  retry?: () => void;
}

const usePrediction = (
  options: IUsePredictionOptions
): IUsePredictionResult => {
  const [result, setResult] = useState<IUsePredictionResult["result"]>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const getData = useCallback(() => {
    // Do not perform request if parameters are missing
    if (Object.values(options).filter((o) => !!o).length < 5) {
      return;
    }

    const getData = async () => {
      // Send request
      const response = await fetch("http://api.mma.arcane-arts.net/predict", {
        method: "POST",
        body: JSON.stringify(options),
        headers: new Headers({ "content-type": "application/json" }),
      });

      // Handle result
      const body = await response.json();
      if (response.ok) {
        setResult(body);
      } else {
        setErrorMessage(body.error);
      }

      setIsLoading(false);
    };

    // Perform request and handle any other errors
    setIsLoading(true);
    getData().catch((error) => {
      setErrorMessage(error.message);
      setIsLoading(false);
    });
  }, [options]);

  // Debounce execution
  const timeout = useRef<string | number | NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => getData(), 200);
  }, [getData]);

  return {
    result,
    isLoading,
    errorMessage,
    retry: getData,
  };
};

export default usePrediction;
