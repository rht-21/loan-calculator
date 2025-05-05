import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
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
  const exchangeRates = sessionStorage.getItem("exchangeRates")
    ? JSON.parse(sessionStorage.getItem("exchangeRates") as string)
    : {};
  const [selectedCurrency, setSelectedCurrency] = useState<{
    code: string;
    rate: number;
  }>({
    code: "USD",
    rate: 1,
  });

  return (
    <>
      <h5 className="text-lg md:text-xl mt-14 mb-7">
        Monthly EMI: {(emi * selectedCurrency.rate).toFixed(2)}{" "}
        {selectedCurrency.code}
      </h5>
      <div className="flex items-center justify-between mb-7">
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
