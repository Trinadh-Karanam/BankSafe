export type Employee = {
  id: number;
  name: string;
  role: string;
  status: "Pending" | "Approved";
};

// 3. Define the props accepted by EmployeeCard
export type EmployeeCardProps = {
  employee: Employee;
  onApprove: (employeeId: number) => void;
  onDelete: (employeeId: number) => void;
};