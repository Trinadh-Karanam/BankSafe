import "./events/loanEventListener";
import express, { Request, Response } from "express";
import loanRoutes from "./routes/loanRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/loans", loanRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
