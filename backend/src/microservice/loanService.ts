import {loanEventEmitter} from "../events/loanEvents";
export interface Loan {
  id: string;
  applicantName: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface CreateLoanInput {
  applicantName: string;
  amount: number;
}

// Temporary in-memory storage
const loans: Loan[] = [];

export const createLoanThroughCntrler = (
  input: CreateLoanInput
): Loan => {
  const loan: Loan = {
    id: "yet-to-be-generated-id", // uuid generation can be added later
    applicantName: input.applicantName.trim(),
    amount: input.amount,
    status: "PENDING",
  };

  loans.push(loan);

  loanEventEmitter.emit("LoanSubmitted", {
  loanId: loan.id,
  applicantName: loan.applicantName,
  amount: loan.amount,
});

  return loan;
};

export const getAllLoans = (): Loan[] => {
  return [...loans];
};
