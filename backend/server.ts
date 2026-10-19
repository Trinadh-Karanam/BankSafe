
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let employees = [
  { id: 1, name: "Rahul", role: "Developer", status: "Pending"  },
  { id: 2, name: "Priya", role: "Tester", status: "Approved"  },
  { id: 3, name: "Trinadh", role: "Analyst", status: "Pending"  },
];

app.get("/api/employees", (_req, res) => {
  res.json(employees);
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});

app.post("/api/employees", (req, res) => {
  const { name, role } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof role !== "string" ||
    !role.trim()
  ) {
    return res.status(400).json({
      message: "Name and role are required",
    });
  }

  const newEmployee = {
    id: Math.max(0, ...employees.map((employee) => employee.id)) + 1,
    name: name.trim(),
    role: role.trim(),
    status: "Pending"
  };

  employees.push(newEmployee);

  res.status(201).json(newEmployee);
});


app.patch("/api/employees/:id", (req, res) => {
  const employeeId = Number(req.params.id);
  const { status } = req.body;

  if (status !== "Pending" && status !== "Approved") {
    return res.status(400).json({
      message: "Invalid employee status",
    });
  }

  const employee = employees.find(
    (item) => item.id === employeeId
  );

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  employee.status = status;

  res.json(employee);
});

app.delete("/api/employees/:id", (req, res) => {
  const employeeId = Number(req.params.id);

  const employeeExists = employees.some(
    (employee) => employee.id === employeeId
  );

  if (!employeeExists) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  employees = employees.filter(
    (employee) => employee.id !== employeeId
  );

  res.status(204).send();
});


