
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="panel">
        <NavLink to="/">Dashboard</NavLink>
        {" | "}
        <NavLink to="/employees">Employees</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
