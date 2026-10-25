
import { Router } from "express";
import {
  createLoan,
  getLoans,
} from "../controllers/loanController";

const router = Router();

router.post("/", createLoan);
router.get("/", getLoans);

export default router;
