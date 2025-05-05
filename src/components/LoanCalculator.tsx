import { calculateEMI } from "@/lib/utils";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

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
    <section className="pt-20 px-4 md:px-6 lg:px-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl my-10">
        Loan Calculator Dashboard
      </h1>
      <div className="flex max-sm:flex-col gap-4 my-2">
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
      <Button onClick={handleSubmit} variant="contained" className="my-2 block">
        Calculate
      </Button>
      {emi && (
        <h5 className="text-lg md:text-xl my-5">
          Monthly EMI: ${emi.toFixed(2)}
        </h5>
      )}
    </section>
  );
};

export default LoanCalculator;
