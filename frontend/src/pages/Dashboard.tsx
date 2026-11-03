
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
       <section className="panel">
        <h3>User access Management</h3>
        <Link to="/employees">View All Employees</Link>
        <br></br>
        <Link to="/employees">Add Employee</Link> </section>
        <br></br>
        <section className="panel">
           <Link to="/loans">Submit Loan</Link>  
        </section>
       
      </section>
    </main>
  );
}

export default DashboardPage;
