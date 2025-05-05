import { calculateEMI } from "@/lib/utils";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

export interface ILoan {
  amount: number;
  interestRate: number;
  term: number;
}

const LoanCalculator = () => {
  const [loan, setLoan] = useState<ILoan>({
    amount: 100000,
    interestRate: 8.5,
    term: 5,
  });
  const [emi, setEmi] = useState<number | null>(null);

  const handleSubmit = () => {
    setEmi(calculateEMI(loan));
  };

  return (
    <section className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl w-full mx-auto">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-10 mb-5">
        Loan Calculator Dashboard
      </h1>
      <div className="flex max-sm:flex-col gap-4 my-5">
        <TextField
          id="outlined-basic"
          label="Loan Amount"
          variant="outlined"
          autoComplete="off"
          value={loan.amount}
          onChange={(e) => setLoan({ ...loan, amount: Number(e.target.value) })}
        />
        <TextField
          id="outlined-basic"
          label="Interest Rate (%)"
          variant="outlined"
          autoComplete="off"
          value={loan.interestRate}
          onChange={(e) =>
            setLoan({ ...loan, interestRate: Number(e.target.value) })
          }
        />
        <TextField
          id="outlined-basic"
          label="Term (Years)"
          variant="outlined"
          autoComplete="off"
          value={loan.term}
          onChange={(e) => setLoan({ ...loan, term: Number(e.target.value) })}
        />
      </div>
      <Button onClick={handleSubmit} variant="contained" className="my-5 block">
        Calculate
      </Button>
      {emi && (
        <>
          <h5 className="text-lg md:text-xl mt-14 mb-7">
            Monthly EMI: ${emi.toFixed(2)}
          </h5>
          <div className="flex items-center justify-between">
            <FormControl className="w-fit">
              <InputLabel id="currency">Currency</InputLabel>
              <Select defaultValue="USD" labelId="currency" label="Currency">
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="JPY">JPY</MenuItem>
                <MenuItem value="AUD">AUD</MenuItem>
                <MenuItem value="CAD">CAD</MenuItem>
              </Select>
            </FormControl>
            <Button color="secondary" variant="outlined">
              Reset
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default LoanCalculator;
