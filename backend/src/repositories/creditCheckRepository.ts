import { ResultSetHeader } from "mysql2";
import { pool } from "../config/database";

interface CreditCheckInput {
  loanId: string;
  status: string;
  responseData: string;
}

export const saveCreditCheck = async (
  creditCheck: CreditCheckInput
): Promise<void> => {
  await pool.execute<ResultSetHeader>(
    `INSERT INTO CreditChecks
      (loanId, status, responseData)
     VALUES (?, ?, ?)`,
    [
      creditCheck.loanId,
      creditCheck.status,
      creditCheck.responseData,
    ]
  );

  console.log("Credit-check result saved successfully");
};