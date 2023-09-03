import React from "react";

type T3hrefProps = {
  text: string;
  href: string;
  icon?: React.ReactNode; // Accept an icon as a prop
};

export const T3href = ({ text, href, icon }: T3hrefProps) => (
  <div className="border-b border-slate-500">
    <a className="flex justify-center py-2 text-xl font-thin" href={href}>
      {icon && <span className="ml-2">{icon}</span>} {text}
    </a>
  </div>
);
