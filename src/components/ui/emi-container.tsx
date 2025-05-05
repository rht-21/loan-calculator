import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ILoan } from "../LoanCalculator";
import AmortizationTable from "./amortization-table";

const EMIContainer = ({
  emi,
  setEmi,
  loan,
  setLoan,
}: {
  emi: number;
  setEmi: React.Dispatch<React.SetStateAction<number>>;
  loan: ILoan;
  setLoan: React.Dispatch<React.SetStateAction<ILoan>>;
}) => {
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );
  const [exchangeRateError, setExchangeRateError] = useState<string | null>(
    null
  );

  const [selectedCurrency, setSelectedCurrency] = useState<{
    code: string;
    rate: number;
  }>({
    code: "USD",
    rate: 1,
  });

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("exchangeRates");
      if (!raw) {
        setExchangeRateError(
          "Exchange rates not found. Please try again later."
        );
        return;
      }

      const parsed = JSON.parse(raw);
      if (typeof parsed !== "object" || parsed === null) {
        setExchangeRateError("Exchange rates are invalid.");
        return;
      }

      setExchangeRates(parsed);
    } catch {
      setExchangeRateError("Failed to parse exchange rates.");
    }
  }, []);

  return (
    <>
      <h5 className="text-lg md:text-xl mt-14 mb-7">
        Monthly EMI: {(emi * selectedCurrency.rate).toFixed(2)}{" "}
        {selectedCurrency.code}
      </h5>

      <div className="flex items-center justify-between mb-7">
        {exchangeRateError ? (
          <Typography color="error">{exchangeRateError}</Typography>
        ) : (
          <FormControl className="w-fit">
            <InputLabel id="currency">Currency</InputLabel>
            <Select
              value={selectedCurrency.code}
              onChange={(e) => {
                const code = e.target.value as string;
                const rate = exchangeRates[code] ?? 1;
                setSelectedCurrency({ code, rate });
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
        )}

        <Button
          onClick={() => {
            setEmi(0);
            setLoan({ amount: 100000, interestRate: 8.5, term: 5 });
            setSelectedCurrency({ code: "USD", rate: 1 });
          }}
          color="secondary"
          variant="outlined"
        >
          Reset
        </Button>
      </div>

      <AmortizationTable loan={loan} selectedCurrency={selectedCurrency} />
    </>
  );
};

export default EMIContainer;
