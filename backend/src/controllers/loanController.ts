
import { Request, Response } from "express";
import * as loanService from "../microservice/loanService";

export const createLoan = (req: Request, res: Response): void => {
  const { applicantName, amount } = req.body;

  if (
    typeof applicantName !== "string" ||
    !applicantName.trim() ||
    typeof amount !== "number" ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    res.status(400).json({
      message: "Valid applicant name and loan amount are required",
    });
    return;
  }

  const loan = loanService.createLoanThroughCntrler({
    applicantName,
    amount,
  });

  res.status(201).json({
    message: "Loan application created successfully",
    data: loan,
  });
};

export const getLoans = (_req: Request, res: Response): void => {
  const loans = loanService.getAllLoans();

  res.status(200).json({
    data: loans,
  });
};
