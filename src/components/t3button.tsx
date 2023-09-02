import React from "react"; // we need this to make JSX compile

type T3buttonProps = {
  text: string;
  onClick: () => void;
};

export const T3buttonSkeleton = ({ text, onClick }: T3buttonProps) => (
  <button
    onClick={onClick}
    className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
  >
    {text}
  </button>
);
