
import { LoanSubmittedEvent } from "../events/loanEvents";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(
  url: string,
  maxAttempts = 3
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let response: Response | undefined;

    try {
      response = await fetch(url, {
        signal: AbortSignal.timeout(5000),
      });
    } catch (error: unknown) {
      // Network errors and timeouts may be temporary.
      lastError = error;
    }

    if (response?.ok) {
      return response;
    }

    if (response && !response.ok) {
      const retryableStatuses = [429, 500, 502, 503, 504];

      if (!retryableStatuses.includes(response.status)) {
        throw new Error(`Credit API failed: HTTP ${response.status}`);
      }

      lastError = new Error(`Credit API failed: HTTP ${response.status}`);
    }

    if (attempt < maxAttempts) {
      const waitMs = 500 * 2 ** (attempt - 1);

      console.log(
        `Attempt ${attempt} failed. Retrying in ${waitMs}ms...`
      );

      await delay(waitMs);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Credit API failed after all attempts");
}

export const startCreditCheck = async (
  loan: LoanSubmittedEvent
): Promise<void> => {
  try {
    console.log(`Starting credit check for ${loan.applicantName}`);

    const response = await fetchWithRetry(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    const data: unknown = await response.json();

    console.log("Credit API request succeeded");
    console.log("Loan ID:", loan.loanId);
    console.log("Test API response:", data);
  } catch (error: unknown) {
    console.error("Credit check failed:", error);
  }
};