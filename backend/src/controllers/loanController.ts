import { Request, Response, NextFunction } from "express";
import * as loanService from "../microservice/loanService";

export const createLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantName, amount } = req.body;

    const loan = await loanService.createLoanThroughCntrler({
      applicantName,
      amount,
    });

    res.status(201).json({
      message: "Loan application created successfully",
      data: loan,
    });
  } catch (error) {
    next(error);
  }
};

export const getLoans = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loans = await loanService.getAllLoans();
    res.status(200).json({ data: loans });
  } catch (error) {
    next(error);
  }
};
