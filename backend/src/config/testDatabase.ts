
import { pool } from "./database";

async function testDatabaseConnection(): Promise<void> {
  try {
    const [rows] = await pool.query("SELECT 1 AS connected");
    console.log("MySQL connected successfully:", rows);
  } catch (error) {
    console.error("MySQL connection failed:", error);
  } finally {
    await pool.end();
  }
}

void testDatabaseConnection();
