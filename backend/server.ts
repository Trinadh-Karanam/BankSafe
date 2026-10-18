
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const employees = [
  { id: 1, name: "Rahul", role: "Developer" },
  { id: 2, name: "Priya", role: "Tester" },
  { id: 3, name: "Trinadh", role: "Analyst" },
];

app.get("/api/employees", (_req, res) => {
  res.json(employees);
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
