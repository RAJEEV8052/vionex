"use client";

import { ErrorState } from "@/components/error-state";

const ErrorPage = () => {
  return (
    <ErrorState
      title="Failed to load Agents"
      description="Please try again later."
    />
  );
};
export default ErrorPage;
