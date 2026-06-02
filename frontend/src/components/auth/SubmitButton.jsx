import { Loader2 } from "lucide-react";

export const SubmitButton = ({
  isLoading,
  loadingText = "Loading...",
  children,
}) => {
  return (
    <button
      type="submit"
      className="btn btn-primary w-full"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};
