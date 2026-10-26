
import { loanEventEmitter, LoanSubmittedEvent } from "./loanEvents";
import { startCreditCheck } from "../microservice/creditCheckService";

loanEventEmitter.on("LoanSubmitted", (loan: LoanSubmittedEvent) => {
  void startCreditCheck(loan).catch((error: unknown) => {
    console.error("Unexpected credit-check error:", error);
  });
});
