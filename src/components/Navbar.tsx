import { AppBar } from "@mui/material";
import { IconMenu, IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <AppBar>
      <nav className="h-20 flex items-center justify-between px-4 md:px-6 lg:px-8 text-white">
        <a
          href="/"
          className="text-2xl tracking-wide cursor-pointer duration-150 hover:text-white/90"
        >
          Loan Calculator
        </a>
        <div className="flex items-center justify-end gap-4 md:gap-6 lg:gap-8">
          <ul className="hidden sm:flex items-center justify-end gap-4 md:gap-6 lg:gap-8 select-none">
            <li>
              <a
                href="/"
                className="duration-150 hover:underline hover:text-white/90 uppercase"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/exchange-rates"
                className="duration-150 hover:underline hover:text-white/90 uppercase"
              >
                Exchange Rates (Live)
              </a>
            </li>
            <li>
              <a
                href="/error"
                className="duration-150 hover:underline hover:text-white/90 uppercase"
              >
                ERROR PAGE
              </a>
            </li>
          </ul>
          <div role="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <IconSunFilled /> : <IconMoonFilled />}
          </div>
          <Sheet>
            <SheetTrigger className="sm:hidden">
              <IconMenu />
            </SheetTrigger>
            <SheetContent
              side="top"
              className={`sm:hidden w-full flex flex-col gap-8 mt-20 py-10 px-4 ${
                darkMode ? "bg-neutral-900 border-neutral-800" : "bg-white"
              }`}
            >
              <a href="/" className="text-xl uppercase">
                Home
              </a>
              <a href="/exchange-rates" className="text-xl uppercase">
                Exchange Rates (Live)
              </a>
              <a href="/error" className="text-xl uppercase">
                ERROR PAGE
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </AppBar>
  );
};

export default Navbar;
