export type Employee = {
  id: number;
  name: string;
  role: string;
  status: "Pending" | "Approved";
};

export type EmployeeCardProps = {
  employee: Employee;
  onApprove: (employeeId: number) => void;
  onDelete: (employeeId: number) => void;
};