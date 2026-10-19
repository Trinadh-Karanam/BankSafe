import { useState, useEffect } from "react";
import "../App.css";
import type { Employee, EmployeeCardProps } from "./types";

function EmployeeCard({ employee, onApprove, onDelete }: EmployeeCardProps) {
  return (
    <article className="employee-card">
      <div>
        <h3>{employee.name}</h3>
        <p className="employee-role">{employee.role}</p>
      </div>
      <div className="employee-actions">
        <span className={`status status-${employee.status.toUpperCase()}`}>
          {employee.status}
        </span>

        <button
          onClick={() => onApprove(employee.id)}
          disabled={employee.status === "Approved"}
        >
          {employee.status === "Pending" ? "Approve" : "Approved"}
        </button>
        <button
          onClick={() => onDelete(employee.id)}
        >
        Delete
        </button>
      </div>
    </article>
  );
}


function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    console.log("Employees page opened");
  }, []);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/employees"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();

        setEmployees(data)
      } catch {
        setError("Unable to load employees. Check the backend server.");
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  async function approveEmployee(employeeId: number): Promise<void> {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${employeeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Approved" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve employee");
      }

      const updatedEmployee = await response.json();

      setEmployees((currentEmployees) =>
        currentEmployees.map((employee) =>
          employee.id === employeeId
            ? updatedEmployee
            : employee
        )
      );

      setError("");
    } catch {
      setError("Unable to approve employee. Please try again.");
    }
  }



  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchText.toLocaleLowerCase())
  );

  async function addEmployee(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newName.trim() || !newRole.trim()) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName.trim(),
            role: newRole.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const createdEmployee = await response.json();

      setEmployees((current) => [
        ...current,
        { ...createdEmployee, status: "Pending" as const },
      ]);

      setNewName("");
      setNewRole("");
      setError("");
    } catch {
      setError("Unable to add employee. Please try again.");
    }
  }

  async function deleteEmployee(employeeId: number): Promise<void> {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${employeeId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees((currentEmployees) =>
        currentEmployees.filter(
          (employee) => employee.id !== employeeId
        )
      );

      setError("");
    } catch {
      setError("Unable to delete employee. Please try again.");
    }
  }


  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">REACT PRACTICE PROJECT</p>
          <h1>Employee Portal</h1>
          <p className="subtitle">
            Learn React step by step by building a real-world style interface.
          </p>
        </div>

        <div className="summary-card">
          <span className="summary-label">Employees</span>
          <strong>{employees.length}</strong>
        </div>
      </header>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Employees</h2>
            <p>Search employees and approve their status.</p>
          </div>

          <input
            aria-label="Search employees"
            className="search-input"
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        <form onSubmit={addEmployee} className="employee-form">
          <h2>Add Employee</h2>

          <input
            type="text"
            placeholder="Employee name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Employee role"
            value={newRole}
            onChange={(event) => setNewRole(event.target.value)}
            required
            pattern="[A-Za-z ]*"
          />

          <button type="submit">Add Employee</button>
        </form>
        {loading && <p>Loading employees...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (

          <div className="employee-list">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onApprove={approveEmployee}
                  onDelete={deleteEmployee}
                />
              ))
            ) : (
              <p className="empty-message">No employees found.</p>
            )}
          </div>
        )}
      </section>

      <p className="learning-note">
        Practice tip: Try changing the employee data, search behavior, and
        approval logic after you understand how the code works.
      </p>
    </main>
  );
}

export default EmployeesPage;
