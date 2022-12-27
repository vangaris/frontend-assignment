import { ReactNode, useEffect, useState } from "react";

type ErrorBoundaryProps = {
  fallback: JSX.Element;
  children: ReactNode;
  onError: (error: Error, errorInfo: React.ErrorInfo) => void;
};

const ErrorBoundary = ({ fallback, onError, children }: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);

  useEffect(() => {
    if (error) {
      onError(error, errorInfo!);
    }
  }, [error, onError, errorInfo]);

  if (error) {
    return fallback;
  }

  try {
    return <>{children}</>;
  } catch (e) {
    setError(new Error("An error occurred"));
    setErrorInfo({ componentStack: "" });
    return fallback;
  }
};

export default ErrorBoundary;
