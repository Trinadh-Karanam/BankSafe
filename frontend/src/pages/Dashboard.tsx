
import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Bank and Secure</p>
          <h1>Dashboard</h1>
          <p className="subtitle">
            Welcome to your Bank safe.
          </p>
        </div>
      </header>

      <section className="panel">
        <h2>Quick Access</h2>
        <p>Manage employee records and approval statuses.</p>
        <Link to="/employees">View Employees</Link>
      </section>
    </main>
  );
}

export default DashboardPage;
