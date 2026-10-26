
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database";
import { loanEventEmitter } from "../events/loanEvents";

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

interface LoanRow extends RowDataPacket {
  id: number;
  applicantName: string;
  amount: number | string;
  status: Loan["status"];
}

export const createLoanThroughCntrler = async (
  input: CreateLoanInput
): Promise<Loan> => {
  const applicantName = input.applicantName.trim();

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO loans (applicant_name, amount)
     VALUES (?, ?)`,
    [applicantName, input.amount]
  );

  const loan: Loan = {
    id: String(result.insertId),
    applicantName,
    amount: input.amount,
    status: "PENDING",
  };

  loanEventEmitter.emit("LoanSubmitted", {
    loanId: loan.id,
    applicantName: loan.applicantName,
    amount: loan.amount,
  });

  return loan;
};

export const getAllLoans = async (): Promise<Loan[]> => {
  const [rows] = await pool.execute<LoanRow[]>(
    `SELECT id, applicant_name AS applicantName, amount, status
     FROM loans
     ORDER BY id DESC`
  );

  return rows.map((row) => ({
    id: String(row.id),
    applicantName: row.applicantName,
    amount: Number(row.amount),
    status: row.status,
  }));
};
