
import { LoanSubmittedEvent } from "../events/loanEvents";

export const startCreditCheck = (
  loan: LoanSubmittedEvent
): void => {
  console.log("Starting credit check...");
  console.log(`Loan ID: ${loan.loanId}`);
  console.log(`Applicant: ${loan.applicantName}`);
  console.log(`Amount: ${loan.amount}`);
};
