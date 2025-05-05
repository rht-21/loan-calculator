import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import { useMemo, useState } from "react";
import LoanCalculator from "./components/LoanCalculator";
import { DarkContext } from "./context/dark-context";
import { Route, Routes } from "react-router-dom";
import ExchangeRates from "./components/ExchangeRates";
import NotFound from "./components/NotFound";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#468189",
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <DarkContext.Provider value={darkMode}>
        <main className="flex flex-col w-full min-h-dvh">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<LoanCalculator />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </DarkContext.Provider>
    </ThemeProvider>
  );
};

export default App;
