import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import { useEffect, useMemo, useState } from "react";
import LoanCalculator from "./components/LoanCalculator";
import { DarkContext } from "./context/dark-context";
import { Route, Routes } from "react-router-dom";
import ExchangeRates from "./components/ExchangeRates";
import NotFound from "./components/NotFound";
import axios from "axios";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        if (!sessionStorage.getItem("exchangeRates")) {
          const response = await axios.get(
            "https://v6.exchangerate-api.com/v6/edd3e8e8efe1b5e0c7e3c6e7/latest/USD"
          );
          if (response.data.result === "success") {
            sessionStorage.setItem(
              "exchangeRates",
              JSON.stringify(response.data.conversion_rates)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

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
