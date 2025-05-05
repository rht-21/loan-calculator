import type { ILoan } from "@/components/LoanCalculator";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateEMI = (loan: ILoan) => {
  const P = loan.amount;
  const R = loan.interestRate / 12 / 100;
  const N = loan.term * 12;

  console.log(P, R, N);

  const numerator = P * R * Math.pow(1 + R, N);
  const denominator = Math.pow(1 + R, N) - 1;

  const emiCalculated = numerator / denominator;

  return emiCalculated;
};
