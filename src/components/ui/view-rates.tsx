import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ExchangeTable from "./exchange-table";

const ViewRates = () => {
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [tableData, setTableData] = useState<Record<string, number> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("exchangeRates");
      if (!raw) {
        setError("Exchange rates not found in session storage.");
        return;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        setError("Invalid exchange rate data.");
        return;
      }
      setExchangeRates(parsed);
    } catch {
      setError("Failed to load exchange rates from session storage.");
    }
  }, []);

  const getExchangeTable = async () => {
    setError(null);
    setFetching(true);
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiUrl}/latest/${selectedCurrency}`
      );
      if (response.data.result === "success") {
        setTableData(response.data.conversion_rates);
      } else {
        setError("Failed to retrieve exchange table.");
      }
    } catch {
      setError(
        "Could not fetch exchange table. Please check your API key or network."
      );
    } finally {
      setFetching(false);
    }
  };

  return (
    <section className="exchange-table">
      <h2 className="text-xl md:text-2xl mt-10 mb-5">
        View Exchange Rates Table
      </h2>

      {error && (
        <Typography color="error" className="mb-4">
          {error}
        </Typography>
      )}

      {!error && (
        <div className="flex items-center justify-between mb-10">
          <FormControl className="w-[100px]">
            <InputLabel id="currency">Currency</InputLabel>
            <Select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              labelId="currency"
              label="Currency"
            >
              {Object.keys(exchangeRates).map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={getExchangeTable}
            color="secondary"
            variant="outlined"
            disabled={fetching}
          >
            {fetching ? "Loading..." : "Get Table"}
          </Button>
        </div>
      )}

      {tableData && <ExchangeTable exchangeRates={tableData} />}
    </section>
  );
};

export default ViewRates;
