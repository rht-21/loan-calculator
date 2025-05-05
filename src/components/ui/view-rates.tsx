import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ExchangeTable from "./exchange-table";

const ViewRates = () => {
  const exchangeRates = sessionStorage.getItem("exchangeRates")
    ? JSON.parse(sessionStorage.getItem("exchangeRates") as string)
    : {};
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [tableData, setTableData] = useState<Record<string, number> | null>(
    null
  );

  const getExchangeTable = async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/edd3e8e8efe1b5e0c7e3c6e7/latest/${selectedCurrency}`
      );
      if (response.data.result === "success") {
        setTableData(response.data.conversion_rates);
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  return (
    <section className="exchange-table">
      <h2 className="text-xl md:text-2xl mt-10 mb-5">
        View Exchange Rates Table
      </h2>
      <div className="flex items-center justify-between mb-10">
        <FormControl className="w-[100px]">
          <InputLabel id="currency">Currency</InputLabel>
          <Select
            value={selectedCurrency}
            onChange={(e) => {
              const code = e.target.value as string;
              setSelectedCurrency(code);
            }}
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
        <Button onClick={getExchangeTable} color="secondary" variant="outlined">
          Get Table
        </Button>
      </div>
      {tableData && <ExchangeTable exchangeRates={tableData} />}
    </section>
  );
};
export default ViewRates;
