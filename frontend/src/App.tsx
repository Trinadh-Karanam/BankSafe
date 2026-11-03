
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import LoanSubmissionPage from "./pages/LoanSubmissionPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="panel">
        <NavLink to="/">Dashboard</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/loans" element={<LoanSubmissionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
