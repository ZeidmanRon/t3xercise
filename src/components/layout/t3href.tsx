import React from "react"; // we need this to make JSX compile

type T3hrefProps = {
  text: string;
  href: string;
};

export const T3href = ({ text, href }: T3hrefProps) => (
  <div className="rounded-md border border-slate-200 p-4 shadow-sm">
    <a className="text-xl font-thin" href={href}>
      {text}
    </a>
  </div>
);
