import "dotenv/config";
import express, { Request, Response } from "express";
import loanRoutes from "./routes/loanRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

const PORT = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error("PORT must be a valid port number");
}

app.use(express.json());

app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/loans", loanRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
