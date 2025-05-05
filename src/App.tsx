import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import { createContext, useState } from "react";
import LoanCalculator from "./components/LoanCalculator";

const App = () => {
  const darkContext = createContext(false);
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#468189",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <darkContext.Provider value={darkMode}>
        <main className="flex flex-col w-full min-h-dvh">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <LoanCalculator />
        </main>
      </darkContext.Provider>
    </ThemeProvider>
  );
};

export default App;
