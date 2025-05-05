/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ViewRates from "./ui/view-rates";

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");

  useEffect(() => {
    setExchangeRates(
      sessionStorage.getItem("exchangeRates")
        ? JSON.parse(sessionStorage.getItem("exchangeRates") as string)
        : {}
    );

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return;

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    const converted = (amount * toRate) / fromRate;
    setConvertedAmount(Number(converted.toFixed(2)));
  }, [amount, fromCurrency, toCurrency]);

  return (
    <section className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl w-full mx-auto">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-10 mb-5">
        Live Currency Conversion
      </h1>
      <div className="flex max-sm:flex-col gap-4 my-5">
        <div className="flex-1 flex gap-2">
          <FormControl className="w-[90px] sm:w-full max-w-[150px]">
            <InputLabel id="from-currency-label">From</InputLabel>
            <Select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              labelId="from-currency-label"
              label="From"
            >
              {Object.keys(exchangeRates).map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Enter Amount"
            variant="outlined"
            autoComplete="off"
            value={amount}
            className="flex-1"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setAmount(value);
              }
            }}
          />
        </div>
        <div className="flex-1 flex gap-2">
          <FormControl className="w-[90px] sm:w-full max-w-[150px]">
            <InputLabel id="to-currency-label">To</InputLabel>
            <Select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              labelId="to-currency-label"
              label="To"
            >
              {Object.keys(exchangeRates).map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Converted Amount"
            variant="outlined"
            className="flex-1"
            value={convertedAmount}
          />
        </div>
      </div>
      <ViewRates />
    </section>
  );
};

export default ExchangeRates;
