
import { EventEmitter } from "node:events";

export interface LoanSubmittedEvent {
  loanId: string;
  applicantName: string;
  amount: number;
}

export const loanEventEmitter = new EventEmitter();