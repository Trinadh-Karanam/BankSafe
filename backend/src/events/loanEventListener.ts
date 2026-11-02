
import { loanEventEmitter, LoanSubmittedEvent } from "./loanEvents";
import { startCreditCheck } from "../microservice/creditCheckService";

console.log("Loan event listener registered");

loanEventEmitter.on("LoanSubmitted", (loan: LoanSubmittedEvent) => {
  console.log("LoanSubmitted event received:", loan);

  void startCreditCheck(loan).catch((error: unknown) => {
    console.error("Unexpected credit-check error:", error);
  });
});