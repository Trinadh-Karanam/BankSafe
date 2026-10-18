
import { useState, useEffect} from "react";
import "../App.css";

// 1. Define the structure of an employee
type Employee = {
  id: number;
  name: string;
  role: string;
  status: "Pending" | "Approved";
};

// 2. Type the initial employee data
const initialEmployees: Employee[] = [
  { id: 1, name: "Rahul", role: "Developer", status: "Pending" },
  { id: 2, name: "Priya", role: "Tester", status: "Approved" },
  { id: 3, name: "Amit", role: "Analyst", status: "Pending" },
];

// 3. Define the props accepted by EmployeeCard
type EmployeeCardProps = {
  employee: Employee;
  onApprove: (employeeId: number) => void;
};

function EmployeeCard({ employee, onApprove }: EmployeeCardProps) {

//   useEffect(() => {
//   console.log("Employees page opened");
// }, []);
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
          {employee.status === "Approved" ? "Approved" : "Pending"}
        </button>
      </div>
    </article>
  );
}


function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchText, setSearchText] = useState<string>("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");

  function approveEmployee(employeeId: number): void {
    setEmployees((wantToChangeEmployees) =>
      wantToChangeEmployees.map((updatedEmployee) =>
        updatedEmployee.id === employeeId
          ? { ...updatedEmployee, status: "Approved" }
          : updatedEmployee
      )
    );
  }


  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase()) || 
    employee.role.toLowerCase().includes(searchText.toLocaleLowerCase())
  );

  function addEmployee(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const employee: Employee = {
      id: Math.max(0, ...employees.map((item) => item.id)) + 1,
      name: newName.trim(),
      role: newRole.trim(),
      status: "Pending",
    };

    if (!employee.name || !employee.role) return;

    setEmployees((current) => [...current, employee]);

    setNewName("");
    setNewRole("");
  }

  useEffect(() => {
  console.log("Employees page opened");
}, []);

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
          />

          <button type="submit">Add Employee</button>
        </form>

        <div className="employee-list">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onApprove={approveEmployee}
              />
            ))
          ) : (
            <p className="empty-message">No employees found.</p>
          )}
        </div>
      </section>

      <p className="learning-note">
        Practice tip: Try changing the employee data, search behavior, and
        approval logic after you understand how the code works.
      </p>
    </main>
  );
}

export default EmployeesPage;
