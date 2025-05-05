import { calculateEMI } from "@/lib/utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import EMIContainer from "./ui/emi-container";

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
  const [emi, setEmi] = useState<number>(0);

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
          label="Loan Amount"
          variant="outlined"
          autoComplete="off"
          value={loan.amount}
          onChange={(e) => {
            const value = !isNaN(Number(e.target.value))
              ? Number(e.target.value)
              : loan.amount;
            if (!isNaN(value) && value >= 0) {
              setLoan({ ...loan, amount: value });
            }
          }}
        />

        <TextField
          label="Interest Rate (%)"
          variant="outlined"
          autoComplete="off"
          value={loan.interestRate}
          onChange={(e) => {
            const value = !isNaN(Number(e.target.value))
              ? Number(e.target.value)
              : loan.amount;
            if (!isNaN(value) && value >= 0) {
              setLoan({ ...loan, interestRate: value });
            }
          }}
        />

        <TextField
          label="Term (Years)"
          variant="outlined"
          autoComplete="off"
          value={loan.term}
          onChange={(e) => {
            const value = !isNaN(Number(e.target.value))
              ? Number(e.target.value)
              : loan.amount;
            if (!isNaN(value) && value >= 0) {
              setLoan({ ...loan, term: value });
            }
          }}
        />
      </div>
      <Button onClick={handleSubmit} variant="contained" className="my-5 block">
        Calculate
      </Button>
      {emi > 0 && (
        <EMIContainer emi={emi} setEmi={setEmi} loan={loan} setLoan={setLoan} />
      )}
    </section>
  );
};

export default LoanCalculator;
