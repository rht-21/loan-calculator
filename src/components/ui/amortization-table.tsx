import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import type { ILoan } from "../LoanCalculator";

interface Row {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

function generateSchedule(loan: ILoan): Row[] {
  const { amount, interestRate, term } = loan;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = term * 12;

  const monthlyPayment =
    (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));

  let balance = amount;
  const rows: Row[] = [];

  for (let month = 1; month <= totalPayments; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    rows.push({
      month,
      principal: parseFloat(principal.toFixed(2)),
      interest: parseFloat(interest.toFixed(2)),
      remainingBalance: parseFloat(Math.max(balance, 0).toFixed(2)),
    });
  }

  return rows;
}

export default function AmortizationTable({
  loan,
  selectedCurrency,
}: {
  loan: ILoan;
  selectedCurrency: {
    code: string;
    rate: number;
  };
}) {
  const rows = useMemo(() => generateSchedule(loan), [loan]);

  return (
    <Box sx={{ width: "100%", marginBottom: "2rem" }}>
      <Paper sx={{ width: "100%" }}>
        <Toolbar className="!px-4">
          <Typography variant="h6" id="tableTitle" component="div">
            Amortization Schedule ({selectedCurrency.code})
          </Typography>
        </Toolbar>
        <Divider />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell align="left">Month</TableCell>
                <TableCell align="right">Principal</TableCell>
                <TableCell align="right">Interest</TableCell>
                <TableCell align="right">Remaining Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell align="right">
                    {(row.principal * selectedCurrency.rate).toFixed(2)}{" "}
                    {selectedCurrency.code}
                  </TableCell>
                  <TableCell align="right">
                    {(row.interest * selectedCurrency.rate).toFixed(2)}{" "}
                    {selectedCurrency.code}
                  </TableCell>
                  <TableCell align="right">
                    {(row.remainingBalance * selectedCurrency.rate).toFixed(2)}{" "}
                    {selectedCurrency.code}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
