import { ReactNode } from "react";

function Header({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between">
      <h1 className="text-gray-900 text-4xl font-bold text-center sm:text-left">
        {title}
      </h1>

      {children}
    </header>
  );
}

export default Header;
