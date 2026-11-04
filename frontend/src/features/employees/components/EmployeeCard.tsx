
import type { EmployeeCardProps } from "../types/employee.types";
import "../../../App.css";

function EmployeeCard({
  employee,
  onApprove,
  onDelete,
}: EmployeeCardProps) {
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

        <button onClick={() => onDelete(employee.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default EmployeeCard;
