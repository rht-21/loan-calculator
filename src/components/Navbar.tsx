import { AppBar } from "@mui/material";
import { IconMenu, IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useLocation, Link } from "react-router-dom";

const Navbar = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Exchange Rates (Live)", path: "/exchange-rates" },
    { label: "ERROR PAGE", path: "/error" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar>
      <nav className="h-20 flex items-center justify-between px-4 md:px-6 lg:px-8 text-white">
        <Link
          to="/"
          className="text-2xl tracking-wide cursor-pointer duration-150 hover:text-white/90"
        >
          Loan Calculator
        </Link>
        <div className="flex items-center justify-end gap-4 md:gap-6 lg:gap-8">
          <ul className="hidden sm:flex items-center justify-end gap-4 md:gap-6 lg:gap-8 select-none">
            {navItems.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`duration-150 uppercase ${
                    isActive(path)
                      ? "bg-white/20 rounded-full py-2 px-4"
                      : "hover:underline hover:text-white/90"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            role="toggle-theme"
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer"
          >
            {darkMode ? <IconSunFilled /> : <IconMoonFilled />}
          </button>

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
              {navItems.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-xl uppercase ${
                    isActive(path)
                      ? "bg-neutral-500/20 rounded-full py-2 px-4"
                      : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </AppBar>
  );
};

export default Navbar;
