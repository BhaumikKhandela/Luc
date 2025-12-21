import React from "react";

type Props = {
  color?: string;
};

export const Spinner = ({ color }: Props) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="inline-flex items-center justify-center"
    >
      <svg
        viewBox="0 0 50 50"
        className="
          h-7 w-7
          animate-[spin_0.75s_linear_infinite]
          text-gray-300
          dark:text-gray-700
        "
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeOpacity="0.25"
        />

        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color || "currentColor"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="90 140"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
};
