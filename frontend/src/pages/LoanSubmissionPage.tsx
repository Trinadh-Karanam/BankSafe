import { useState } from "react";

function LoanSubmissionPage() {
    const [applicantName, setApplicantName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [loanResponse, setLoanResponse] = useState<any>(null);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!applicantName.trim()) {
            setErrorMessage("Applicant name is required");
            return;
        }

        if (!/^[A-Za-z ]{2,50}$/.test(applicantName.trim())) {
            setErrorMessage("Enter a valid applicant name");
            return;
        }

        const loanAmount = Number(amount);

        if (!amount || !Number.isSafeInteger(loanAmount) || loanAmount <= 0) {
            setErrorMessage("Enter a valid loan amount greater than zero");
            return;
        }

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");
        setLoanResponse(null);

        try {
            const response = await fetch(
                "http://localhost:3000/api/loans",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        applicantName: applicantName.trim(),
                        amount: Number(amount)
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit loan");
            }

            const data = await response.json();
            console.log("Backend response:", data);

            setLoanResponse(data);
            setSuccessMessage("Loan submitted successfully!");

            setApplicantName("");
            setAmount("");

        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="app-shell">
            <header className="page-header">
                <div>
                    <p className="eyebrow">BANKSAFE</p>
                    <h1>Loan Submission</h1>
                    <p className="subtitle">
                        Submit and process a new loan application.
                    </p>
                </div>
            </header>

            <section className="panel">
                <h2>Applicant Details</h2>

                <form className="loan-form" onSubmit={handleSubmit}>
                    <label>Applicant Name</label>
                    <input
                        type="text"
                        placeholder="Enter applicant name"
                        value={applicantName}
                        onChange={(event) => setApplicantName(event.target.value)}
                        required
                        minLength={2}
                        maxLength={50}
                        pattern="[A-Za-z ]+"
                        title="Enter a valid name using letters only"
                    />
                    <label>Loan Amount</label>
                    <input
                        type="number"
                        placeholder="Enter loan amount"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        required
                        min="1"
                        step="1"
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Loan"}
                    </button>
                </form>
                {loading && <p>Submitting loan application...</p>}

                {successMessage && (
                    <p className="success-message">
                        {successMessage}
                    </p>
                )}

                {errorMessage && (
                    <p className="error-message">
                        {errorMessage}
                    </p>
                )}

                {loanResponse && (
                    <div className="response-card">
                        <h3>Loan Application Details</h3>

                        <p>
                            <strong>Loan ID:</strong> {loanResponse.data.id}
                        </p>

                        <p>
                            <strong>Applicant:</strong> {loanResponse.data.applicantName}
                        </p>

                        <p>
                            <strong>Amount:</strong> ₹{loanResponse.data.amount}
                        </p>

                        <p>
                            <strong>Status:</strong> {loanResponse.data.status}
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}

export default LoanSubmissionPage;