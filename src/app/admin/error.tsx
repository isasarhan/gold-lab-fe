"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-96 bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md">
        <h2 className="text-xl font-semibold text-red-600">Something went wrong!</h2>
        <p className="text-gray-600 mt-2">An unexpected error has occurred.</p>
        {error.digest && <p className="text-sm text-gray-500 mt-1">Error Code: {error.digest}</p>}
        
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
