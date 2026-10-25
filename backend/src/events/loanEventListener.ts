
import { loanEventEmitter, LoanSubmittedEvent } from "./loanEvents";
import { startCreditCheck } from "../microservice/creditCheckService";

loanEventEmitter.on("LoanSubmitted", (loan: LoanSubmittedEvent) => {
  console.log("LoanSubmitted event received");

  startCreditCheck(loan);
});
